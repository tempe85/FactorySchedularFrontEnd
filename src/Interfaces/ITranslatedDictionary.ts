import { LanguageType } from "../Enums";

export interface ISourceTargetTranslations {
  sourceLanuage: LanguageType;
  targetLanguage: LanguageType;
  dataTranslations: Map<string, string>;
}
