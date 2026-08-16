// src/components/About.jsx
import Section from "./Section.jsx";
import { FaDownload } from "react-icons/fa";
import ScrambledText from "./ScrambledText.jsx"; // ✅ Import your animation component

export default function About() {
  return (
    <Section id="about" title="About Me">
      <div className="grid md:grid-cols-3 gap-10 items-center">
        {/* LEFT: Video or Image */}
        <div className="flex flex-col items-center">
          <video
            src="/media/about.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="rounded-3xl w-[22rem] md:w-[24rem] aspect-square object-cover shadow-[0_0_40px_rgba(34,211,238,0.18)]"
          />

          <a
            href="https://docs.google.com/document/d/1XcqLu3pMpibCAEvrtxNs2jxDYpdM1A0e/export?format=pdf"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-400 px-4 py-2 font-semibold text-black hover:from-teal-400 hover:to-cyan-300 transition"
          >
            <FaDownload /> Download Resume
          </a>
        </div>

        {/* RIGHT: Scrambled Text */}
        <div className="md:col-span-2 flex items-center">
          <div className="space-y-6 text-gray-300 leading-relaxed text-base md:text-lg max-w-2xl">
            <ScrambledText
              radius={100}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:"
            >
              {" "}
              Hey, I’m Anand Rathod, a passionate Front-End Developer who loves
              creating clean, modern, and responsive web experiences. I enjoy
              transforming ideas into interactive websites that not only work
              smoothly but also look great on every screen.{" "}
            </ScrambledText>{" "}
            <ScrambledText
              radius={100}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:"
            >
              {" "}
              I work mainly with HTML, CSS, JavaScript, and React.js, and I’m
              always exploring new libraries like Framer Motion and ShadCN UI to
              make my projects more dynamic and engaging. My goal is to blend
              good design with solid functionality — because I believe a website
              should feel as good as it looks.{" "}
            </ScrambledText>{" "}
            <ScrambledText
              radius={100}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:"
            >
              {" "}
              When I’m not deep in code, you’ll probably find me exploring new
              tech tools, tweaking designs, scrolling through developer
              communities or gaming. I’m always up for a challenge and love
              working on projects that push me to grow as a creator.{" "}
            </ScrambledText>
          </div>
        </div>
      </div>
    </Section>
  );
}
