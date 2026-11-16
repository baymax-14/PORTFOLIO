import { lazy, Suspense } from "react";

const RobotModel = lazy(() => import("./RobotModel"));

export default function Hero() {
  return <section id="home" className="hero-section marginalia-hero">
    <div className="hero-topline"><span>B.Tech IT · Expected 2027</span><a href="/Anand-Rathod-Resume.pdf" target="_blank" rel="noreferrer noopener">Curriculum vitae <span aria-hidden="true">↗</span></a><span>Anand Rathod <i>software developer</i></span></div>
    <div className="hero-title-wrap"><h1 className="hero-name"><span className="sr-only">Anand Rathod — </span>Portfolio<span>.</span></h1><span className="hand-note name-note" aria-hidden="true">Anand Rathod</span><svg className="scribble scribble-name" viewBox="0 0 330 145" fill="none" aria-hidden="true"><path d="M17 77C30 20 226 4 297 35c55 24 6 86-67 95C124 145 13 126 17 77Z"/><path d="M24 71C46 20 243 12 302 43"/></svg><span className="role-note">Aspiring Software Engineer</span><svg className="scribble scribble-role" viewBox="0 0 270 76" fill="none" aria-hidden="true"><path d="M15 38C32 7 211 1 249 23c27 16-11 42-87 42C86 67 6 61 15 38Z"/><path d="M21 33C62 10 212 8 253 26"/></svg></div>
    <div className="hero-lower"><div className="hero-intro">I build full-stack software and AI-powered tools for real-world workflows.<a href="#projects" className="text-link">Explore selected work <span>↓</span></a></div>
      <div className="sculpture-scene robot-scene" aria-label="Interactive robot sculpture">
        <div className="robot-canvas"><Suspense fallback={<div className="robot-loading" aria-hidden="true" />}><RobotModel /></Suspense></div>
        <span className="hand-note sculpture-note">say hello!</span>
      </div>
    </div>
    <div className="hero-bottom"><span>Amravati, Maharashtra</span><a href="#about" className="scroll-cue">scroll <span aria-hidden="true">↓</span></a><span>Seeking entry-level SDE roles</span></div>
  </section>;
}
