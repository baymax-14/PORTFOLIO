import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowUpRight, FiGithub } from "react-icons/fi";
import { getProject, projects } from "../data/projects";
import { cn } from "../lib/cn";
import { HandNote, InkButton, MonoLabel, OutlineButton, PixelHeading, Tape } from "../components/ui";
import ProjectImage from "../components/work/ProjectImage";
import Reveal from "../components/ui/Reveal";

const FACT_NOTES = [
  { key: "role", label: "Role", color: "bg-marker-lilac", tilt: -3 },
  { key: "type", label: "Type", color: "bg-marker-sand", tilt: 2 },
  { key: "stack", label: "Stack", color: "bg-marker-mint", tilt: 2.5 },
  { key: "year", label: "Year", color: "bg-marker-pink/60", tilt: -2 },
];

const STAT_COLORS = {
  yellow: "bg-marker-yellow",
  mint: "bg-marker-mint",
  lilac: "bg-marker-lilac",
  pink: "bg-marker-pink/60",
};

export default function CaseStudy() {
  const { slug } = useParams();
  const p = getProject(slug);

  useEffect(() => {
    if (p) document.title = `${p.title} · Anand Rathod`;
  }, [p]);

  if (!p) return <Navigate to="/work" replace />;

  const index = projects.indexOf(p);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
      <Link to="/work" className="mono-label inline-flex items-center gap-1.5 hover:text-marker-blue">
        <FiArrowLeft aria-hidden /> All work
      </Link>

      {/* header: title on the left, fact notes on the right */}
      <header className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <MonoLabel as="p" className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-ink" aria-hidden />
            {p.date}
          </MonoLabel>
          <PixelHeading className="mt-3 text-7xl sm:text-[8.5rem]">{p.title}</PixelHeading>
          <p className="mt-4 max-w-md text-lg leading-snug text-ink-soft">{p.pitch}</p>
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <li key={t} className="mono-label bg-marker-sand px-2.5 py-1.5 shadow-sticky">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <dl className="grid grid-cols-2 gap-3 sm:w-[340px]">
          {FACT_NOTES.map((f) => (
            <div
              key={f.key}
              className={cn("px-3 py-2.5 shadow-sticky", f.color)}
              style={{ transform: `rotate(${f.tilt}deg)` }}
            >
              <dt className="mono-label">{f.label}</dt>
              <dd className="mt-1 text-sm font-medium leading-tight">{p.facts[f.key]}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* hero image */}
      <Reveal className="relative mt-14">
        <Tape className="-top-2 left-10" rotate={-5} color="sand" />
        <Tape className="-top-2 right-10" rotate={6} color="sand" />
        <ProjectImage project={p} aspect="aspect-[16/9]" eager />
      </Reveal>

      <div className="mt-6 flex flex-wrap gap-4">
        {p.links.live && (
          <InkButton href={p.links.live} target="_blank" rel="noreferrer" icon={<FiArrowUpRight />}>
            Live demo
          </InkButton>
        )}
        {p.links.code && (
          <OutlineButton href={p.links.code} target="_blank" rel="noreferrer" icon={<FiGithub aria-hidden />}>
            Source code
          </OutlineButton>
        )}
      </div>

      {/* story */}
      <div className="mt-20 grid gap-x-16 gap-y-3 lg:grid-cols-[180px_1fr] lg:gap-y-16">
        <Section label="the problem">
          <p className="max-w-[48ch] text-xl leading-relaxed sm:text-2xl sm:leading-snug">{p.problem}</p>
        </Section>

        <Section label="what I built">
          <div className="max-w-[58ch] space-y-4 text-[17px] leading-relaxed text-ink-soft">
            {p.built.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </Section>

        <Section label="how it works">
          <ul className="max-w-[60ch] space-y-3">
            {p.how.map((item) => (
              <li key={item} className="flex gap-3 text-[16px] leading-relaxed">
                <span aria-hidden className="mt-2 size-2 shrink-0 rotate-45 bg-marker-blue" />
                {item}
              </li>
            ))}
          </ul>
          <ul className="mt-8 flex flex-wrap gap-1.5" aria-label="Tech stack">
            {p.stack.map((s) => (
              <li key={s} className="mono-label border border-ink/25 bg-white px-2 py-1">
                {s}
              </li>
            ))}
          </ul>
        </Section>

        <Section label="the numbers">
          <ul className="flex flex-wrap gap-5">
            {p.stats.map((s, i) => (
              <li
                key={s.label}
                className={cn("w-44 px-4 py-4 shadow-sticky", STAT_COLORS[s.color])}
                style={{ transform: `rotate(${[-2, 1.5, -1][i % 3]}deg)` }}
              >
                <p className="font-display text-6xl leading-none">{s.value}</p>
                <MonoLabel as="p" className="mt-2 leading-relaxed">
                  {s.label}
                </MonoLabel>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* next project */}
      <Link
        to={`/work/${next.slug}`}
        className="group mt-28 flex items-center justify-between gap-6 border-t-2 border-ink pt-8"
      >
        <div>
          <HandNote className="text-lg">next project</HandNote>
          <PixelHeading as="p" className="mt-1 text-6xl transition-colors group-hover:text-marker-blue sm:text-8xl">
            {next.title}
          </PixelHeading>
        </div>
        <FiArrowUpRight
          className="size-12 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
          aria-hidden
        />
      </Link>
    </article>
  );
}

function Section({ label, children }) {
  return (
    <>
      <HandNote as="h2" className="text-xl text-ink-soft lg:pt-1">
        {label}
      </HandNote>
      <Reveal className="mb-12 max-w-3xl lg:mb-0">{children}</Reveal>
    </>
  );
}
