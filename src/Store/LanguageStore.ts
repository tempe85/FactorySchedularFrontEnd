import { Container } from "unstated";
import { getTextTranslations } from "../API/Api";
import { InitialHardCodedTextConfigMap } from "../Config/InitialHardCodedTextConfig";
import { LanguageConfiguration } from "../Config/LanguageConfiguration";
import { CacheKey, LanguageType, TextTranslationType } from "../Enums";
import {
  ILanguageOption,
  ISourceTargetTranslations,
  ITextLanguageTranslation,
  ITranslationResponse,
  IWorkBuilding,
} from "../Interfaces";
import {
  CloneArrayOfObjects,
  ConcatMaps,
  GetFromStorage,
  GetHardCodedLangaugeDicationaryEnglishStrings as GetHardCodedLanguageDicationaryEnglishStrings,
  SetStorage,
} from "../Utilities";
import {
  HandleGetLanguageOnLoadAndFectchTranslationDataIfNeeded,
  VerifyTranslationResponseObjectIsValid,
} from "./HelperMethods";

interface IState {
  currentLanguage: ILanguageOption;
  previousLanguage: ILanguageOption;
  languageDictionaries: ISourceTargetTranslations[];
  hardCodedLanguageDictionary: Map<string, ITextLanguageTranslation[]>;
  currentHardCodedTranslations: LanguageType[];
  englishTextHardCodedStrings: string[];
}

export class TranslationStore extends Container<IState> {
  public readonly state: IState = {
    currentLanguage: LanguageConfiguration.get(
      GetFromStorage<LanguageType>(CacheKey.User_Language) ??
        LanguageType.English
    ) as ILanguageOption,
    previousLanguage: HandleGetLanguageOnLoadAndFectchTranslationDataIfNeeded(),
    languageDictionaries: [],
    hardCodedLanguageDictionary: InitialHardCodedTextConfigMap,
    currentHardCodedTranslations: [LanguageType.English],
    englishTextHardCodedStrings: GetHardCodedLanguageDicationaryEnglishStrings(
      InitialHardCodedTextConfigMap
    ),
  };

  public translateBuildingsData = async (
    workBuildings: IWorkBuilding[]
  ): Promise<IWorkBuilding[]> => {
    const descriptions = workBuildings.map((p) => p.description);
    const names = workBuildings.map((p) => p.name);

    const [currentTranslatedNamesMap, namesToBeTranslated] =
      this.fetchTranslationsFromDictionary(names);
    const [currentTranslatedDescriptionsMap, descriptionsToBeTranslated] =
      this.fetchTranslationsFromDictionary(descriptions);
    if (
      (!namesToBeTranslated || namesToBeTranslated.length === 0) &&
      (!descriptionsToBeTranslated || descriptionsToBeTranslated.length === 0)
    ) {
      const updatedBuildings = this.updateBuildingsWithNewTranslations(
        workBuildings,
        currentTranslatedDescriptionsMap,
        currentTranslatedNamesMap
      );
      return Promise.resolve(updatedBuildings);
    }
    const translatedDescriptionResponse =
      await this.translateLanguageTextsHandler(descriptionsToBeTranslated);
    const translatedNameResponse = await this.translateLanguageTextsHandler(
      namesToBeTranslated
    );

    const translationDescriptionResponseMap =
      this.convertTranslationResponseToMap(translatedDescriptionResponse);
    const translationNameResponseMap = this.convertTranslationResponseToMap(
      translatedNameResponse
    );

    const mergedMaps = ConcatMaps(
      translationDescriptionResponseMap,
      translationNameResponseMap
    );

    // updating the store
    if (mergedMaps) {
      this.mergeNewDictionaryMapDataAndUpdate(mergedMaps);
    }

    return this.updateBuildingsWithNewTranslations(
      workBuildings,
      translationDescriptionResponseMap,
      translationNameResponseMap
    );
  };

