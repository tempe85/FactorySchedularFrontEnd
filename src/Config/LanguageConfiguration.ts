import { LanguageType } from "../Enums";
import { ILanguageOption } from "../Interfaces";

//Reference https://raw.githubusercontent.com/matheuss/google-translate-api/master/languages.js for iso string values
export const LanguageConfiguration: Map<LanguageType, ILanguageOption> =
  new Map<LanguageType, ILanguageOption>([
    [
      LanguageType.English,
      {
        languageHumanReadableString: "English",
        languageISOString: "en",
        languageType: LanguageType.English,
      },
    ],
    [
      LanguageType.French,
      {
        languageHumanReadableString: "French",
        languageISOString: "fr",
        languageType: LanguageType.French,
      },
    ],
    [
      LanguageType.Spanish,
      {
        languageHumanReadableString: "Spanish",
        languageISOString: "es",
        languageType: LanguageType.Spanish,
      },
    ],
    [
      LanguageType.Portuguese,
      {
        languageHumanReadableString: "Portuguese",
        languageISOString: "pt",
        languageType: LanguageType.Portuguese,
      },
    ],
    [
      LanguageType.Russian,
      {
        languageHumanReadableString: "Russian",
        languageISOString: "ru",
        languageType: LanguageType.Russian,
      },
    ],
    [
      LanguageType.Bulgarian,
      {
        languageHumanReadableString: "Bulgarian",
        languageISOString: "bg",
        languageType: LanguageType.Bulgarian,
      },
    ],
  ]);
