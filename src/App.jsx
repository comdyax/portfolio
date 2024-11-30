import { BrowserRouter, Routes, Route } from "react-router-dom";
import Music from "./components/Music";
import Tour from "./components/Tour";
import Releases from "./components/Releases";
import Video from "./components/Video";
import Footer from "./components/Footer";
import About from "./components/About";
import Home from "./components/Home";
import Header from "./components/Header";
import Imprint from "./components/Imprint";
import PrivacyPolicy from "./components/PrivacyPolicy";
import { CookieConsentProvider } from "./contexts/CookieContextProvider";
import { LanguageProvider } from "./contexts/LanguageContextProvider";
import { PlayProvider } from "./contexts/PlayContextProvider";
import ConsentCookies from "./components/ConsentCookies";
import BackgroundWrapper from "./components/BackgroundWrapper";
import { background } from "./p5_drawings/background";
import { gridParticles } from "./p5_drawings/gridParticles";
import { flowField } from "./p5_drawings/flowField";
import TopScroller from "./components/TopScroller";
import ImageGallery from "./components/ImageGallery";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import config from "./assets/config.json";

function App() {
  const menu = config.menu;

  function selectBackground() {
    switch (Math.floor(Math.random() * 3)) {
      case 0:
        return <BackgroundWrapper canvas={background} />;
      case 1:
        return <BackgroundWrapper canvas={flowField} />;
      default:
        return <BackgroundWrapper canvas={gridParticles} />;
    }
  }
  return (
    <PlayProvider>
      <LanguageProvider>
        <CookieConsentProvider>
          <ConsentCookies />
          {config.style.canvasActive && selectBackground()}
          <BrowserRouter>
            <div className="app">
              <TopScroller />
              <Header />
              <Routes>
                {menu.home && <Route path="/" element={<Home />} />}
                {menu.visualizer && <Route path="music" element={<Music />} />}
                {menu.releases && (
                  <Route path="releases" element={<Releases />} />
                )}

                {menu.pictures && (
                  <Route path="pictures" element={<ImageGallery />} />
                )}
                {menu.video && <Route path="video" element={<Video />} />}
                {menu.tour && <Route path="tour" element={<Tour />} />}
                {menu.about && <Route path="about" element={<About />} />}
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
