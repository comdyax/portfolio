import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

/**
 * The `LanguageProvider` component provides the current language setting for the application and allows other components
 * to access and modify the language. It detects the user's preferred language from the browser settings and defaults to
 * "en" (English) if the user's language is not supported. The supported languages are "en" (English) and "de" (German).
 *
 * This component uses the `LanguageContext` to make the current language and a function to change it available to child components.
 *
 * @component
 * @example
 * // Usage:
 * <LanguageProvider>
 *   <SomeComponent />
 * </LanguageProvider>
 *
 * @returns {JSX.Element} The `LanguageContext.Provider` wrapping the children components.
 */
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
    setLanguage(value);
  };

  return (
    <LanguageContext.Provider value={{ language, handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
