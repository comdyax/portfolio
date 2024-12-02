import CookieConsent from "react-cookie-consent";
import { useContext } from "react";
import { CookieConsentContext } from "../contexts/CookieContextProvider";
import { LanguageContext } from "../contexts/LanguageContextProvider";

/**
 * ConsentCookies is a React component that displays a cookie consent banner,
 * allowing users to accept or decline cookies. The banner's text and button
 * labels adapt to the current language context.
 *
 * @component
 *
 * @example
 * // Usage:
 * <ConsentCookies />
 *
 * @requires CookieConsentContext - Context providing the handler for accepting or declining cookies.
 * @requires LanguageContext - Context providing the current language setting.
 * @requires CookieConsent - A third-party component for managing cookie consent UI.
 */
const ConsentCookies = () => {
  const { handleAcceptCookies } = useContext(CookieConsentContext);
  const { language } = useContext(LanguageContext);
  return (
    <CookieConsent
      location="bottom"
      buttonText={language === "de" ? "Annehmen" : "Accept"}
      declineButtonText={language === "de" ? "Ablehnen" : "Decline"}
      buttonStyle={{
        backgroundColor: "white",
        color: "black",
        borderRadius: "8px",
        padding: "10px 15px",
      }}
      declineButtonStyle={{
        backgroundColor: "black",
        color: "white",
        borderRadius: "8px",
        padding: "10px 15px",
      }}
      enableDeclineButton
      onAccept={() => handleAcceptCookies(true)}
      onDecline={() => handleAcceptCookies(false)}
      cookieName="youtube-consent"
    >
      {language === "de" ? (
        <>
          Diese Website verwendet Cookies, um YouTube-Videos einzubetten.
          YouTube kann Cookies auf Ihrem Gerät setzen, die zu Tracking-Zwecken
          verwendet werden könnten. Durch Klicken auf &quot;Akzeptieren&quot;
          stimmen Sie der Verwendung von Cookies zu.
        </>
      ) : (
        <>
          This site uses cookies to embed YouTube videos. YouTube may set
          cookies on your device that could be used for tracking purposes. By
          clicking &quot;Accept&quot;, you consent to the use of cookies.
        </>
      )}
    </CookieConsent>
  );
};

export default ConsentCookies;
