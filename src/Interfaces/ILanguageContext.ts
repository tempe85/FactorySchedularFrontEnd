import { LanguageType } from "../Enums/LanguageType";

export interface ILanguageContext {
  setLanguage: (updatedLanguage: LanguageType) => void;
  language: LanguageType;
}
