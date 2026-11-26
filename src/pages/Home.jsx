import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { profile } from "../data/profile";
import {
  Arrow,
  HandNote,
  InkButton,
  OutlineButton,
  PixelHeading,
  ScribbleBox,
  StatusLine,
  Sticker,
  StickyTag,
} from "../components/ui";
import AboutTeaser from "../components/home/AboutTeaser";
import ProjectFolders from "../components/home/ProjectFolders";
import Toolbelt from "../components/home/Toolbelt";
import LetsTalk from "../components/home/LetsTalk";
import Reveal from "../components/ui/Reveal";

function Hero() {
  return (
    <section
      aria-labelledby="hero-name"
      className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pb-20 pt-16 text-center sm:pt-24"
    >
      {/* name block: shown straight away (it's the first thing people see), no reveal */}
      <div className="relative">
        <HandNote className="mb-1 text-base">my name is</HandNote>

        <StickyTag color="mint" rotate={-6} className="absolute -left-14 top-0 hidden sm:inline-block">
          Builds real apps
        </StickyTag>
        <StickyTag color="sand" rotate={5} className="absolute -right-24 top-1 hidden sm:inline-block">
          146 tests & counting
        </StickyTag>

        <PixelHeading id="hero-name" className="text-[6.5rem] sm:text-[11rem]">
          <ScribbleBox>{profile.shortName}</ScribbleBox>
        </PixelHeading>

        <div className="mt-4 flex items-center justify-center gap-3 sm:gap-5">
          <div className="flex items-center">
            <StickyTag color="yellow" rotate={-4} mono={false}>
              {profile.role}
            </StickyTag>
            <Arrow className="-ml-1 -mt-8 hidden size-8 sm:block" />
          </div>
          <div className="flex items-center">
            <Arrow className="-mr-1 -mt-8 hidden size-8 -scale-x-100 sm:block" />
            <StickyTag color="mint" rotate={3} mono={false}>
              {profile.location}
            </StickyTag>
          </div>
        </div>
      </div>

      <Reveal delay={0.12}><StatusLine className="mt-6">{profile.status}</StatusLine></Reveal>

      <Reveal as="p" delay={0.2} className="mt-8 max-w-xl text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-[2.1rem]">
        I build full-stack apps that{" "}
        <Sticker className="mx-0.5 size-8 bg-marker-green align-middle text-base" rotate={-8}>
          🧠
        </Sticker>{" "}
        think a little — and never make things up.{" "}
        <Sticker className="ml-0.5 size-8 bg-marker-pink align-middle text-base" rotate={10}>
          ✦
        </Sticker>
      </Reveal>

      <Reveal delay={0.28} className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <InkButton as={Link} to="/contact" icon={<FiArrowUpRight />}>
          Contact me
        </InkButton>
        <OutlineButton href={profile.resumeUrl} target="_blank" rel="noreferrer" icon={<FiArrowUpRight aria-hidden />}>
          Resume
        </OutlineButton>
      </Reveal>

    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <ProjectFolders />
      <Toolbelt />
      <LetsTalk />
    </>
  );
}