  private fetchAllHardCodedLanguageTranslationStringsAndUpdateState = async (
    updatedLanguage: LanguageType
  ) => {
    const { currentHardCodedTranslations } = this.state;
    if (currentHardCodedTranslations.includes(updatedLanguage)) return;
    const textValues = this.state.englishTextHardCodedStrings;
    const translatedValues = await this.translateLanguageTextsHandler(
      textValues
    );
    if (!translatedValues) {
      console.log("No translated values!");
    } else {
      this.addTranslatedValuesToHardCodedTranslationMap(translatedValues);
    }
  };

  public addTranslatedValuesToHardCodedTranslationMap = (
    translatedValues: ITranslationResponse
  ) => {
    const isValid =
      this.verifyTranslationResponseObjectIsValid(translatedValues);
    if (!isValid) {
      console.log("Translation response was invalid!");
      return;
    }
    const currentLanguage = this.state.currentLanguage.languageType;
    //TODO: need to actually create a copy!
    const hardCodedLanguageDictionary = this.state.hardCodedLanguageDictionary;

    console.log(
      "hardCodedLanguageDictionary",
      hardCodedLanguageDictionary,
      this.state.hardCodedLanguageDictionary
    );

    for (let i = 0; i < translatedValues.translation.length; i++) {
      const textLanguageTranslationList = hardCodedLanguageDictionary.get(
        translatedValues.text[i]
      );
      if (!textLanguageTranslationList) {
        console.log(
          `Could not find ${translatedValues.text} in the hard coded map!`
        );
        continue;
      }
      const updatedTextLanguageTranslationList = [
        ...textLanguageTranslationList,
        {
          languageType: currentLanguage,
          translation: translatedValues.translation[i],
        },
      ];

      hardCodedLanguageDictionary.set(
        translatedValues.text[i],
        updatedTextLanguageTranslationList
      );
    }

    this.setState({
      hardCodedLanguageDictionary,
      currentHardCodedTranslations: [
        ...this.state.currentHardCodedTranslations,
        currentLanguage,
      ],
    });
  };

  public getHardCodedTextTranslation = (
    textTranslationType: TextTranslationType
  ): string => {
    console.log("textTranslationType", textTranslationType);
    //assume already fetched
    const languageType = this.state.currentLanguage.languageType;
    const hardCodedLanguageDictionary = this.state.hardCodedLanguageDictionary;
    const translations = hardCodedLanguageDictionary.get(textTranslationType);
    if (!translations) return "";

    console.log(
      "translation",
      translations.filter((p) => p.languageType === languageType)?.[0]
        ?.translation ?? ""
    );
    return (
      translations.filter((p) => p.languageType === languageType)?.[0]
        ?.translation ?? ""
    );
  };

  private updateBuildingsWithNewTranslations = (
    workBuildings: IWorkBuilding[],
    descriptionMap: Map<string, string> | undefined,
    nameMap: Map<string, string> | undefined
  ): IWorkBuilding[] => {
    const clonedBuildings = CloneArrayOfObjects(workBuildings);
    for (let i = 0; i < clonedBuildings.length; i++) {
      const building = clonedBuildings[i];
      const descriptionTranslatedValue = descriptionMap?.get(
        building.description
      );
      const nameTranslationValue = nameMap?.get(building.name);
      building.description = descriptionTranslatedValue ?? building.description;
      building.name = nameTranslationValue ?? building.name;
      clonedBuildings[i] = building;
    }

    return clonedBuildings;
  };

  private convertTranslationResponseToMap = (
    translationResponse: ITranslationResponse | undefined
  ): Map<string, string> | undefined => {
    if (!translationResponse) return;
    const isValid = VerifyTranslationResponseObjectIsValid(translationResponse);
    if (!isValid) {
      console.log("Translation response was invalid!");
      return;
    }
    const retVal = new Map<string, string>();
    const { text, translation } = translationResponse;
    for (let i = 0; i < text.length; i++) {
      retVal.set(text[i], translation[i]);
    }

    return retVal;
  };

