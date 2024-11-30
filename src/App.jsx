import { CookieConsentProvider } from "./contexts/CookieContextProvider";
import { LanguageProvider } from "./contexts/LanguageContextProvider";
import { PlayProvider } from "./contexts/PlayContextProvider";
import ConsentCookies from "./components/ConsentCookies";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { LightProvider } from "./contexts/LightContextProvider";
import AppRouter from "./components/AppRouter";

const App = () => {
  
  return (
    <LightProvider>
      <PlayProvider>
        <LanguageProvider>
          <CookieConsentProvider>
            <ConsentCookies />
            <AppRouter />
          </CookieConsentProvider>
        </LanguageProvider>
      </PlayProvider>
    </LightProvider>
  );
};

export default App;
