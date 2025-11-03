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
            href="/Anand_Rathod_Resume.pdf"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-400 px-4 py-2 font-semibold text-black hover:from-teal-400 hover:to-cyan-300 transition"
          >
            <FaDownload /> Download Resume
          </a>
        </div>

        {/* RIGHT: Scrambled Text */}
        <div className="md:col-span-2 flex items-center">
          <div className="space-y-6 text-gray-300 leading-relaxed text-base md:text-lg max-w-2xl">
            <ScrambledText radius={100} duration={1.2} speed={0.5} scrambleChars=".:">
              {" "}
              Hey there! I’m a web developer who loves bringing ideas to life
              through clean design and smooth functionality. For the past few
              years, I’ve been building responsive, modern websites that don’t
              just work well — they look good too.{" "}
            </ScrambledText>{" "}
            <ScrambledText radius={100} duration={1.2} speed={0.5} scrambleChars=".:">
              {" "}
              I mainly work with React and other JavaScript frameworks, but I’m
              always learning something new. Whether it’s front-end design or
              back-end logic, I enjoy solving problems and turning creative
              concepts into working digital experiences.{" "}
            </ScrambledText>{" "}
            <ScrambledText radius={100} duration={1.2} speed={0.5} scrambleChars=".:">
              {" "}
              When I’m not deep in code, you’ll probably find me exploring new
              tech tools, tweaking designs, scrolling through developer
              communities or gaming. I’m always up for a challenge and love working on
              projects that push me to grow as a creator.{" "}
            </ScrambledText>
          </div>
        </div>
      </div>
    </Section>
  );
}
