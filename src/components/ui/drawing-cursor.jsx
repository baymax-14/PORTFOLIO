"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn.js";

const DEFAULT_COLOR = "var(--color-brand, #7773c9)";
const MAX_DEVICE_PIXEL_RATIO = 2;
const STROKE_BREAK_MS = 120;
const MAX_POINTS_PER_STROKE = 600;
const MAX_STROKES = 40;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/** Adds a lightweight, fading pointer trail over its children. */
export default function DrawingCursor({
  blend = "source-over",
  children,
  className,
  clearOnLeave = true,
  color = DEFAULT_COLOR,
  decay = 800,
  lineWidth = 3,
  paused = false,
  smoothing = 0.5,
  taper = true,
}) {
  const shouldReduceMotion = useReducedMotion();
  const [pointerCapable, setPointerCapable] = useState(false);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const strokesRef = useRef([]);
  const activeStrokeRef = useRef(null);
  const mounted = pointerCapable && !shouldReduceMotion;

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setPointerCapable(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!container || !canvas || !ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    let lastPointTime = 0;
    let raf = null;
    let resolvedTheme = "";
    let resolvedBrandColor = "#7773c9";

    const pushPoint = (x, y, time) => {
      if (!activeStrokeRef.current || time - lastPointTime > STROKE_BREAK_MS) {
        activeStrokeRef.current = { points: [] };
        strokesRef.current.push(activeStrokeRef.current);
        if (strokesRef.current.length > MAX_STROKES) strokesRef.current.shift();
      }
      const stroke = activeStrokeRef.current;
      const previous = stroke.points.at(-1);
      let width = lineWidth;
      if (taper && previous) {
        const speed = Math.hypot(x - previous.x, y - previous.y) / Math.max(1, time - previous.time);
        width *= clamp(1 - speed * 0.12, 0.35, 1);
      }
      stroke.points.push({ time, width, x, y });
      if (stroke.points.length > MAX_POINTS_PER_STROKE) stroke.points.shift();
      lastPointTime = time;
    };

    const onMove = (event) => {
      const rect = container.getBoundingClientRect();
      const events = typeof event.getCoalescedEvents === "function" ? event.getCoalescedEvents() : [];
      for (const point of events.length ? events : [event]) {
        pushPoint(point.clientX - rect.left, point.clientY - rect.top, performance.now());
      }
    };
    const onLeave = () => {
      activeStrokeRef.current = null;
      if (clearOnLeave) {
        strokesRef.current = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const draw = () => {
      const now = performance.now();
      const theme = document.documentElement.dataset.theme || "light";
      if (theme !== resolvedTheme) {
        resolvedTheme = theme;
        resolvedBrandColor = getComputedStyle(document.documentElement)
          .getPropertyValue("--color-brand").trim() || (theme === "dark" ? "#fff" : "#7773c9");
      }
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalCompositeOperation = blend;
      for (const stroke of strokesRef.current) {
        if (decay > 0) {
          while (stroke.points.length && now - stroke.points[0].time > decay) stroke.points.shift();
        }
        const points = stroke.points;
        for (let i = 1; i < points.length; i++) {
          const prev = points[i - 1];
          const curr = points[i];
          const next = points[i + 1] || curr;
          const age = decay > 0 ? clamp(1 - (now - curr.time) / decay, 0, 1) : 1;
          if (!age) continue;
          const startX = prev.x + ((prev.x + curr.x) / 2 - prev.x) * smoothing;
          const startY = prev.y + ((prev.y + curr.y) / 2 - prev.y) * smoothing;
          const endX = next.x + ((curr.x + next.x) / 2 - next.x) * smoothing;
          const endY = next.y + ((curr.y + next.y) / 2 - next.y) * smoothing;
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.quadraticCurveTo(curr.x, curr.y, endX, endY);
          ctx.globalAlpha = age;
          ctx.strokeStyle = color === DEFAULT_COLOR ? resolvedBrandColor : color;
          ctx.lineWidth = curr.width;
          ctx.stroke();
        }
      }
      strokesRef.current = strokesRef.current.filter((stroke) => stroke.points.length);
      if (!paused) raf = requestAnimationFrame(draw);
    };

    container.addEventListener("pointermove", onMove, { passive: true });
    container.addEventListener("pointerleave", onLeave, { passive: true });
    if (!paused) raf = requestAnimationFrame(draw);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      observer.disconnect();
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
    };
  }, [blend, clearOnLeave, color, decay, lineWidth, mounted, paused, smoothing, taper]);

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      {children}
      {mounted && <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[90]"><canvas className="h-full w-full" ref={canvasRef} /></div>}
    </div>
  );
}
