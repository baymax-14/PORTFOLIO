import { useEffect } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HandCursor from "./HandCursor";
import { scrollToTop, useSmoothScroll } from "../../lib/smoothScroll";

const TITLES = {
  "/": "Anand Rathod: Full-Stack & AI Developer",
  "/about": "About · Anand Rathod",
  "/work": "Work · Anand Rathod",
  "/playground": "Playground · Anand Rathod",
  "/contact": "Contact · Anand Rathod",
};

const SITE = "https://portfolio-anandrathod.vercel.app";

/** Each page points search engines at its own address (not the home page). */
function setCanonical(pathname) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = SITE + (pathname === "/" ? "/" : pathname.replace(/\/+$/, ""));
}

const EASE_OUT = [0.22, 1, 0.36, 1];

// page transition: the old page lifts away and fades, the new one settles in from just below
const PAGE = {
  initial: { opacity: 0, y: 18, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: EASE_OUT },
    // drop the filter afterwards so it doesn't cost anything while scrolling
    transitionEnd: { filter: "none" },
  },
  exit: { opacity: 0, y: -10, filter: "blur(2px)", transition: { duration: 0.22, ease: "easeIn" } },
};

export default function Layout() {
  const location = useLocation();
  // useOutlet (not <Outlet/>) so the exiting page keeps its own content during the transition
  const outlet = useOutlet();

  useSmoothScroll();

  useEffect(() => {
    // pages with their own titles (case studies) set them themselves
    if (TITLES[location.pathname]) document.title = TITLES[location.pathname];
    setCanonical(location.pathname);
  }, [location.pathname]);

  return (
    // the desk (grid) shows around the sheet; the sheet is the lined paper page
    <div className="min-h-screen px-0 py-0 sm:px-6 sm:py-6 lg:px-10">
      <div className="paper relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-[1240px] flex-col overflow-x-clip shadow-sheet">
        <a
          href="#main"
          className="sr-only z-[60] bg-ink px-3 py-2 text-white focus:not-sr-only focus:absolute focus:left-2 focus:top-2"
        >
          Skip to content
        </a>
        <Navbar />
        {/* jump to the top only once the old page has faded out, so nothing visibly snaps */}
        <AnimatePresence mode="wait" initial={false} onExitComplete={scrollToTop}>
          <m.main id="main" key={location.pathname} className="flex-1" {...PAGE}>
            {outlet}
          </m.main>
        </AnimatePresence>
        <Footer />
      </div>
      <HandCursor />
    </div>
  );
}
