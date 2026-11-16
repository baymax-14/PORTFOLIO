import { FaDownload } from "react-icons/fa";

export default function About() {
  return (
    <section id="about" className="folio-section about-section">
      <div className="section-heading"><span>About</span><h2>Software with<br />a practical purpose.</h2></div>
      <div className="about-layout">
        <div className="about-media"><img src="/images/about-editorial.png" alt="An open sketchbook filled with hand-drawn software and interface ideas" loading="lazy" /><span className="media-caption">From a first sketch to a working system</span></div>
        <div className="about-copy">
          <p className="about-lead">I’m Anand Rathod, an Information Technology student in Amravati, Maharashtra.</p>
          <p>I’m pursuing a B.Tech in Information Technology at Prof. Ram Meghe Institute of Technology and Research, with graduation expected in 2027. I’m seeking an entry-level Software Development Engineer role where I can build practical, scalable software.</p>
          <p>My work spans MERN applications and Python/Flask machine-learning tools—from an AI-assisted applicant tracking system to a student performance prediction dashboard.</p>
          <a className="text-link resume-link" href="/Anand-Rathod-Resume.pdf" target="_blank" rel="noreferrer noopener"><FaDownload aria-hidden="true" /> Download résumé <span>↗</span></a>
        </div>
      </div>
    </section>
  );
}
