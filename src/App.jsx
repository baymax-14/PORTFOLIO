import { Component as KineticNavigation } from "./components/ui/sterling-gate-kinetic-navigation.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Expertise from "./components/Expertise.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import DrawingCursor from "./components/ui/drawing-cursor.jsx";

export default function App() {
  return <DrawingCursor className="portfolio-shell">
    <div className="progress-track" aria-hidden="true"><ScrollProgress className="progress-fill" /></div>
    <KineticNavigation />
    <main><Hero /><About /><Expertise /><Projects /><Contact /></main>
    <Footer />
  </DrawingCursor>;
}
