import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";
import { Cookies } from "react-cookie-consent";

export const CookieConsentContext = createContext();

/**
 * `CookieConsentProvider` is a context provider component that manages the user's cookie consent for YouTube cookies.
 * It uses the `react-cookie-consent` library to store and retrieve the consent state from cookies.
 * The provider exposes two values:
 * - `consentGiven`: A boolean that indicates whether the user has accepted or denied cookie consent.
 * - `handleAcceptCookies`: A function to set the consent status in the cookie and update the state.
 *
 * The provider also checks if the consent cookie (`youtube-consent`) already exists when the component mounts.
 * If the cookie exists and is set to `"true"`, consent is assumed to have been given.
 * Otherwise, the component defaults to `false` and allows the user to accept or reject consent.
 *
 * @component
 * @example
 * // Usage:
 * <CookieConsentProvider>
 *   <App />
 * </CookieConsentProvider>
 *
 * @returns {JSX.Element} The `CookieConsentProvider` component that wraps its children.
 */
export const CookieConsentProvider = ({ children }) => {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const cookieConsent = Cookies.get("youtube-consent");
    if (cookieConsent === "true") {
      setConsentGiven(true);
    } else {
      setConsentGiven(false);
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
  children: PropTypes.node.isRequired,
};
