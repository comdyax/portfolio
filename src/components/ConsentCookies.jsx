import CookieConsent from "react-cookie-consent";
import { useContext } from "react";
import { CookieConsentContext } from "../contexts/CookieContextProvider";
import { LanguageContext } from "../contexts/LanguageContextProvider";

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
