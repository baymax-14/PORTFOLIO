import { FiCpu } from "react-icons/fi";
import { TbBrandReact } from "react-icons/tb";
import { LuPenTool } from "react-icons/lu";
import Section from "./Section.jsx";

const expertise = [
  {
    icon: <FiCpu className="size-7 text-cyan-400" />,
    hashtag: "#backend-oop",
    kicker: "Software",
    title: "Development",
    accent: "after:bg-pink-400",
    points: [
      "Experienced in both functional and OOP.",
      "Python, Java, JavaScript.",
    ],
  },
  {
    icon: <TbBrandReact className="size-7 text-cyan-400" />,
    hashtag: "#frontend-uiux",
    kicker: "Frontend Dev",
    title: "React, NextJS",
    accent: "after:bg-cyan-400",
    points: [
      "Passionate about UI/UX and clean code.",
      "HTML, CSS, JS, React & Next.js frameworks.",
    ],
  },
  {
    icon: <LuPenTool className="size-7 text-cyan-400" />, // you can use LuPenTool or FiEdit3
    hashtag: "#ui-ux-design",
    kicker: "UI/UX",
    title: "Design",
    accent: "after:bg-purple-400",
    points: [
      "Beginner in UI/UX design with a growing interest in creating visually appealing and user-friendly interfaces.",
      "Exploring tools like Figma and Framer to improve design thinking and prototyping skills.",
    ],
  },
];

export default function Expertise() {
  return (
    <Section id="expertise" title="My Expertise">
      {/* grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {expertise.map((card, i) => (
          <article
            key={i}
            className="
              group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5
              backdrop-blur-sm px-6 py-7
              transition-shadow duration-300
              hover:shadow-[0_0_40px_rgba(34,211,238,.15)]
            "
          >
            {/* subtle animated border glow */}
            <div
              className="
                pointer-events-none absolute inset-0 rounded-2xl
                opacity-0 group-hover:opacity-100 transition-opacity duration-300
                [background:radial-gradient(600px_200px_at_var(--x,_50%)_0%,rgba(34,211,238,.08),transparent_60%)]
              "
            />

            {/* hashtag */}
            <h3 className="text-xs font-mono text-gray-500 mb-3 tracking-tight">
              {card.hashtag}
            </h3>

            {/* header */}
            <div className="flex items-center gap-3">
              <div className="inline-flex size-11 items-center justify-center rounded-xl bg-black/40 ring-1 ring-white/10">
                {card.icon}
              </div>

              <h3 className="text-xl font-semibold leading-tight">
                <span
                  className={`relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:rounded-full ${card.accent}`}
                >
                  {card.kicker}
                </span>
                <span className="block text-white/90">{card.title}</span>
              </h3>
            </div>

            {/* body */}
            <div className="mt-5 pl-4 border-l-2 border-white/10 relative">
              {/* opening <h3> tag */}
              <span className="text-xs font-mono text-gray-500 absolute -top-4 left-0 opacity-70 select-none">
                &lt;h3&gt;
              </span>

              <ul className="space-y-2 text-gray-300 mt-2">
                {card.points.map((p, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {p}
                  </li>
                ))}
              </ul>

              {/* closing </h3> tag */}
              <span className="text-xs font-mono text-gray-500 mt-3 block opacity-70 select-none">
                &lt;/h3&gt;
              </span>
            </div>

            {/* mouse position glow */}
            <MouseGlow />
          </article>
        ))}
      </div>
    </Section>
  );
}

/**
 * Tracks mouse position over the card and writes CSS var --x for the radial glow
 */
function MouseGlow() {
  return (
    <div
      onMouseMove={(e) => {
        const target = e.currentTarget.parentElement; // the <article>
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        target.style.setProperty("--x", `${x}%`);
      }}
      className="absolute inset-0"
      aria-hidden
    />
  );
}
