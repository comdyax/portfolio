import { BrowserRouter, Routes, Route } from "react-router-dom";
import Music from "./components/Music";
import Tour from "./components/Tour";
import Releases from "./components/Releases";
import Video from "./components/Video";
import Footer from "./components/Footer";
import Band from "./components/Band";
import Home from "./components/Home";
import Header from "./components/Header";
import Imprint from "./components/Imprint";
import PrivacyPolicy from "./components/PrivacyPolicy";
import { CookieConsentProvider } from "./contexts/CookieContextProvider";
import { LanguageProvider } from "./contexts/LanguageContextProvider";
import { PlayProvider } from "./contexts/PlayContextProvider";
import ConsentCookies from "./components/ConsentCookies";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BackgroundWrapper from "./components/BackgroundWrapper";
import { background } from "./p5_drawings/background";
import { gridParticles } from "./p5_drawings/gridParticles"
import { flowField } from "./p5_drawings/flowField"
import TopScroller from "./components/TopScroller";


function App() {
  return (
    <PlayProvider>
      <LanguageProvider>
        <CookieConsentProvider>
          <ConsentCookies />
          <BackgroundWrapper canvas={background} />
          {/* <BackgroundWrapper canvas={gridParticles} />
          <BackgroundWrapper canvas={flowField} /> */}
          <BrowserRouter>
            <div className="app">
              <TopScroller />
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="music" element={<Music />} />
                <Route path="releases" element={<Releases />} />
                <Route path="video" element={<Video />} />
                <Route path="tour" element={<Tour />} />
                <Route path="band" element={<Band />} />
                <Route path="imprint" element={<Imprint />} />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
              </Routes>
              <Footer />
            </div>
          </BrowserRouter>
        </CookieConsentProvider>
      </LanguageProvider>
    </PlayProvider>
  );
}

export default App;
