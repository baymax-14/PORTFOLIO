import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiMail, FiMapPin } from "react-icons/fi";
import { profile } from "../data/profile";
import { Arrow, HandNote, MarginNote, MonoLabel, PixelHeading, Polaroid } from "../components/ui";
import NoteForm from "../components/contact/NoteForm";
import Reveal from "../components/ui/Reveal";

const LINKS = [
  { href: profile.socials.linkedin, label: "LinkedIn", icon: FaLinkedinIn },
  { href: profile.socials.github, label: "GitHub", icon: FaGithub },
  { href: `mailto:${profile.email}`, label: "Email", icon: FiMail },
];

/** Selection-box frame with square corner handles, like a selected layer in a design tool. */
function SelectionBox({ children }) {
  const handle = "absolute size-2.5 border-2 border-marker-blue bg-white";
  return (
    <div className="relative inline-block border-2 border-marker-blue px-4 pb-1 pt-3 sm:px-6">
      <span className={`${handle} -left-[6px] -top-[6px]`} aria-hidden />
      <span className={`${handle} -right-[6px] -top-[6px]`} aria-hidden />
      <span className={`${handle} -bottom-[6px] -left-[6px]`} aria-hidden />
      <span className={`${handle} -bottom-[6px] -right-[6px]`} aria-hidden />
      {children}
    </div>
  );
}

export default function Contact() {
  return (
    <section aria-labelledby="contact-heading" className="relative mx-auto max-w-6xl px-5 pb-24 pt-14 sm:pt-20">
      <div className="grid items-start gap-12 lg:grid-cols-[220px_1fr_220px] lg:gap-6">
        <Polaroid
          src={profile.photo}
          alt={`${profile.name}, smiling in the mountains`}
          caption="hi, that's me"
          rotate={-6}
          className="order-2 mx-auto hidden w-48 sm:block lg:order-none lg:mt-28 lg:w-52"
        />

        <div className="flex flex-col items-center text-center">
          <div className="relative pt-12 sm:pt-9">
            <MarginNote className="sm:translate-x-1/2">say hi</MarginNote>
          <SelectionBox>
            <PixelHeading id="contact-heading" className="text-7xl sm:text-9xl">
              Contact
            </PixelHeading>
          </SelectionBox>
          </div>

          <Reveal delay={0.1} className="mt-10 w-full">
            <NoteForm />
          </Reveal>

          <div className="mt-10 flex items-start gap-2">
            <Arrow className="mt-1 size-8 rotate-[100deg]" />
            <div className="text-left">
              <HandNote className="text-lg">Open to entry-level roles & good problems</HandNote>
              <a
                href={`mailto:${profile.email}`}
                className="font-mono text-xs text-marker-blue underline underline-offset-4 hover:text-ink"
              >
                {profile.email}
              </a>
            </div>
          </div>

          <ul className="mt-8 flex gap-3">
            {LINKS.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex w-20 flex-col items-center gap-1.5 border border-ink/15 bg-white px-2 py-3 shadow-sticky transition-transform hover:-translate-y-1"
                >
                  <Icon className="size-4" aria-hidden />
                  <MonoLabel>{label}</MonoLabel>
                </a>
              </li>
            ))}
          </ul>

          <MonoLabel as="p" className="mt-6 flex items-center gap-1.5 text-ink-soft">
            <FiMapPin aria-hidden /> {profile.location} · IST (UTC+5:30)
          </MonoLabel>
        </div>

        <Polaroid
          src="/images/projects/hirehub.webp"
          alt="HireHub home page"
          caption="latest build: HireHub"
          rotate={5}
          imgClassName="object-left-top"
          className="order-3 mx-auto hidden w-48 sm:block lg:order-none lg:mt-10 lg:w-52"
        />
      </div>
    </section>
  );
}
