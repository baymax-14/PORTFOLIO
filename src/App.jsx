import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

// Home ships in the main bundle; every other page loads on first visit.
const About = lazy(() => import("./pages/About"));
const Work = lazy(() => import("./pages/Work"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Playground = lazy(() => import("./pages/Playground"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// warm the other pages once the browser is idle, so navigation never waits
if (typeof window !== "undefined") {
  const warm = () =>
    ["About", "Work", "CaseStudy", "Playground", "Contact"].forEach((p) => import(`./pages/${p}.jsx`));
  (window.requestIdleCallback || ((cb) => setTimeout(cb, 1500)))(warm);
}

const page = (el) => <Suspense fallback={<div className="min-h-[60vh]" />}>{el}</Suspense>;

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={page(<About />)} />
            <Route path="work" element={page(<Work />)} />
            <Route path="work/:slug" element={page(<CaseStudy />)} />
            <Route path="playground" element={page(<Playground />)} />
            <Route path="contact" element={page(<Contact />)} />
            <Route path="*" element={page(<NotFound />)} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
    </LazyMotion>
  );
}
