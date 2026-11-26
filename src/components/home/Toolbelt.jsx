import {
  SiDocker,
  SiFastapi,
  SiMongodb,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";
import { toolbelt } from "../../data/skills";
import { HandNote, Tape } from "../ui";
import Reveal from "../ui/Reveal";

const ICONS = {
  React: SiReact,
  "Node.js": SiNodedotjs,
  Python: SiPython,
  FastAPI: SiFastapi,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Docker: SiDocker,
  Tailwind: SiTailwindcss,
};

const NOTES = ["bg-marker-yellow", "bg-marker-mint", "bg-marker-lilac", "bg-marker-sand", "bg-marker-pink/70"];
const TILTS = [-4, 3, -2, 5, -3, 2, -5, 4];

export default function Toolbelt() {
  return (
    <section aria-labelledby="built-with" className="px-5 pb-12">
      <HandNote as="h2" id="built-with" className="text-center text-xl">
        built with
      </HandNote>
      <Reveal as="ul" className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-x-5 gap-y-6">
        {toolbelt.map((name, i) => {
          const Icon = ICONS[name];
          return (
            <li
              key={name}
              className={`relative flex items-center gap-2 px-4 py-2.5 shadow-sticky transition-transform duration-200 hover:!rotate-0 hover:-translate-y-1 ${NOTES[i % NOTES.length]}`}
              style={{ transform: `rotate(${TILTS[i % TILTS.length]}deg)` }}
            >
              <Tape className="-top-2.5 left-1/2 !h-4 !w-10 -ml-5" rotate={TILTS[(i + 3) % TILTS.length]} color="sand" />
              {Icon && <Icon className="size-5 text-ink" aria-hidden />}
              <span className="mono-label">{name}</span>
            </li>
          );
        })}
      </Reveal>
    </section>
  );
}
