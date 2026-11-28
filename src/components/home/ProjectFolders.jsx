import { Link } from "react-router-dom";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { projects } from "../../data/projects";
import { cn } from "../../lib/cn";
import { MarginNote, MonoLabel, PixelHeading, Tape } from "../ui";
import ProjectImage from "../work/ProjectImage";
import Reveal from "../ui/Reveal";

const THEMES = {
  dark: { body: "bg-ink text-white", sub: "text-white/70", rule: "border-white/40", chip: "border-white/25" },
  yellow: { body: "bg-marker-yellow text-ink", sub: "text-ink/75", rule: "border-ink/50", chip: "border-ink/25" },
  blue: { body: "bg-marker-blue text-white", sub: "text-white/80", rule: "border-white/50", chip: "border-white/30" },
};

// folder tab: slanted right edge
const TAB_CLIP = "polygon(0 0, calc(100% - 26px) 0, 100% 100%, 0 100%)";
const TAB_HEIGHT = 38;
const STICK_TOP = 56; // just under the navbar

export default function ProjectFolders() {
  return (
    <section aria-labelledby="work-heading" className="mx-auto max-w-[1080px] px-3 pb-24 sm:px-6">
      <Reveal className="mb-10 px-2">
        <div className="relative inline-block pt-12 sm:pt-9">
          <PixelHeading as="h2" id="work-heading" className="text-6xl sm:text-8xl">
            Featured Work
          </PixelHeading>
          <MarginNote>explore my work!</MarginNote>
        </div>
      </Reveal>

      <ol className="relative">
        {projects.map((p, i) => (
          <Folder key={p.slug} project={p} index={i} />
        ))}
      </ol>

      <div className="mt-10 flex justify-center">
        <Link
          to="/work"
          className="mono-label border-b border-ink pb-0.5 transition-colors hover:text-marker-blue"
        >
          See all projects ↗
        </Link>
      </div>
    </section>
  );
}

function Folder({ project: p, index }) {
  const t = THEMES[p.folder];
  const num = String(index + 1).padStart(2, "0");

  return (
    <li
      // folders stick and stack while scrolling, each leaving its tab peeking out. Only on wide
      // screens tall enough to show a whole folder; otherwise the next one would slide over its links.
      // The offset is applied only with sticky: on a relative li, `top` would shift it down instead.
      className="relative mb-6 md:mb-0 md:pb-10 [@media(min-width:768px)_and_(min-height:600px)]:sticky [@media(min-width:768px)_and_(min-height:600px)]:top-[var(--stick)]"
      style={{ "--stick": `${STICK_TOP + index * TAB_HEIGHT}px`, zIndex: index + 1 }}
    >
      <div
        className={cn("relative flex items-center gap-2 pl-5 pr-10", t.body)}
        style={{
          height: TAB_HEIGHT,
          width: 210,
          marginLeft: `min(${index * 190}px, calc(100% - 210px))`,
          clipPath: TAB_CLIP,
        }}
      >
        <MonoLabel>✦ Project {num}</MonoLabel>
      </div>

      <article
        className={cn(
          "grid min-h-[420px] gap-8 overflow-hidden px-6 py-8 shadow-[0_-8px_24px_-12px_rgba(0,0,0,.35)] sm:px-10 sm:py-10 md:grid-cols-[1fr_1.15fr]",
          t.body,
        )}
      >
        <div className="flex flex-col">
          <MonoLabel className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-current" aria-hidden />
            {p.date}
          </MonoLabel>
          <h3 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{p.title}</h3>
          <p className={cn("mt-3 max-w-sm text-[15px] leading-relaxed", t.sub)}>{p.pitch}</p>

          <ul className="mt-6 space-y-1.5">
            {p.highlights.map((h) => (
              <li key={h} className={cn("flex gap-2 text-sm", t.sub)}>
                <span aria-hidden>→</span>
                {h}
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tech stack">
            {p.stack.map((s) => (
              <li key={s} className={cn("mono-label border px-2 py-1", t.chip)}>
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
            <Link to={`/work/${p.slug}`} className={cn("mono-label border-b pb-0.5 hover:opacity-70", t.rule)}>
              View project <FiArrowUpRight className="inline -translate-y-px" aria-hidden />
            </Link>
            {p.links.live && (
              <a
                href={p.links.live}
                target="_blank"
                rel="noreferrer"
                className={cn("mono-label border-b pb-0.5 hover:opacity-70", t.rule)}
              >
                Live demo <FiArrowUpRight className="inline -translate-y-px" aria-hidden />
              </a>
            )}
            {p.links.code && (
              <a
                href={p.links.code}
                target="_blank"
                rel="noreferrer"
                className={cn("mono-label inline-flex items-center gap-1 hover:opacity-70")}
              >
                <FiGithub aria-hidden /> Code
              </a>
            )}
          </div>
        </div>

        <Shot project={p} />
      </article>
    </li>
  );
}

function Shot({ project: p }) {
  return (
    <div className="relative self-center px-2 py-4">
      <Tape className="-top-0 left-4" rotate={-6} color="sand" />
      <Tape className="-top-0 right-4" rotate={7} color="sand" />
      <ProjectImage project={p} />
    </div>
  );
}
