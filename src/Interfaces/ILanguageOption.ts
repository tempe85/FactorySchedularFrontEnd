import { LanguageType } from "../Enums";

export interface ILanguageOption {
  languageISOString: string;
  languageHumanReadableString: string;
  languageType: LanguageType;
}
