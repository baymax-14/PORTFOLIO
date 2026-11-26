import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";
import { profile } from "../data/profile";
import { skillDetails } from "../data/skills";
import { journey } from "../data/journey";
import { cn } from "../lib/cn";
import {
  HandNote,
  InkButton,
  MarginNote,
  MonoLabel,
  OutlineButton,
  PixelHeading,
  Polaroid,
  StickyNote,
  StickyTag,
  Tape,
} from "../components/ui";
import Reveal from "../components/ui/Reveal";

const SECTIONS = [
  { id: "bio", label: "Main bio", color: "bg-marker-yellow" },
  { id: "skills", label: "Skills", color: "bg-marker-pink text-ink" },
  { id: "journey", label: "Journey", color: "bg-marker-blue text-white" },
];

const NOTE_BG = {
  yellow: "bg-marker-yellow",
  mint: "bg-marker-mint",
  lilac: "bg-marker-lilac",
  sand: "bg-marker-sand",
  pink: "bg-marker-pink/60",
};

/** Which section is on screen, for the side tabs. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const SECTION_IDS = SECTIONS.map((s) => s.id);

export default function About() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
      <div className="relative inline-block pt-12 sm:pt-9">
        <PixelHeading className="text-8xl sm:text-[10rem]">About</PixelHeading>
        <MarginNote>about me!</MarginNote>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[120px_1fr]">
        {/* side tabs, like folder dividers sticking out of a notebook */}
        <nav aria-label="About sections" className="hidden lg:block">
          <ul className="sticky top-24 space-y-2">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "true" : undefined}
                  className={cn(
                    "mono-label flex items-center gap-2 py-1.5 pl-3 shadow-sticky transition-[width,transform] duration-200 hover:translate-x-1",
                    s.color,
                    active === s.id ? "w-[120px]" : "w-[96px]",
                  )}
                >
                  <span className="size-1.5 rounded-full bg-current" aria-hidden />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 space-y-28">
          <Reveal><Bio /></Reveal>
          <Reveal><Skills /></Reveal>
          <Journey />
          <Reveal><Closing /></Reveal>
        </div>
      </div>
    </div>
  );
}

