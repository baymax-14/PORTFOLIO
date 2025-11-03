import { useEffect, useState } from "react";
import Container from "./Container.jsx";
import DarkVeil from "./DarkVeil"; // new OGL version

export default function Hero() {
  const title = "Hi, I'm Anand";
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setTyped(title.slice(0, i + 1));
      i++;
      if (i >= title.length) clearInterval(id);
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="rrelative min-h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden bg-black"
    >
      {/* 🌌 Dark Veil background */}
      <DarkVeil className="absolute inset-0 z-0" />

      {/* 🧍‍♂️ Main content */}
      <div className="relative z-10">
        <Container>
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-[0_4px_14px_rgba(0,0,0,.45)]">
              {typed}
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              A passionate Web Developer creating beautiful, functional, and
              user-friendly digital experiences with modern technologies and
              clean code.
            </p>
            <a
              href="#projects"
              className="inline-flex mt-8 items-center rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 px-6 py-3 font-semibold text-slate-900 shadow hover:from-teal-400 hover:to-cyan-300 transition"
            >
              View My Work
            </a>
          </div>
        </Container>
      </div>
    </section>
  );
}
