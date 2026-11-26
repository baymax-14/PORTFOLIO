import { Link } from "react-router-dom";
import { profile } from "../../data/profile";
import { skillGroups } from "../../data/skills";
import { HandNote, MonoLabel, Polaroid, StickyNote, TornChip } from "../ui";
import Reveal from "../ui/Reveal";

export default function AboutTeaser() {
  return (
    <section aria-labelledby="whats-up" className="relative pb-24 pt-6">
      {/* the hand-drawn curve that separates the hero from the rest */}
      <svg aria-hidden viewBox="0 0 1200 40" preserveAspectRatio="none" className="h-8 w-full text-ink-mute/70">
        <path d="M0 34 C 300 4, 900 2, 1200 30" fill="none" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      </svg>
      <HandNote className="ml-6 mt-2 text-lg sm:ml-16">about me!</HandNote>

      <Reveal className="mx-auto mt-8 grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[200px_1fr_200px] lg:gap-8">
        <Polaroid
          src={profile.photo}
          alt={`${profile.name}, standing on a bridge in the snowy mountains`}
          caption="2026"
          rotate={-5}
          className="mx-auto w-44 lg:mt-16 lg:w-48"
        />

        <div className="text-center">
          <h2
            id="whats-up"
            className="inline-block border border-ink bg-white px-3 py-0.5 text-xl font-medium shadow-[2px_2px_0_0_#1A1A1A]"
          >
            what's up
          </h2>

          <HandNote className="mx-auto mt-6 max-w-[34rem] text-[1.35rem] leading-[1.65] sm:text-2xl sm:leading-[1.6]">
            I'm a B.Tech IT student who likes making AI show its work. ✨ I build full-stack apps with React,
            Node and Python, make every answer point to its source, and write the tests nobody asked for.
            <span aria-hidden> 🧪</span>
          </HandNote>

          <ul className="mx-auto mt-10 grid max-w-lg gap-x-4 gap-y-5 sm:grid-cols-2" aria-label="Skills">
            {skillGroups.map((g) => (
              <li key={g.label} className="flex flex-col items-center gap-1.5">
                <span className="flex items-center gap-1.5">
                  <TornChip color={g.color}>{g.label}</TornChip>
                  <TornChip color={g.color} className="px-2.5" aria-hidden>
                    {g.sticker}
                  </TornChip>
                </span>
                <MonoLabel className="text-ink-soft">{g.items.join(" · ")}</MonoLabel>
              </li>
            ))}
          </ul>

          <Link
            to="/about"
            className="mono-label mt-10 inline-block border-b border-ink pb-0.5 transition-colors hover:text-marker-blue"
          >
            More about me ↗
          </Link>
        </div>

        <div className="relative mx-auto w-48 pb-16 lg:-mt-20 lg:w-full">
          <Polaroid
            src={profile.setupPhoto}
            alt="Anand's desk: a laptop and a monitor with code open, and a glowing orange keyboard"
            caption="my workspace"
            rotate={5}
          />
          <StickyNote color="mint" rotate={-4} className="absolute -bottom-2 -left-10 w-44 !p-3.5">
            <MonoLabel>Currently</MonoLabel>
            <HandNote className="mt-1.5 text-base leading-snug">
              B.Tech IT, class of 2027. Looking for my first dev role!
            </HandNote>
          </StickyNote>
        </div>
      </Reveal>
    </section>
  );
}
