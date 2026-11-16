import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiMoon, FiSun } from "react-icons/fi";

const links = [
  ["About", "#about"],
  ["Skills & education", "#expertise"],
  ["Selected work", "#projects"],
  ["Contact", "#contact"],
];

export function Component() {
  const root = useRef(null);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { window.localStorage.setItem("portfolio-theme", theme); } catch { /* Theme still works if storage is unavailable. */ }
  }, [theme]);

  useEffect(() => {
    const context = gsap.context(() => {
      const overlay = root.current?.querySelector(".kinetic-overlay");
      const panels = root.current?.querySelectorAll(".gate-panel");
      const items = root.current?.querySelectorAll(".gate-link");
      if (open) {
        document.body.classList.add("menu-is-open");
        gsap.set(overlay, { display: "grid" });
        gsap.timeline()
          .fromTo(panels, { yPercent: 100 }, { yPercent: 0, stagger: 0.08, duration: 0.7, ease: "power4.inOut" })
          .fromTo(items, { y: 44, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out" }, "-=0.25");
      } else {
        document.body.classList.remove("menu-is-open");
        gsap.to(overlay, { autoAlpha: 0, duration: 0.3, onComplete: () => gsap.set(overlay, { display: "none", autoAlpha: 1 }) });
      }
    }, root);
    return () => context.revert();
  }, [open]);

  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div className="kinetic-nav" ref={root}>
      <header className="site-header">
        <a className="wordmark" href="#home" onClick={() => setOpen(false)} aria-label="Anand Rathod, home">AR<span className="wordmark-period">.</span></a>
        <nav className="header-links" aria-label="Main navigation">
          {links.slice(0, 3).map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          <a className="header-contact" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
        </nav>
        <div className="header-actions">
          <button className="theme-toggle" type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} aria-pressed={theme === "dark"}>
            {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
            <span className="theme-toggle-label">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
          <button className={`menu-trigger ${open ? "is-open" : ""}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="site-menu" aria-label={open ? "Close navigation" : "Open navigation"}>
            <span>{open ? "Close" : "Menu"}</span><i aria-hidden="true"><b /><b /></i>
          </button>
        </div>
      </header>
      <div className="kinetic-overlay" id="site-menu" aria-hidden={!open}>
        <button className="menu-scrim" onClick={() => setOpen(false)} aria-label="Close menu" />
        <div className="gate-panels" aria-hidden="true"><span className="gate-panel" /><span className="gate-panel" /><span className="gate-panel" /></div>
        <nav className="gate-content" aria-label="Full-screen navigation">
          <p className="gate-note">Find your way around</p>
          <ul>{links.map(([label, href], index) => <li className="gate-link" key={href}><a href={href} onClick={() => setOpen(false)}><span>{label}</span><small>0{index + 1}</small></a></li>)}</ul>
          <div className="gate-bottom"><span>Amravati, Maharashtra</span><a href="mailto:anand2005rathod@gmail.com">anand2005rathod@gmail.com <span aria-hidden="true">↗</span></a></div>
        </nav>
      </div>
    </div>
  );
}
