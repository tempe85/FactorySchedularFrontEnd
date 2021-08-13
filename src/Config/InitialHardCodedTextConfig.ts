import { LanguageType, TextTranslationType } from "../Enums";
import { ITextLanguageTranslation } from "../Interfaces";

export const InitialHardCodedTextConfigMap: Map<
  string,
  ITextLanguageTranslation[]
> = new Map<string, ITextLanguageTranslation[]>([
  [
    "Welcome To Factory Schedular!",
    [
      {
        languageType: LanguageType.English,
        translation: "Welcome To Factory Schedular!",
      },
    ],
  ],
  [
    "English",
    [
      {
        languageType: LanguageType.English,
        translation: "English",
      },
    ],
  ],
  [
    "Work Areas",
    [
      {
        languageType: LanguageType.English,
        translation: "Work Areas",
      },
    ],
  ],
  [
    TextTranslationType.Spanish,
    [
      {
        languageType: LanguageType.English,
        translation: "Spanish",
      },
    ],
  ],
  [
    TextTranslationType.French,
    [
      {
        languageType: LanguageType.English,
        translation: "French",
      },
    ],
  ],
]);
