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
import Imprint from "./components/Imprint";
import { CookieConsentProvider } from "./contexts/CookieContextProvider";
import { LanguageProvider } from "./contexts/LanguageContextProvider";
import ConsentCookies from "./components/ConsentCookies";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <LanguageProvider>
      <CookieConsentProvider>
        <BackgroundWrapper canvas={flowField} />
        <ConsentCookies />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Releases" element={<Releases />} />
            <Route path="Video" element={<Video />} />
            <Route path="Tour" element={<Tour />} />
            <Route path="Band" element={<Band />} />
            <Route path="Contact" element={<Contact />} />
            <Route path="Imprint" element={<Imprint />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CookieConsentProvider>
    </LanguageProvider>
  );
}

export default App;
