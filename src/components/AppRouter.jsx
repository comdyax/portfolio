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

/**
 * AppRouter component that handles routing and dynamic styling based on light mode.
 * It renders different routes and handles the background and theme changes based on light/dark mode.
 *
 * @returns {JSX.Element} The AppRouter component.
 */
const AppRouter = () => {
  const { lightMode } = useContext(LightContext);

  /**
   * useEffect hook that updates the CSS variables for background colors, text colors,
   * and link colors when the lightMode state changes.
   *
   * It applies the appropriate styles from the config file based on whether the user is in light or dark mode.
   */
  useEffect(() => {
    if ("light" in config.style && "dark" in config.style) {
      const root = document.documentElement;
      const style = lightMode ? config.style.light : config.style.dark;

      root.style.setProperty("--background-color", style.backgroundColor);
      root.style.setProperty(
        "--background-color-components",
        style.backgroundColorComponents
      );
      root.style.setProperty("--text-color", style.textColor);
      root.style.setProperty("--link-text-color", style.linkColor);
      root.style.setProperty("--link-hover-text-color", style.linkColorHover);
    }
  }, [lightMode]);

  const menu = config.menu;

  return (
    <>
      {/* Conditionally render the BackgroundWrapper based on the lightMode */}
      {config.style.p5background && !lightMode && (
        <BackgroundWrapper canvas={background} />
      )}

      <BrowserRouter>
        <div className="app">
          <TopScroller />
          <Header />
          <Routes>
            {/* Conditionally render routes based on the config menu */}
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