function Bio() {
  return (
    <section id="bio" aria-labelledby="bio-heading" className="scroll-mt-24">
      <div className="grid items-start gap-10 md:grid-cols-[1fr_220px]">
        <div className="relative border border-marker-red/70 bg-white/70 p-6 sm:p-8">
          <StickyTag color="yellow" rotate={-2} className="absolute -top-3.5 left-5">
            <span id="bio-heading">Main bio</span>
          </StickyTag>

          <HandNote className="mt-3 text-[1.4rem] leading-[1.6] sm:text-2xl sm:leading-[1.55]">
            I'm Anand, a B.Tech IT student from Amravati who builds full-stack and AI-powered web apps, and
            cares a lot about them telling the truth. ✨
          </HandNote>

          <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-ink-soft">
            <p>
              I started out on the front end with HTML, CSS and React, and kept going down the stack: Node and
              Express, then Python with FastAPI and Flask, then databases from MongoDB and PostgreSQL to Redis
              and Qdrant.
            </p>
            <p>
              Lately I've been building with LLMs: retrieval, hybrid search, and making sure every answer can be
              traced back to a source. That's where{" "}
              <Link to="/work/documind-ai" className="text-ink underline underline-offset-4 hover:text-marker-blue">
                DocuMind
              </Link>{" "}
              and{" "}
              <Link to="/work/hirehub" className="text-ink underline underline-offset-4 hover:text-marker-blue">
                HireHub
              </Link>{" "}
              came from.
            </p>
            <p>
              I like work that's finished properly: deployed, tested, accessible, and fast on a phone. I'm
              graduating in 2027 and looking for an entry-level software developer role.
            </p>
          </div>

          <p className="mono-label mt-6 flex items-center gap-2 text-ink-soft">
            <span className="size-1.5 rounded-full bg-marker-blue" aria-hidden />
            Off the clock: gaming, trying new dev tools, lurking in developer communities
          </p>
        </div>

        <div className="mx-auto w-48 md:mt-6 md:w-full">
          <div className="relative">
            <Polaroid
              src={profile.photo}
              alt={`${profile.name} on a bridge in the snowy mountains`}
              caption="me, somewhere colder than Amravati"
              rotate={4}
            />
            <StickyTag color="mint" rotate={-6} className="absolute -bottom-4 -left-4 z-10">
              {profile.shortName}
            </StickyTag>
          </div>
          <Polaroid
            src={profile.setupPhoto}
            alt="Anand's desk: a laptop and a monitor with code open, and a glowing orange keyboard"
            caption="where the code happens"
            rotate={-5}
            className="-mt-4 ml-8 hidden w-40 md:block"
          />
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-24">
      <div className="relative inline-block pt-12 sm:pt-9">
        <PixelHeading as="h2" id="skills-heading" className="text-6xl sm:text-7xl">
          Skills
        </PixelHeading>
        <MarginNote>the toolbox</MarginNote>
      </div>

      <ul className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {skillDetails.map((g, i) => (
          <li key={g.label}>
            <StickyNote
              color={g.color}
              rotate={[-1.5, 1, -0.5, 1.5, -1, 0.5][i % 6]}
              className="h-full transition-transform duration-200 hover:!rotate-0"
            >
              <Tape className="-top-2.5 left-6 !h-4 !w-12" rotate={-6} color="sand" />
              <h3 className="mono-label">{g.label}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <li key={s} className="bg-white/80 px-2 py-1 text-[13px] font-medium leading-none text-ink">
                    {s}
                  </li>
                ))}
              </ul>
            </StickyNote>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-heading" className="scroll-mt-24">
      <div className="relative inline-block pt-12 sm:pt-9">
        <PixelHeading as="h2" id="journey-heading" className="text-6xl sm:text-7xl">
          Journey
        </PixelHeading>
        <MarginNote>how I got here</MarginNote>
      </div>

      <ol className="relative mt-10 space-y-6 border-l-2 border-dashed border-ink/30 pl-6 sm:pl-10">
        {journey.map((j) => (
          <Reveal as="li" key={j.title} className="relative">
            {/* pin on the timeline */}
            <span
              aria-hidden
              className={cn(
                "absolute -left-[33px] top-5 size-4 rounded-full border-2 border-ink sm:-left-[49px]",
                NOTE_BG[j.color],
              )}
            />
            <div className="grid gap-x-6 gap-y-1 bg-white/80 p-5 shadow-sticky sm:grid-cols-[140px_1fr]">
              <div>
                <MonoLabel as="p">{j.when}</MonoLabel>
                <span className={cn("mono-label mt-2 inline-block px-1.5 py-0.5", NOTE_BG[j.color])}>
                  {j.kind}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold leading-snug tracking-tight">{j.title}</h3>
                <p className="mt-0.5 text-[15px] text-ink-soft">{j.where}</p>
                {j.note && <HandNote className="mt-2 text-base text-ink-soft">{j.note}</HandNote>}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function Closing() {
  return (
    <section aria-label="Resume and contact" className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
      <StickyNote color="yellow" rotate={-2} tape="lilac" className="max-w-xs">
        <MonoLabel>The short version</MonoLabel>
        <HandNote className="mt-2 text-lg leading-snug">Everything above, on one page.</HandNote>
      </StickyNote>
      <div className="flex flex-wrap items-center gap-4">
        <InkButton href={profile.resumeUrl} target="_blank" rel="noreferrer" icon={<FiDownload />}>
          View resume
        </InkButton>
        <OutlineButton as={Link} to="/contact" icon={<FiArrowUpRight aria-hidden />}>
          Get in touch
        </OutlineButton>
      </div>
    </section>
  );
}
