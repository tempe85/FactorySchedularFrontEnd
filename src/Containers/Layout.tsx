import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../Components/NavBar";
import { LanguageContextProvider } from "../Contexts/LanguageContext";
import { LanguageType } from "../Enums/LanguageType";

interface IProps {
  children: React.ReactNode;
}
export function Layout(props: IProps) {
  const [language, setLanguage] = useState<LanguageType>(LanguageType.English);

  const updateLanguage = (updatedLanguage: LanguageType) => {
    setLanguage(updatedLanguage);
  };
  return (
    <div>
      <LanguageContextProvider
        value={{
          language: language,
          setLanguage: setLanguage,
        }}
      >
        <NavBar language={language}>{props.children}</NavBar>
      </LanguageContextProvider>
      <ToastContainer position="bottom-left" />
    </div>
  );
}
