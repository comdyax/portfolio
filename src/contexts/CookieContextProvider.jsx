import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";
import { Cookies } from "react-cookie-consent";

export const CookieConsentContext = createContext();

export const CookieConsentProvider = ({ children }) => {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const cookieConsent = Cookies.get("youtube-consent");
    if (cookieConsent === "true") {
      setConsentGiven(true);
    }else {
      setConsentGiven(false)
    }
  }, []);

  const handleAcceptCookies = (value) => {
    Cookies.set("youtube-consent", value, { expires: 365 });
    setConsentGiven(value);
  };

  return (
    <CookieConsentContext.Provider
      value={{ consentGiven, handleAcceptCookies }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

CookieConsentProvider.propTypes = {
  children: PropTypes.node.isRequired
}
