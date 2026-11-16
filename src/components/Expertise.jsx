const skillGroups = [
  { title: "Languages", skills: ["JavaScript", "Python", "HTML5", "CSS3", "SQL"] },
  { title: "Backend & APIs", skills: ["Node.js", "Express.js", "Flask", "REST APIs", "JWT", "Nodemailer", "Multer"] },
  { title: "Frontend", skills: ["React", "Redux Toolkit", "React Router", "Tailwind CSS", "Radix UI", "Vite", "Chart.js", "Recharts", "GSAP", "Framer Motion", "AngularJS"] },
  { title: "Data & tools", skills: ["MongoDB", "Mongoose", "Git", "GitHub", "Postman", "Cloudinary", "Vercel", "Formspree", "Firebase"] },
  { title: "Machine learning", skills: ["Random Forest", "scikit-learn", "Pandas", "NumPy", "Matplotlib", "PyTorch"] },
];

const highlights = [
  {
    title: "Full-stack product work",
    detail: "MERN applications with authentication, role-based access, job workflows and responsive interfaces.",
  },
  {
    title: "APIs & platform features",
    detail: "REST endpoints, resume uploads, email alerts, analytics dashboards and persistent user histories.",
  },
  {
    title: "Machine learning",
    detail: "Python and Flask tools that apply Random Forest models and explain results through charts and confidence scores.",
  },
];

const activities = [
  {
    title: "AI & ML Program",
    organization: "IIT Guwahati × Masai School",
    detail: "Credit-linked program covering machine learning, deep learning, NLP and computer vision.",
  },
  {
    title: "Adobe India Hackathon 2025",
    organization: "Participant",
    detail: "Worked on AI-powered PDF and document-intelligence solutions using Adobe technologies.",
  },
  {
    title: "ISNEE Go-Kart Design Competition",
    organization: "First-year team member",
    detail: "Designed, built and raced a go-kart as part of the team.",
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="folio-section expertise-section">
      <div className="section-heading">
        <span>Skills & education</span>
        <h2>Built across<br />software and data.</h2>
      </div>

      <div className="expertise-layout">
        <p className="expertise-lead">I work across the stack, from secure APIs and product interfaces to machine-learning insights.</p>
        <div className="resume-skill-groups" aria-label="Technical skills">
          {skillGroups.map((group) => (
            <div className="resume-skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <div className="skill-list">
                {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="expertise-notes">
        {highlights.map((item) => (
          <article key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></article>
        ))}
      </div>

      <div className="resume-background">
        <div className="resume-education">
          <span className="resume-kicker">Education</span>
          <article>
            <div><h3>B.Tech in Information Technology</h3><p>Prof. Ram Meghe Institute of Technology and Research · Amravati</p></div>
            <span>Expected 2027</span>
          </article>
          <article>
            <div><h3>Higher Secondary Certificate · PCM</h3><p>Independent Junior College Rural Institute · Amravati</p></div>
            <span>2021–2023</span>
          </article>
        </div>
        <div className="resume-activities">
          <span className="resume-kicker">Programs & competitions</span>
          {activities.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3><span>{item.organization}</span><p>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
