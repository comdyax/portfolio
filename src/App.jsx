import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Tour from "./components/Tour";
import Video from "./components/Video";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Band from "./components/Band";
import Home from "./components/Home";
import Header from "./components/Header";
import "./App.css";
//import "bootstrap/dist/css/bootstrap.min.css"

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
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Header lan={lan} handleLanChange={(newLan) => setLan(newLan)} />
          }
        >
          <Route index element={<Home />} />
          <Route path="Video" element={<Video />} />
          <Route path="Tour" element={<Tour />} />
          <Route path="Band" element={<Band lan={lan} />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
