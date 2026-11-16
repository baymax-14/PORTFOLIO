import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import AnimatedContent from "./ui/AnimatedContent.jsx";

const projects = [
  {
    title: "HireHub",
    type: "AI-powered job portal & applicant tracking system",
    visual: "hirehub",
    details: "A recruitment platform connecting job seekers and recruiters, with JWT authentication, role-based workspaces, job tracking and applicant pipelines.",
    points: [
      "Parses candidate resumes and scores skill alignment on a 100-point rubric, then sorts applicants into five match tiers with feedback.",
      "Supports bulk screening with adjustable cutoffs and automated email alerts, with an HTTPS API fallback.",
      "Includes persistent recruiter workflows and Recharts dashboards for hiring KPIs.",
    ],
    tech: ["React 19", "Redux Toolkit", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS", "Cloudinary", "Nodemailer", "REST APIs"],
  },
  {
    title: "EduPredict",
    type: "Student performance prediction dashboard",
    visual: "edupredict",
    details: "A full-stack application with a React interface and Python/Flask backend that predicts academic performance using a Random Forest model.",
    points: [
      "Returns real-time predictions with confidence scores.",
      "Shows feature-importance insights in interactive Chart.js visualizations.",
      "Adds role-based access and a prediction history that users can save and delete.",
    ],
    tech: ["React 19", "Vite 7", "Tailwind CSS", "Chart.js", "Python", "Flask", "Random Forest"],
  },
  {
    title: "Portfolio Website",
    type: "Personal site",
    visual: "portfolio",
    details: "A responsive, mobile-first portfolio built with React and Tailwind CSS, with GSAP scroll animations, page transitions and a Formspree-powered contact form.",
    points: ["Deployed on Vercel."],
    tech: ["React", "JavaScript", "Tailwind CSS", "GSAP", "Framer Motion", "Formspree", "Vercel"],
    demo: "https://portfolio-anandrathod.vercel.app/",
  },
];

function ProjectArtwork({ type }) {
  if (type === "hirehub") {
    return (
      <div className="project-artwork artwork-hirehub" role="img" aria-label="HireHub workflow diagram: parse resumes, score role fit, and manage applicants">
        <div className="artwork-topline"><span>HIREHUB</span><span>Recruitment workflow</span></div>
        <div className="artwork-heading"><small>APPLICANT TRACKING SYSTEM</small><strong>From resume to shortlist.</strong></div>
        <div className="workflow-steps"><div><b>01</b><strong>Parse resumes</strong><span>PDF · skill extraction</span></div><i>→</i><div><b>02</b><strong>Score role fit</strong><span>100-point rubric</span></div><i>→</i><div><b>03</b><strong>Move applicants</strong><span>Recruiter pipeline</span></div></div>
        <div className="artwork-footer"><span>ROLE-BASED WORKSPACES</span><span>RECRUITER VIEW ↗</span></div>
      </div>
    );
  }
  if (type === "edupredict") {
    return (
      <div className="project-artwork artwork-edupredict" role="img" aria-label="EduPredict model flow: student data, Random Forest prediction, confidence score, and feature importance">
        <div className="artwork-topline"><span>EDUPREDICT</span><span>Model insights</span></div>
        <div className="artwork-heading"><small>STUDENT PERFORMANCE</small><strong>Make predictions easier to read.</strong></div>
        <div className="prediction-flow"><div><small>INPUT</small><strong>Student data</strong></div><i>→</i><div className="model-node"><small>MODEL</small><strong>Random Forest</strong></div><i>→</i><div><small>OUTPUT</small><strong>Prediction + confidence</strong></div></div>
        <div className="feature-strip"><span>FEATURE IMPORTANCE</span><div><i/><i/><i/><i/><i/></div><b>Chart.js visualization</b></div>
        <div className="artwork-footer"><span>PYTHON · FLASK · REACT</span><span>HISTORY & INSIGHTS ↗</span></div>
      </div>
    );
  }
  return (
    <div className="project-artwork artwork-portfolio" role="img" aria-label="Portfolio website concept showing the work, skills, and contact sections">
      <div className="artwork-topline"><span>ANAND RATHOD</span><span>Personal portfolio</span></div>
      <div className="portfolio-art-title">Thoughtful software,<br /><em>built for people.</em></div>
      <div className="portfolio-art-links"><span>Selected work <b>↗</b></span><span>Skills <b>↗</b></span><span>Contact <b>↗</b></span></div>
      <div className="artwork-footer"><span>REACT · GSAP · FRAMER MOTION</span><span>VERCEL ↗</span></div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="folio-section projects-section">
      <div className="section-heading projects-heading"><span>Selected work</span><h2>Software with purpose.</h2><p>Full-stack systems, applied machine learning and the site that brings them together.</p></div>
      <AnimatedContent className="project-list" distance={100} direction="vertical" duration={0.8} ease="power3.out" blur={0} stagger={0.08} threshold={0.1}>
        {projects.map((project, index) => (
          <article className="project-row" key={project.title}>
            <div className="project-image">
              <ProjectArtwork type={project.visual} />
              {project.demo && <a className="project-image-link" href={project.demo} target="_blank" rel="noreferrer noopener" aria-label={`Visit ${project.title}`}>View project ↗</a>}
            </div>
            <div className="project-detail">
              <div className="project-type">{project.type}</div>
              <h3>{project.title}</h3>
              <p>{project.details}</p>
              <ul className="project-points">{project.points.map((point) => <li key={point}>{point}</li>)}</ul>
              <div className="project-tech">{project.tech.map((tag) => <span key={tag}>{tag}</span>)}</div>
              {project.demo && <div className="project-links"><a href={project.demo} target="_blank" rel="noreferrer noopener"><FaExternalLinkAlt aria-hidden="true" /> Live demo</a><a href="https://github.com/baymax-14" target="_blank" rel="noreferrer noopener"><FaGithub aria-hidden="true" /> GitHub profile</a></div>}
            </div>
            <span className="project-number">0{index + 1}</span>
          </article>
        ))}
      </AnimatedContent>
    </section>
  );
}
