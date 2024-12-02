import { CookieConsentProvider } from "./contexts/CookieContextProvider";
import { LanguageProvider } from "./contexts/LanguageContextProvider";
import { PlayProvider } from "./contexts/PlayContextProvider";
import ConsentCookies from "./components/ConsentCookies";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { LightProvider } from "./contexts/LightContextProvider";
import AppRouter from "./components/AppRouter";
import { useEffect } from "react";
import config from "./assets/config.json";

/**
 * The `App` component is the root component of the application that wraps its children with various context providers
 * to handle global state management. It sets the document title based on the `config.name` and provides the following
 * contexts to the rest of the application:
 * - `LightProvider`: Manages light/dark mode settings.
 * - `PlayProvider`: Provides the context for playing media or audio.
 * - `LanguageProvider`: Manages the application's language state.
 * - `CookieConsentProvider`: Handles the user's consent for cookies.
 *
 * The component also renders the `ConsentCookies` component to handle cookie consent UI and the main routing logic via `AppRouter`.
 *
 * @component
 * @example
 * // Usage:
 * <App />
 *
 * @returns {JSX.Element} The root application component wrapped with the necessary context providers.
 */
const App = () => {
  useEffect(() => {
    document.title = config.name;
  }, []);

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
