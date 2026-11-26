import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { profile } from "../../data/profile";
import { HandNote, InkButton, PixelHeading } from "../ui";
import Reveal from "../ui/Reveal";

function Smiley() {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className="size-28 drop-shadow-[0_8px_10px_rgba(0,0,0,.2)] transition-transform duration-300 hover:rotate-[-10deg] hover:scale-105 sm:size-32"
    >
      <circle cx="60" cy="60" r="56" fill="#F2C94C" stroke="#1A1A1A" strokeWidth="3" />
      <ellipse cx="32" cy="72" rx="10" ry="6" fill="#FF4F9A" opacity=".55" />
      <ellipse cx="88" cy="72" rx="10" ry="6" fill="#FF4F9A" opacity=".55" />
      <rect x="40" y="34" width="9" height="20" rx="4.5" fill="#1A1A1A" />
      <rect x="71" y="34" width="9" height="20" rx="4.5" fill="#1A1A1A" />
      <path d="M36 70 C 44 90, 76 90, 84 70" fill="none" stroke="#1A1A1A" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export default function LetsTalk() {
  return (
    <Reveal as="section" aria-labelledby="lets-talk" className="flex flex-col items-center px-5 pb-28 pt-16 text-center">
      <Smiley />
      <PixelHeading as="h2" id="lets-talk" className="mt-8 text-7xl sm:text-9xl">
        Let's Talk
      </PixelHeading>
      <HandNote className="mt-5 max-w-md text-xl leading-snug text-ink-soft">
        Hiring, building something, or just want to say hi? Leave a note. It lands straight in my inbox.
      </HandNote>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
        <InkButton as={Link} to="/contact" icon={<FiArrowUpRight />}>
          Say hello
        </InkButton>
        <a
          href={`mailto:${profile.email}`}
          className="mono-label border-b border-ink pb-0.5 transition-colors hover:text-marker-blue"
        >
          {profile.email}
        </a>
      </div>
    </Reveal>
  );
}
