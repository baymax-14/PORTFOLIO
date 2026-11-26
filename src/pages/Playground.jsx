import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { setScrollLocked } from "../lib/smoothScroll";
import { FiMaximize2, FiMinus, FiPlus, FiRotateCcw, FiX } from "react-icons/fi";
import { CANVAS, playItems } from "../data/playground";
import { cn } from "../lib/cn";
import { HandNote, MarginNote, MonoLabel, PixelHeading, Sticker, StickyTag, Tape } from "../components/ui";

const ZOOMS = [0.6, 0.8, 1, 1.2, 1.4];
const DRAG_THRESHOLD = 4; // px before a press counts as a drag, not a click

const initialPositions = () => Object.fromEntries(playItems.map((it) => [it.id, { x: it.x, y: it.y }]));

export default function Playground() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="pb-24 pt-14 sm:pt-20">
      <header className="px-5 text-center">
        <div className="relative inline-block pt-12 sm:pt-9">
          <PixelHeading className="text-7xl sm:text-[9rem]">Playground</PixelHeading>
          <MarginNote>just for fun</MarginNote>
        </div>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
          Screens, side projects and bits of my desk. Drag things around, zoom in, click a photo to see it big.
        </p>
      </header>

      {/* desktop: free-form draggable collage */}
      <div className="mt-10 hidden md:block">
        <Collage onOpen={setLightbox} />
      </div>

      {/* phones: a calm, scrollable stack */}
      <ul className="mt-10 grid gap-10 px-6 md:hidden">
        {playItems
          .filter((it) => it.kind === "photo")
          .map((it, i) => (
            <li key={it.id} className="mx-auto w-full max-w-sm">
              <button
                type="button"
                onClick={() => setLightbox(it)}
                className="block w-full text-left"
                aria-label={`Open ${it.caption}`}
              >
                <PhotoFrame item={it} rotate={i % 2 ? 2 : -2} />
              </button>
            </li>
          ))}
      </ul>

      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
}

/* ---------------- collage ---------------- */

function Collage({ onOpen }) {
  const wrapRef = useRef(null);
  const [fit, setFit] = useState(1); // scale that fits the canvas to the page width
  const [zoomIndex, setZoomIndex] = useState(ZOOMS.indexOf(1));
  const [pos, setPos] = useState(initialPositions);
  const [stack, setStack] = useState(() => playItems.map((it) => it.id)); // last = on top

  const scale = fit * ZOOMS[zoomIndex];

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      if (width <= 0) return; // hidden (phones show the stacked list instead)
      setFit(Math.max(0.3, Math.min(1, (width - 32) / CANVAS.width)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const bringToFront = useCallback((id) => {
    setStack((s) => [...s.filter((x) => x !== id), id]);
  }, []);

  const move = useCallback((id, x, y) => {
    setPos((p) => ({
      ...p,
      [id]: {
        x: Math.max(-60, Math.min(CANVAS.width - 60, x)),
        y: Math.max(-40, Math.min(CANVAS.height - 40, y)),
      },
    }));
  }, []);

  const reset = () => {
    setPos(initialPositions());
    setStack(playItems.map((it) => it.id));
    setZoomIndex(ZOOMS.indexOf(1));
  };

  return (
    <div ref={wrapRef} className="relative">
      <div className="overflow-x-auto overflow-y-hidden px-4 pb-14">
        {/* spacer sized to the scaled canvas so scrolling works when zoomed in */}
        <div className="relative mx-auto" style={{ width: CANVAS.width * scale, height: CANVAS.height * scale }}>
          <div
            className="absolute left-0 top-0 origin-top-left"
            style={{ width: CANVAS.width, height: CANVAS.height, transform: `scale(${scale})` }}
          >
            {playItems.map((it) => (
              <Draggable
                key={it.id}
                item={it}
                pos={pos[it.id]}
                z={stack.indexOf(it.id) + 1}
                scale={scale}
                onMove={move}
                onGrab={bringToFront}
                onOpen={onOpen}
              />
            ))}
          </div>
        </div>
      </div>

      {/* zoom controls */}
      <div className="absolute bottom-3 right-6 z-[60] flex flex-col items-end gap-1.5">
        <div className="flex flex-col border border-ink bg-white shadow-hard">
          <ControlButton
            label="Zoom in"
            onClick={() => setZoomIndex((i) => Math.min(ZOOMS.length - 1, i + 1))}
            disabled={zoomIndex === ZOOMS.length - 1}
          >
            <FiPlus />
          </ControlButton>
          <span className="border-y border-ink py-1 text-center font-mono text-[11px] font-bold" aria-live="polite">
            {Math.round(ZOOMS[zoomIndex] * 100)}%
          </span>
          <ControlButton
            label="Zoom out"
            onClick={() => setZoomIndex((i) => Math.max(0, i - 1))}
            disabled={zoomIndex === 0}
          >
            <FiMinus />
          </ControlButton>
        </div>
        <button
          type="button"
          onClick={reset}
          className="mono-label flex items-center gap-1.5 border border-ink bg-marker-yellow px-2 py-1.5 shadow-hard transition-transform hover:-translate-y-px"
        >
          <FiRotateCcw aria-hidden /> Tidy up
        </button>
      </div>
    </div>
  );
}

function ControlButton({ label, children, ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid size-8 place-items-center text-ink transition-colors hover:bg-marker-yellow disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
      {...props}
    >
      {children}
    </button>
  );
}

/** One collage item: drag with mouse/touch, nudge with arrow keys, click/Enter to open photos. */
function Draggable({ item, pos, z, scale, onMove, onGrab, onOpen }) {
  const drag = useRef(null);
  const [dragging, setDragging] = useState(false);
  const isPhoto = item.kind === "photo";

  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y, moved: false };
    onGrab(item.id);
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    // button already released but no pointerup reached us (e.g. alt-tab mid-drag): stop dragging
    if (e.pointerType === "mouse" && e.buttons === 0) {
      endDrag(false);
      return;
    }
    const dx = (e.clientX - d.sx) / scale; // screen px → canvas px
    const dy = (e.clientY - d.sy) / scale;
    if (!d.moved && Math.hypot(dx * scale, dy * scale) < DRAG_THRESHOLD) return;
    if (!d.moved) {
      d.moved = true;
      setDragging(true);
    }
    onMove(item.id, d.ox + dx, d.oy + dy);
  };

  // a release without movement counts as a click (opens photos); cancel / lost capture never does
  const endDrag = (asClick) => {
    const d = drag.current;
    drag.current = null;
    setDragging(false);
    if (asClick && d && !d.moved && isPhoto) onOpen(item);
  };

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 40 : 10;
    const delta = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
    if (delta) {
      e.preventDefault();
      onGrab(item.id);
      onMove(item.id, pos.x + delta[0], pos.y + delta[1]);
    } else if (isPhoto && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onOpen(item);
    }
  };

  const label = isPhoto
    ? `${item.caption}. Drag or use arrow keys to move, Enter to open.`
    : `${item.text ?? "Sticker"}. Drag or use arrow keys to move.`;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={label}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={() => endDrag(true)}
      onPointerCancel={() => endDrag(false)}
      onLostPointerCapture={() => endDrag(false)}
      onKeyDown={onKeyDown}
      className={cn(
        "absolute touch-none select-none outline-offset-4",
        dragging ? "cursor-grabbing" : "cursor-grab",
      )}
      style={{ left: pos.x, top: pos.y, width: item.w, zIndex: z }}
    >
      <div
        className="transition-transform duration-200 ease-out"
        style={{
          transform: `rotate(${dragging ? 0 : item.rotate}deg) scale(${dragging ? 1.04 : 1})`,
          filter: dragging ? "drop-shadow(0 18px 18px rgba(0,0,0,.25))" : undefined,
        }}
      >
        <ItemBody item={item} />
      </div>
    </div>
  );
}

