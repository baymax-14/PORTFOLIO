import Section from "./Section.jsx";
import { ExpandableCard } from "./ExpandableCard";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const PROJECTS = [
  {
    title: "Portfolio Website",
    src: "/images/portfolio.png",
    description: "Personal project",
    details:
      "A modern, responsive portfolio built with React and Tailwind CSS to showcase my skills, projects, and experience. Designed with a clean aesthetic, smooth animations, and a functional contact form powered by Formspree.",
    tech: ["React", "Tailwind CSS", "Formspree"],
    demo: "https://portfolio-anandrathod.vercel.app/",
  },
  {
    title: "Movie Finder",
    src: "/images/movie.png",
    description: "Web App",
    details:
      "A sleek AngularJS-based movie discovery web app powered by TMDB API, where users can explore trending, popular, and filtered movies or TV shows. Features include search, detailed view pages, smooth animations, and a personalized watchlist — all wrapped in a modern Netflix-inspired UI.",
    tech: ["React", "TMDb", "Angular"],
    demo: "https://baymax-14.github.io/movie-app/#!/search",
    code: "https://github.com/baymax-14/movie-app",
  },
];

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <ExpandableCard
            key={p.title}
            title={p.title}
            src={p.src}
            description={p.description}
            className="bg-[#0a0a0a]"
            classNameExpanded="bg-[#0a0a0a]"
          >
            <p>{p.details}</p>

            <div className="flex flex-wrap gap-2 mt-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs border border-cyan-500/20"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              {p.demo && (
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black rounded-lg font-semibold hover:bg-cyan-400 transition"
                >
                  <FaExternalLinkAlt /> Demo
                </a>
              )}
              {p.code && (
                <a
                  href={p.code}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-700 text-gray-200 rounded-lg hover:border-cyan-400 hover:text-white transition"
                >
                  <FaGithub /> Code
                </a>
              )}
            </div>
          </ExpandableCard>
        ))}
      </div>
    </Section>
  );
}
