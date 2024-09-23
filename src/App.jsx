import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import BackgroundWrapper from "./components/BackgroundWrapper";
import { flowField } from "./p5_drawings/flowField";
import Tour from "./components/Tour";
import Releases from "./components/Releases";
import Video from "./components/Video";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Band from "./components/Band";
import Home from "./components/Home";
import Header from "./components/Header";
import { CookieConsentProvider } from "./contexts/CookieContextProvider";
import { LanguageProvider } from "./contexts/LanguageContextProvider";
import ConsentCookies from "./components/ConsentCookies";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [lan, setLan] = useState("en");

  const detectLanguage = () => {
    const userLanguage = navigator.language || navigator.userLanguage;
    const langCode = userLanguage.split("-")[0];
    const supportedLanguages = ["en", "de"];
    return supportedLanguages.includes(langCode) ? langCode : "en";
  };
  useEffect(() => {
    const lan = detectLanguage();
    setLan(lan);
  }, []);

  return (
    <LanguageProvider>
      <CookieConsentProvider>
        <div className="app-container">
          <BackgroundWrapper canvas={flowField} />
          <ConsentCookies />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Header />}>
                <Route index element={<Home />} />
                <Route path="Releases" element={<Releases />} />
                <Route path="Video" element={<Video />} />
                <Route path="Tour" element={<Tour />} />
                <Route path="Band" element={<Band />} />
                <Route path="contact" element={<Contact />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </CookieConsentProvider>
    </LanguageProvider>
  );
}

export default App;
