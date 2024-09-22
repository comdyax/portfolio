import { createContext, useState, useEffect } from "react";
import { Cookies } from "react-cookie-consent";

export const CookieConsentContext = createContext();

export const CookieConsentProvider = ({ children }) => {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const cookieConsent = Cookies.get("youtube-consent");
    if (cookieConsent) {
      setConsentGiven(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    Cookies.set("youtube-consent", "true", { expires: 365 });
    setConsentGiven(true);
  };

  return (
    <CookieConsentContext.Provider
      value={{ consentGiven, handleAcceptCookies }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};
