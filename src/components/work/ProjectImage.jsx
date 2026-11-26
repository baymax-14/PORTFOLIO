import { cn } from "../../lib/cn";
import { HandNote, MonoLabel } from "../ui";

/** Project screenshot in a white frame, or an honest index card when there isn't one yet. */
export default function ProjectImage({ project: p, className, aspect = "aspect-[16/10]", eager = false }) {
  if (p.image) {
    return (
      <img
        src={p.image}
        alt={`${p.title} screenshot`}
        loading={eager ? "eager" : "lazy"}
        className={cn("block w-full border-[6px] border-white object-cover object-top shadow-polaroid", aspect, className)}
      />
    );
  }
  return (
    <div
      className={cn(
        "paper flex w-full flex-col justify-center border-[6px] border-white px-8 text-ink shadow-polaroid",
        aspect,
        className,
      )}
    >
      <MonoLabel className="text-ink-mute">Screenshot coming soon</MonoLabel>
      <HandNote className="mt-3 text-2xl leading-snug">{p.pitch}</HandNote>
    </div>
  );
}
