import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tour from "./components/Tour";
import Video from "./components/Video";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Band from "./components/Band";
import Home from "./components/Home";
import Header from "./components/Header";
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="Video" element={<Video />} />
          <Route path="Tour" element={<Tour />}/>
          <Route path="Band" element={<Band />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // <>
    // <div className="app-container">
    //   <BackgroundWrapper canvas={gridParticles} />
    //   <div className="content">
    //     <h1>Perplexities on Mars</h1>
    //   </div>
    //   {/* <BackgroundWrapper canvas={flowField} /> */}
    // </div>
    // </>
  )
}

export default App


