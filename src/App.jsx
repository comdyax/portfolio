import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Imprint from "./components/Imprint";
import PrivacyPolicy from "./components/PrivacyPolicy";
import { CookieConsentProvider } from "./contexts/CookieContextProvider";
import { LanguageProvider } from "./contexts/LanguageContextProvider";
import ConsentCookies from "./components/ConsentCookies";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <LanguageProvider>
      <CookieConsentProvider>
      {/* <BackgroundWrapper canvas={flowField} /> */}
        <ConsentCookies />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="releases" element={<Releases />} />
            <Route path="video" element={<Video />} />
            <Route path="tour" element={<Tour />} />
            <Route path="band" element={<Band />} />
            <Route path="contact" element={<Contact />} />
            <Route path="imprint" element={<Imprint />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CookieConsentProvider>
    </LanguageProvider>
  );
}

export default App;
