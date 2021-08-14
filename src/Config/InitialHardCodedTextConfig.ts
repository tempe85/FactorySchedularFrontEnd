import { LanguageType, TextTranslationType } from "../Enums";
import { ITextLanguageTranslation } from "../Interfaces";

export const InitialHardCodedTextConfigMap: Map<
  string,
  ITextLanguageTranslation[]
> = new Map<TextTranslationType, ITextLanguageTranslation[]>([
  [
    TextTranslationType.WelcomeToFactoryScheduler,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.WelcomeToFactoryScheduler,
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
        translation: TextTranslationType.French,
      },
    ],
  ],
  [
    TextTranslationType.LogIn,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.LogIn,
      },
    ],
  ],
  [
    TextTranslationType.Admin,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.Admin,
      },
    ],
  ],
  [
    TextTranslationType.HomePage,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.HomePage,
      },
    ],
  ],
  [
    TextTranslationType.LogOut,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.LogOut,
      },
    ],
  ],
  [
    TextTranslationType.Schedule,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.Schedule,
      },
    ],
  ],
  [
    TextTranslationType.CurrentWorkAreaSchedules,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.CurrentWorkAreaSchedules,
      },
    ],
  ],
  [
    TextTranslationType.Buildings,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.Buildings,
      },
    ],
  ],
  [
    TextTranslationType.WorkStations,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.WorkStations,
      },
    ],
  ],
  [
    TextTranslationType.WelcomeSubTitle,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.WelcomeSubTitle,
      },
    ],
  ],
  [
    TextTranslationType.WelcomeSubTitle2,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.WelcomeSubTitle2,
      },
    ],
  ],
  [
    TextTranslationType.WelcomeSubTitle3,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.WelcomeSubTitle3,
      },
    ],
  ],
  [
    TextTranslationType.Russian,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.Russian,
      },
    ],
  ],
  [
    TextTranslationType.Bulgarian,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.Bulgarian,
      },
    ],
  ],
  [
    TextTranslationType.scheduleSubtitle,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.scheduleSubtitle,
      },
    ],
  ],
  [
    TextTranslationType.viewWorkAreas,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.viewWorkAreas,
      },
    ],
  ],
  [
    TextTranslationType.updateLanguage,
    [
      {
        languageType: LanguageType.English,
        translation: TextTranslationType.updateLanguage,
      },
    ],
  ],
]);
