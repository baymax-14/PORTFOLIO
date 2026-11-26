// Scrapbook primitives: the small pieces every page is built from.
import { useState } from "react";
import { cn } from "../../lib/cn";

/* ---------- type ---------- */

export function PixelHeading({ as: Tag = "h1", className, children, ...props }) {
  return (
    <Tag
      className={cn("font-display uppercase leading-[0.82] tracking-[0.01em] text-ink", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function MonoLabel({ as: Tag = "span", className, children, ...props }) {
  return (
    <Tag className={cn("mono-label", className)} {...props}>
      {children}
    </Tag>
  );
}

export function HandNote({ as: Tag = "p", className, children, ...props }) {
  return (
    <Tag className={cn("font-hand text-ink", className)} {...props}>
      {children}
    </Tag>
  );
}

/** "● OPEN TO …" status line with a blinking dot */
export function StatusLine({ children, className, dot = "bg-marker-blue" }) {
  return (
    <p className={cn("mono-label text-balance text-ink", className)}>
      <span className={cn("mr-2 inline-block size-2 -translate-y-px rounded-full align-middle animate-blink", dot)} aria-hidden />
      {children}
    </p>
  );
}

/* ---------- paper bits ---------- */

const NOTE_COLORS = {
  yellow: "bg-marker-yellow",
  mint: "bg-marker-mint",
  pink: "bg-marker-pink text-ink",
  blue: "bg-marker-blue text-white",
  sand: "bg-marker-sand",
  lilac: "bg-marker-lilac",
  white: "bg-white",
};

/** A strip of semi-transparent washi tape. Position it with className. */
export function Tape({ className, color = "lilac", rotate = -8 }) {
  const tint = {
    lilac: "bg-marker-lilac/70",
    yellow: "bg-marker-yellow/60",
    mint: "bg-marker-mint/70",
    pink: "bg-marker-pink/50",
    sand: "bg-marker-sand/80",
  }[color];
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute z-10 h-5 w-16 shadow-sm backdrop-blur-[1px]", tint, className)}
      style={{
        transform: `rotate(${rotate}deg)`,
        // ragged short ends, like torn tape
        clipPath:
          "polygon(0 8%,4% 0,96% 4%,100% 0,98% 50%,100% 100%,94% 96%,6% 100%,0 92%,3% 50%)",
      }}
    />
  );
}

/** Small sticky-note tag, e.g. "SWEAT THE DETAILS". */
export function StickyTag({ color = "mint", rotate = -3, className, children, mono = true }) {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1.5 shadow-sticky",
        mono ? "mono-label" : "font-hand text-sm",
        NOTE_COLORS[color],
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}

/** Larger sticky note card. */
export function StickyNote({ color = "yellow", rotate = 0, tape, className, children }) {
  return (
    <div
      className={cn("relative p-5 shadow-sticky", NOTE_COLORS[color], className)}
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}
    >
      {tape && <Tape className="-top-2.5 left-1/2 -ml-8" color={tape} rotate={-3} />}
      {children}
    </div>
  );
}

/** Taped polaroid photo with a handwritten caption. */
export function Polaroid({ src: srcProp, alt, caption, rotate = -4, className, imgClassName, tapes = true }) {
  // fall back to the striped placeholder if the image is missing
  const [failed, setFailed] = useState(false);
  const src = failed ? null : srcProp;
  return (
    <figure
      className={cn(
        "group relative bg-white p-2 pb-7 shadow-polaroid transition-transform duration-300 ease-out hover:!rotate-0 hover:scale-[1.03]",
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {tapes && (
        <>
          <Tape className="-left-5 -top-1" rotate={-38} color="lilac" />
          <Tape className="-right-5 -top-1" rotate={38} color="sand" />
        </>
      )}
      {src ? (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={cn("block aspect-[4/5] w-full object-cover", imgClassName)} />
      ) : (
        <div
          className={cn(
            "grid aspect-[4/5] w-full place-items-center bg-[repeating-linear-gradient(45deg,#ecebe6_0_8px,#e2e0d9_8px_16px)]",
            imgClassName,
          )}
        >
          <span className="mono-label text-ink-mute">photo</span>
        </div>
      )}
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-1.5 text-center font-hand text-xs text-ink-soft">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ---------- chips & stickers ---------- */

const CHIP_COLORS = {
  yellow: "bg-marker-yellow text-ink",
  green: "bg-marker-green text-ink",
  pink: "bg-marker-pink text-ink",
  blue: "bg-marker-blue text-white",
};

// zig-zag torn edges on the left and right sides
const TORN =
  "polygon(0 0,100% 0,97% 12%,100% 25%,97% 38%,100% 50%,97% 62%,100% 75%,97% 88%,100% 100%,0 100%,3% 88%,0 75%,3% 62%,0 50%,3% 38%,0 25%,3% 12%)";

/** Torn-tape skill chip. */
export function TornChip({ color = "yellow", className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-4 py-1.5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 sm:text-base",
        CHIP_COLORS[color],
        className,
      )}
      style={{ clipPath: TORN }}
      {...props}
    >
      {children}
    </span>
  );
}

/** Round sticker with a white die-cut border. Wobbles on hover. */
export function Sticker({ className, rotate = 0, children, label }) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(
        "inline-grid place-items-center rounded-full border-[3px] border-white shadow-sticky hover:animate-wobble",
        className,
      )}
      style={{ "--r": `${rotate}deg`, transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}

/* ---------- hand-drawn marks ---------- */

/** Rough rectangle drawn around its children (like a marker circle). */
export function ScribbleBox({ className, color = "#E8553A", children }) {
  return (
    <span className={cn("relative inline-block px-[0.25em] pt-[0.1em]", className)}>
      <svg
        aria-hidden
        className="pointer-events-none absolute -inset-1 h-[calc(100%+0.5rem)] w-[calc(100%+0.5rem)] overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M2 4 L98 2 L97 97 L3 98 Z M5 1.5 L96 4.5"
          fill="none"
          stroke={color}
          strokeWidth="1.4"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ strokeWidth: 1.6 }}
        />
      </svg>
      {children}
    </span>
  );
}

/** Hand-drawn arrow. Rotate/flip it with className. */
export function Arrow({ className, color = "#1A1A1A" }) {
  return (
    <svg aria-hidden viewBox="0 0 48 40" className={cn("h-8 w-10", className)} fill="none">
      <path
        d="M4 36 C 12 30, 22 22, 40 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M28 6 L40 5 L38 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Handwritten note scribbled beside a heading, with an arrow pointing at it.
 *  Place inside a `relative` wrapper that has top padding for it. Decorative only. */
export function MarginNote({ children, className }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute right-0 top-0 flex -rotate-[5deg] items-start gap-0.5 whitespace-nowrap font-hand text-lg text-ink-soft sm:translate-x-1/3",
        className,
      )}
    >
      <Arrow className="mt-2 size-7 rotate-180" color="#4A4A47" />
      {children}
    </span>
  );
}

/* ---------- buttons ---------- */

export function InkButton({ as: Tag = "a", icon, className, children, ...props }) {
  return (
    <Tag
      className={cn(
        "group inline-flex items-center gap-3 bg-ink py-1.5 pl-1.5 pr-4 text-white shadow-[3px_3px_0_0_#2F55D4] transition-[transform,box-shadow] duration-150 hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_0_#2F55D4] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
        className,
      )}
      {...props}
    >
      {icon && (
        <span className="grid size-6 place-items-center bg-marker-blue text-xs transition-transform group-hover:rotate-12">
          {icon}
        </span>
      )}
      <span className="mono-label">{children}</span>
    </Tag>
  );
}

export function OutlineButton({ as: Tag = "a", icon, className, children, ...props }) {
  return (
    <Tag
      className={cn(
        "inline-flex items-center gap-2 border border-ink bg-white px-3 py-1.5 text-ink shadow-hard transition-[transform,box-shadow] duration-150 hover:-translate-x-px hover:-translate-y-px hover:shadow-[4px_4px_0_0_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
        className,
      )}
      {...props}
    >
      {icon}
      <span className="mono-label">{children}</span>
    </Tag>
  );
}