function ItemBody({ item }) {
  switch (item.kind) {
    case "photo":
      return <PhotoFrame item={item} />;
    case "tag":
      return (
        <StickyTag color={item.color} rotate={0} mono={false} className="whitespace-nowrap text-base">
          {item.text}
        </StickyTag>
      );
    case "note":
      return (
        <div className="relative bg-marker-yellow p-4 shadow-sticky">
          <Tape className="-top-2.5 left-1/2 -ml-8" rotate={-3} color="lilac" />
          <HandNote className="text-lg leading-snug">{item.text}</HandNote>
        </div>
      );
    case "sticker":
      return (
        <Sticker className="size-16 bg-marker-yellow text-3xl" label="Smiley sticker">
          🙂
        </Sticker>
      );
    default:
      return null;
  }
}

function PhotoFrame({ item, rotate = 0 }) {
  return (
    <figure
      className="relative bg-white p-2 pb-8 shadow-polaroid"
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      <Tape className="-top-2 left-1/2 -ml-8" rotate={-4} color="sand" />
      <img
        src={item.src}
        alt={item.caption}
        draggable={false}
        loading="lazy"
        className="block w-full object-cover object-top"
        style={{ aspectRatio: item.aspect }}
      />
      <figcaption className="absolute inset-x-2 bottom-2 truncate text-center font-hand text-sm text-ink-soft">
        {item.caption}
      </figcaption>
    </figure>
  );
}

/* ---------------- lightbox ---------------- */

function Lightbox({ item, onClose }) {
  const ref = useRef(null);

  // native <dialog> gives us focus trapping, Esc to close and focus return for free
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (item && !d.open) d.showModal();
    if (!item && d.open) d.close();
    // keep the page behind the photo still while it's open
    setScrollLocked(!!item);
    return () => setScrollLocked(false);
  }, [item]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      // anywhere outside the photo closes it: the backdrop and the hint text underneath
      onClick={(e) => !e.target.closest("figure") && onClose()}
      aria-label={item?.caption}
      className="m-auto max-h-[90vh] w-[min(92vw,1000px)] overflow-visible bg-transparent p-0 backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
    >
      {item && (
        <figure className="relative bg-white p-3 pb-12 shadow-polaroid">
          <Tape className="-top-2.5 left-10" rotate={-6} color="lilac" />
          <Tape className="-top-2.5 right-10" rotate={6} color="sand" />
          <img src={item.src} alt={item.caption} className="block max-h-[75vh] w-full object-contain" />
          <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-4">
            <HandNote as="span" className="truncate text-xl">
              {item.caption}
            </HandNote>
            <a
              href={item.src}
              target="_blank"
              rel="noreferrer"
              className="mono-label flex shrink-0 items-center gap-1 hover:text-marker-blue"
            >
              <FiMaximize2 aria-hidden /> Full size
            </a>
          </figcaption>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label="Close"
            className="absolute -right-3 -top-3 grid size-9 place-items-center rounded-full border-2 border-ink bg-marker-yellow text-ink shadow-hard transition-transform hover:rotate-90"
          >
            <FiX />
          </button>
        </figure>
      )}
      <MonoLabel as="p" className="mt-3 text-center text-white/80">
        Esc or click outside to close
      </MonoLabel>
    </dialog>
  );
}
