import { Link } from "react-router-dom";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { projects, smallBuilds } from "../data/projects";
import { HandNote, MarginNote, MonoLabel, PixelHeading, StickyNote, Tape } from "../components/ui";
import ProjectImage from "../components/work/ProjectImage";
import Reveal from "../components/ui/Reveal";

const CARD_TILT = [-1.2, 1, -0.6];
const NOTE_COLORS = ["yellow", "mint", "lilac"];

export default function Work() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
      <div className="relative inline-block pt-12 sm:pt-9">
        <PixelHeading className="text-7xl sm:text-[9rem]">Featured Works</PixelHeading>
        <MarginNote>explore my work!</MarginNote>
      </div>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
        Three things I'm proud of, each with the problem, what I built, and the real numbers. Click through for
        the full story.
      </p>

      <ul className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal as="li" delay={(i % 2) * 0.1} key={p.slug} className={i === 2 ? "md:col-span-2 md:mx-auto md:w-1/2" : undefined}>
            <ProjectCard project={p} tilt={CARD_TILT[i % CARD_TILT.length]} />
          </Reveal>
        ))}
      </ul>

      <section aria-labelledby="small-builds" className="mt-28">
        <div className="relative inline-block pt-12 sm:pt-9">
          <PixelHeading as="h2" id="small-builds" className="text-5xl sm:text-7xl">
            Side Quests
          </PixelHeading>
          {/* phones: the note is wider than the heading, so anchor it left instead of right */}
          <MarginNote className="max-sm:left-2 max-sm:right-auto">and some smaller things</MarginNote>
        </div>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {smallBuilds.map((b, i) => (
            <Reveal as="li" delay={i * 0.08} key={b.title}>
              <StickyNote
                color={NOTE_COLORS[i % NOTE_COLORS.length]}
                rotate={[-2, 1.5, -1][i % 3]}
                tape="sand"
                className="flex h-full flex-col transition-transform duration-200 hover:!rotate-0 hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold tracking-tight">{b.title}</h3>
                <HandNote className="mt-2 text-lg leading-snug">{b.blurb}</HandNote>
                <div className="mt-auto flex gap-5 pt-5">
                  {b.links.live && (
                    <a
                      href={b.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="mono-label border-b border-ink pb-0.5 hover:text-marker-blue"
                    >
                      Live <FiArrowUpRight className="inline -translate-y-px" aria-hidden />
                    </a>
                  )}
                  {b.links.code && (
                    <a
                      href={b.links.code}
                      target="_blank"
                      rel="noreferrer"
                      className="mono-label inline-flex items-center gap-1 hover:text-marker-blue"
                    >
                      <FiGithub aria-hidden /> Code
                    </a>
                  )}
                </div>
              </StickyNote>
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ProjectCard({ project: p, tilt }) {
  return (
    <Link to={`/work/${p.slug}`} className="group block" aria-label={`${p.title}: read the case study`}>
      <div
        className="relative bg-marker-sand p-4 pt-12 shadow-sticky transition-transform duration-300 ease-out group-hover:!rotate-0 group-hover:-translate-y-1.5"
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        <MonoLabel className="absolute left-4 top-4 flex items-center gap-2 bg-ink px-2.5 py-1 text-white">
          <span className="size-1.5 rounded-full bg-white" aria-hidden />
          {p.date}
        </MonoLabel>
        <Tape className="-top-2 right-8" rotate={8} color="lilac" />
        <div className="overflow-hidden">
          <ProjectImage
            project={p}
            className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </div>
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          {p.title}{" "}
          <FiArrowUpRight
            className="inline size-5 -translate-y-0.5 transition-transform group-hover:-translate-y-1.5 group-hover:translate-x-1"
            aria-hidden
          />
        </h2>
        <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-ink-soft">{p.pitch}</p>
        <ul className="mt-3 flex flex-wrap justify-center gap-1.5">
          {p.tags.map((t) => (
            <li key={t} className="mono-label border border-ink/25 bg-white px-2 py-1">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
