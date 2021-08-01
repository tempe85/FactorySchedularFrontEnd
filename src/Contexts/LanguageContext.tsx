import * as React from "react";
import { LanguageType } from "../Enums/LanguageType";
import { ILanguageContext } from "../Interfaces";

export const LanguageContext = React.createContext<ILanguageContext>({
  language: LanguageType.English,
  setLanguage: (updatedLanguage: LanguageType) => {},
});

export const LanguageContextProvider = LanguageContext.Provider;
export const LanguageContextConsumer = LanguageContext.Consumer;
