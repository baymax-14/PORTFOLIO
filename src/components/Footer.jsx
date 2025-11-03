import Container from "./Container.jsx";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaExternalLinkAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-black via-black to-[#020617] text-gray-400 py-10 mt-10">
      {/* background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <Container>
        {/* top section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl font-semibold text-white tracking-tight">
              Let’s Connect 🚀
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Open for collaborations, freelance work, or just a friendly chat.
            </p>
          </div>

          {/* social icons */}
          <div className="flex gap-4 text-xl">
            <FooterIcon
              href="https://github.com/baymax-14"
              icon={<FaGithub />}
              label="GitHub"
            />
            <FooterIcon
              href="https://www.linkedin.com/in/anand-rathod-b95b14290/"
              icon={<FaLinkedin />}
              label="LinkedIn"
            />
            <FooterIcon
              href="https://www.freelancer.in"
              icon={<FaExternalLinkAlt />}
              label="Freelancer"
            />
            <FooterIcon
              href="mailto:anand2005rathod@gmail.com"
              icon={<FaEnvelope />}
              label="Email"
            />
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-8 border-t border-white/10 pt-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
          <p className="text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="text-cyan-400 font-semibold">Anand Rathod</span>.
            All rights reserved.
          </p>

          <p className="text-white/70">
            Built with <span className="text-cyan-400">React</span> & crafted
            with <span className="text-cyan-400">Tailwind</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}

// Reusable icon button component
function FooterIcon({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="
        group grid h-11 w-11 place-items-center rounded-full
        bg-white/5 border border-white/10
        hover:border-cyan-400/50 hover:bg-cyan-500/20
        text-slate-100 hover:text-cyan-300
        transition-all duration-300
        hover:shadow-[0_0_12px_rgba(34,211,238,0.3)]
      "
    >
      <span className="transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </span>
    </a>
  );
}
