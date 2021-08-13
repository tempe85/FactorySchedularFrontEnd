import { LanguageType, TextTranslationType } from "../Enums";
import { ITextLanguageTranslation } from "../Interfaces";

export const InitialHardCodedTextConfigMap: Map<
  string,
  ITextLanguageTranslation[]
> = new Map<TextTranslationType, ITextLanguageTranslation[]>([
  [
    TextTranslationType.WelcomeToFactorySchedular,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.WelcomeToFactorySchedular,
      },
    ],
  ],
  [
    TextTranslationType.English,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.English,
      },
    ],
  ],
  [
    TextTranslationType.WorkAreas,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.WorkAreas,
      },
    ],
  ],
  [
    TextTranslationType.Spanish,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.Spanish,
      },
    ],
  ],
  [
    TextTranslationType.French,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.English,
      },
    ],
  ],
]);
