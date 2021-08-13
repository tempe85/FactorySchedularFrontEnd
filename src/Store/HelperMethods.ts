import { getTextTranslations } from "../API/Api";
import { InitialHardCodedTextConfigMap } from "../Config/InitialHardCodedTextConfig";
import { LanguageConfiguration } from "../Config/LanguageConfiguration";
import { CacheKey, LanguageType } from "../Enums";
import {
  ILanguageOption,
  ITextLanguageTranslation,
  ITranslationResponse,
} from "../Interfaces";
import {
  GetFromStorage,
  GetHardCodedLangaugeDicationaryEnglishStrings,
} from "../Utilities";

export const HandleGetLanguageOnLoadAndFectchTranslationDataIfNeeded = (
  fetchTranslationCallback?: (language: LanguageType) => Promise<void>
): ILanguageOption => {
  const language = LanguageConfiguration.get(
    GetFromStorage<LanguageType>(CacheKey.User_Language) ?? LanguageType.English
  ) as ILanguageOption;
  if (language.languageType !== LanguageType.English) {
    fetchTranslationCallback?.(language.languageType);
  }
  return language;
};

const GetInitialHardCodedLanguageTranslationDictionary = async (
  initialLanguageOption: ILanguageOption
): Promise<Map<string, ITextLanguageTranslation[]>> => {
  const textValues = GetHardCodedLangaugeDicationaryEnglishStrings(
    InitialHardCodedTextConfigMap
  );
  const translatedValues = await getTextTranslations(
    textValues,
    initialLanguageOption.languageISOString
  );
  const isValid = VerifyTranslationResponseObjectIsValid(translatedValues);

  if (!isValid || !translatedValues) {
    console.log("Translation response was invalid!");
    return InitialHardCodedTextConfigMap;
  }

  return GetInitialHardCodedLanguageDictionary(
    translatedValues,
    initialLanguageOption
  );
};

export function GetInitialHardCodedLanguageDictionary(
  translatedValues: ITranslationResponse,
  languageOption: ILanguageOption
): Map<string, ITextLanguageTranslation[]> {
  //TODO: need to actually create a copy!

  for (let i = 0; i < translatedValues.translation.length; i++) {
    const textLanguageTranslationList = InitialHardCodedTextConfigMap.get(
      translatedValues.text[i]
    );
    if (!textLanguageTranslationList) {
      console.log(
        `Could not find ${translatedValues.text} in the hard coded map!`
      );
      continue;
    }
    const updatedTextLanguageTranslationList: ITextLanguageTranslation[] = [
      ...textLanguageTranslationList,
      {
        languageType: languageOption.languageType,
        translation: translatedValues.translation[i],
      },
    ];

    InitialHardCodedTextConfigMap.set(
      translatedValues.text[i],
      updatedTextLanguageTranslationList
    );
  }

  return InitialHardCodedTextConfigMap;
}

export function VerifyTranslationResponseObjectIsValid(
  translationResponse: ITranslationResponse | undefined
): boolean {
  return (
    !!translationResponse &&
    translationResponse.text &&
    translationResponse.translation &&
    translationResponse.text.length === translationResponse.translation.length
  );
}