  private verifyTranslationResponseObjectIsValid = (
    translationResponse: ITranslationResponse | undefined
  ): boolean => {
    return (
      !!translationResponse &&
      translationResponse.text &&
      translationResponse.translation &&
      translationResponse.text.length === translationResponse.translation.length
    );
  };

  private mergeNewDictionaryMapDataAndUpdate = (
    mapDataToAdd: Map<string, string>
  ) => {
    const languageDestinationDicationary =
      this.getCurrentLanguageSourceDestinationDictionary();
    if (!languageDestinationDicationary) return;
    const dataTranslations = languageDestinationDicationary.dataTranslations;

    const updatedTranslationMap = ConcatMaps(dataTranslations, mapDataToAdd);
    if (!updatedTranslationMap) return;
    this.updateLanguageDictionary(
      updatedTranslationMap,
      languageDestinationDicationary
    );
  };

  public updateLanguageDictionary = (
    updatedTranslationDictionary: Map<string, string>,
    updatedDictionary: ISourceTargetTranslations
  ) => {
    const languageDictionaries = [...this.state.languageDictionaries];
    const dictionaryIndex = languageDictionaries.findIndex(
      (p) =>
        p.sourceLanuage === updatedDictionary.sourceLanuage &&
        p.targetLanguage === updatedDictionary.sourceLanuage
    );
    if (dictionaryIndex < 0) return;

    const dictionaryToUpdate = { ...languageDictionaries[dictionaryIndex] };
    dictionaryToUpdate.dataTranslations = updatedTranslationDictionary;
    languageDictionaries[dictionaryIndex] = dictionaryToUpdate;

    this.setState({
      languageDictionaries,
    });
  };

  public getStoredTranslationsFromDictionary = (texts: string[]) => {};

  public translateLanguageTextsHandler = async (
    texts: string[],
    isoString?: string
  ): Promise<ITranslationResponse | undefined> => {
    return await getTextTranslations(
      texts,
      this.state.currentLanguage.languageISOString
    );
  };

  public fetchTranslationsFromDictionary = (
    texts: string[]
  ): [Map<string, string> | undefined, string[]] => {
    const languageDestinationDicationary =
      this.getCurrentLanguageSourceDestinationDictionary();
    if (!languageDestinationDicationary) {
      return [undefined, texts];
    }
    const translationDictionary =
      languageDestinationDicationary.dataTranslations;
    const foundTranslationsMap: Map<string, string> = new Map();
    const textNeedingTranslation: string[] = [];
    for (let text in texts) {
      const value = translationDictionary.get(text);
      if (value && value.length > 0) {
        foundTranslationsMap.set(text, value);
      } else {
        textNeedingTranslation.push(text);
      }
    }

    return [foundTranslationsMap, textNeedingTranslation];
  };

  public updateLanguage = (updatedLanguage: LanguageType) => {
    const updatedLanguageConfiguration = LanguageConfiguration.get(
      updatedLanguage
    ) as ILanguageOption;

    this.setState(
      (prevState) => ({
        currentLanguage: updatedLanguageConfiguration,
        previousLanguage: prevState.currentLanguage,
      }),
      () => {
        this.fetchAllHardCodedLanguageTranslationStringsAndUpdateState(
          updatedLanguage
        );
        SetStorage(CacheKey.User_Language, updatedLanguage);
      }
    );
  };

  private getCurrentLanguageSourceDestinationDictionary = ():
    | ISourceTargetTranslations
    | undefined => {
    const { languageDictionaries, previousLanguage, currentLanguage } =
      this.state;
    const dictionary = languageDictionaries.find(
      (p) =>
        p.sourceLanuage === previousLanguage.languageType &&
        p.targetLanguage === currentLanguage.languageType
    );

    return dictionary;
  };
}
