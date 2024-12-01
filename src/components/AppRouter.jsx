import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import Music from "./Music";
import Tour from "./Tour";
import Releases from "./Releases";
import Video from "./Video";
import Footer from "./Footer";
import About from "./About";
import Home from "./Home";
import Header from "./Header";
import Imprint from "./Imprint";
import PrivacyPolicy from "./PrivacyPolicy";
import TopScroller from "./TopScroller";
import ImageGallery from "./ImageGallery";
import NotFound from "./NotFound";
import config from "../assets/config.json";
import { LightContext } from "../contexts/LightContextProvider";
import BackgroundWrapper from "./BackgroundWrapper";
import { background } from "../p5_drawings/background";

const AppRouter = () => {
  const { lightMode } = useContext(LightContext);
  useEffect(() => {
    if ("light" in config.style && "dark" in config.style) {
      const root = document.documentElement;
      if (lightMode) {
        const style = config.style.light;
        root.style.setProperty("--background-color", style.backgroundColor);
        root.style.setProperty(
          "--background-color-components",
          style.backgroundColorComponents
        );
        root.style.setProperty("--text-color", style.textColor);
        root.style.setProperty("--link-text-color", style.linkColor);
        root.style.setProperty("--link-hover-text-color", style.linkColorHover);
      } else {
        const style = config.style.dark;
        root.style.setProperty("--background-color", style.backgroundColor);
        root.style.setProperty(
          "--background-color-components",
          style.backgroundColorComponents
        );
        root.style.setProperty("--text-color", style.textColor);
        root.style.setProperty("--link-text-color", style.linkColor);
        root.style.setProperty("--link-hover-text-color", style.linkColorHover);
      }
    }
  }, [lightMode]);
  const menu = config.menu;
  return (
    <>
      {config.style.p5background && !lightMode && (
        <BackgroundWrapper canvas={background} />
      )}
      <BrowserRouter>
        <div className="app">
          <TopScroller />
          <Header />
          <Routes>
            {menu.home && <Route path="/" element={<Home />} />}
            {menu.visualizer && <Route path="music" element={<Music />} />}
            {menu.releases && <Route path="releases" element={<Releases />} />}

            {menu.pictures && (
              <Route path="pictures" element={<ImageGallery />} />
            )}
            {menu.video && <Route path="video" element={<Video />} />}
            {menu.tour && <Route path="tour" element={<Tour />} />}
            {menu.about && <Route path="about" element={<About />} />}
            <Route path="imprint" element={<Imprint />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
