import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const detectLanguage = () => {
    const userLanguage = navigator.language || navigator.userLanguage;
    const langCode = userLanguage.split("-")[0];
    const supportedLanguages = ["en", "de"];
    return supportedLanguages.includes(langCode) ? langCode : "en";
  };
  useEffect(() => {
    const lan = detectLanguage();
    setLanguage(lan);
  }, []);

  const handleSetLanguage = (value) => {
    setLanguage(value)
  };

  return (
    <LanguageContext.Provider
      value={{ language, handleSetLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

