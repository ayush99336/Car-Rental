import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import OurTeam from "./pages/OurTeam";
import Testimonials from "./pages/Testimonials";
import VehicalModel from "./pages/VehicalModel";
import Contact from "./pages/Contact";
// import bgHome from "./assets/hero/hero-bg.png";

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/vehical-models" element={<VehicalModel />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
