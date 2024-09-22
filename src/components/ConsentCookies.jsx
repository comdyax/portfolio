import CookieConsent from "react-cookie-consent";
import { useContext } from "react";
import { CookieConsentContext } from "../contexts/CookieContextProvider";

const ConsentCookies = () => {
  const { handleAcceptCookies } = useContext(CookieConsentContext);
  return (
    //     <button onClick={() => Cookies.remove("youtube-consent")}>
    //     Revoke Consent
    //   </button>
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      onAccept={handleAcceptCookies}
      cookieName="youtube-consent"
    >
      This site uses cookies to embed YouTube videos. YouTube may set cookies on
      your device that could be used for tracking purposes. By clicking
      &quot;Accept&quot;, you consent to the use of cookies.
    </CookieConsent>
  );
};

export default ConsentCookies;
