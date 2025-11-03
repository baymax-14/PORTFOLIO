import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Expertise from "./components/Expertise.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import LogoLoop from "./components/LogoLoop.jsx"; 
import { href } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Progress bar (fixed at very top) */}
      <div className="fixed inset-x-0 top-0 z-[9999] pointer-events-none">
        <ScrollProgress
          className="
            h-1
            bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500
            shadow-[0_0_12px_rgba(34,211,238,.45)]
            rounded-full
          "
        />
      </div>

      <Header />

      <main>
        <Hero />

        {/* —— Logo loop between Hero and About —— */}
        <section className="py-10 md:py-12 bg-black">
          <div className="max-w-6xl mx-auto px-4">
            <LogoLoop
              logos={[
                { src: "/logos/html5.svg", alt: "HTML5" , href: "https://www.geeksforgeeks.org/html/html5-introduction/" },
                { src: "/logos/css3.svg", alt: "CSS3" , href:"https://developer.mozilla.org/en-US/docs/Web/CSS}"},
                { src: "/logos/javascript.svg", alt: "JavaScript" , href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
                { src: "/logos/react.svg", alt: "React", href: "https://react.dev"},
                { src: "/logos/nodejs.svg", alt: "Node.js" , href:"https://nodejs.org/en" },
                { src: "/logos/python.svg", alt: "Python" , href:"https://www.python.org/" },
                { src: "/logos/tailwindcss.svg", alt: "Tailwind CSS" , href:"https://tailwindcss.com/"},
                { src: "/logos/github.svg", alt: "GitHub" , href:"https://github.com/"},
              ]}
              speed={90}
              direction="left"
              width="100%"
              logoHeight={42}   // tweak size here
              gap={48}          // spacing between logos
              pauseOnHover={true}
              fadeOut={true}
              fadeOutColor="#000"
              scaleOnHover={true}
              ariaLabel="Tech stack logos"
              className="opacity-90 hover:opacity-100 transition"
            />
          </div>
        </section>

        <About />
        <Expertise />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
