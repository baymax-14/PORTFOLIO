// Featured projects (home folders + /work/:slug case studies) and smaller builds.
// Facts come from the resume and GitHub READMEs: keep numbers real.

export const projects = [
  {
    slug: "documind-ai",
    title: "DocuMind AI",
    date: "Nov 2026",
    pitch: "Ask your documents anything, and get answers that cite the exact page.",
    folder: "dark",
    stack: ["React", "FastAPI", "PostgreSQL", "Qdrant", "Redis", "Docker", "WebLLM"],
    highlights: [
      "Runs fully in the browser (WebGPU) or on a FastAPI server",
      "Hybrid search: BM25 + vectors, RRF, cross-encoder rerank",
      "146 tests across 29 suites",
    ],
    tags: ["AI / RAG", "Full-Stack", "Privacy"],
    facts: { role: "Solo build", type: "Research tool", year: "2026", stack: "React · FastAPI · Qdrant" },
    problem:
      "AI chat tools sound confident even when they're wrong, and most of them want your documents uploaded to someone else's server. For research, both are deal-breakers: you need to check every claim, and some files shouldn't leave your machine.",
    built: [
      "DocuMind answers questions about your PDFs, Word files and scans, and every sentence points to the exact page it came from. Click a citation and the reader opens on that passage, framed in red.",
      "It runs in two modes. In the browser, a small Qwen 2.5 model runs on your GPU through WebLLM, and documents stay in IndexedDB, so nothing is uploaded. Or it connects to a FastAPI backend with PostgreSQL, Qdrant and Redis for bigger libraries.",
    ],
    how: [
      "Hybrid search: BM25 keyword ranking + vector search, merged with Reciprocal Rank Fusion, then reranked (a BGE cross-encoder on the server)",
      "Citation checking: any [n] that doesn't match a passage the model was given gets removed, and answers with no valid citation are flagged",
      "Passages-only mode when there's no GPU: it shows the matching passages with sources instead of guessing",
      "OCR for scanned pages with Tesseract, in the browser",
      "JWT auth, bcrypt and per-tenant filters so one user can't cite another's documents",
      "Keyboard and screen-reader support: focus-trapped dialogs, named buttons, 44px touch targets",
    ],
    stats: [
      { value: "146", label: "automated tests", color: "lilac" },
      { value: "29", label: "test suites", color: "yellow" },
      { value: "0", label: "files uploaded in local mode", color: "mint" },
    ],
    image: "/images/projects/documind-ai.webp",
    links: { code: "https://github.com/baymax-14/Documind-ai" },
  },
  {
    slug: "hirehub",
    title: "HireHub",
    date: "Oct 2026",
    pitch: "A job portal whose AI reads every resume and scores it out of 100.",
    folder: "yellow",
    stack: ["React", "Node.js", "Express", "MongoDB", "Gemini API"],
    highlights: [
      "Gemini-powered ATS on a 100-point rubric",
      "Role-based access for seekers and recruiters",
      "Live on Vercel + Render + MongoDB Atlas",
    ],
    tags: ["Full-Stack", "AI", "Deployed"],
    facts: { role: "Solo build", type: "Job portal + ATS", year: "2026", stack: "MERN · Gemini" },
    problem:
      "Recruiters skim hundreds of resumes per role, and candidates never find out why they were passed over. Both sides lose time, and good matches slip through.",
    built: [
      "HireHub is a job portal for two kinds of users. Job seekers search with keyword, salary and location filters, run an ATS check on their resume before applying, and track every application.",
      "Recruiters post jobs, manage company profiles, and see each applicant scored, sorted into tiers, and explained, with charts for the whole pipeline. It's live on Vercel, Render and MongoDB Atlas.",
    ],
    how: [
      "Resume PDFs parsed on the server with pdf-parse",
      "Scored on a 100-point rubric: 70 for skill match, 30 for evidence like projects and certifications",
      "Gemini handles the semantic matching, with a local NLP fallback when there's no API key",
      "Synonym-aware matching (k8s ↔ kubernetes, react.js ↔ react)",
      "JWT auth with role-based access for seekers and recruiters",
      "Status emails over SMTP, falling back to Resend / Brevo over HTTPS when cloud hosts block SMTP ports",
    ],
    stats: [
      { value: "100", label: "point scoring rubric", color: "yellow" },
      { value: "5", label: "applicant score tiers", color: "lilac" },
      { value: "2", label: "user roles with their own dashboards", color: "mint" },
    ],
    image: "/images/projects/hirehub.webp",
    links: {
      live: "https://hirehub-green.vercel.app",
      code: "https://github.com/baymax-14/HIRE_HUB-main",
    },
  },
  {
    slug: "edupredict",
    title: "EduPredict",
    date: "Aug 2026",
    pitch: "Spots students at risk early, and explains why.",
    folder: "blue",
    stack: ["React", "Chart.js", "Flask", "scikit-learn", "XGBoost"],
    highlights: [
      "Random Forest + XGBoost ensemble",
      "Risk levels with confidence scores",
      "Feature-importance breakdown per prediction",
    ],
    tags: ["Machine Learning", "Full-Stack"],
    facts: { role: "Solo build", type: "ML web app", year: "2026", stack: "React · Flask · XGBoost" },
    problem:
      "Teachers usually learn a student is struggling after the final grade comes out, when it's too late to help. The signals were there earlier: attendance, internal marks, backlogs.",
    built: [
      "EduPredict takes a student's attendance, internal scores, backlogs, study time and support, and predicts whether they're on track, average or at risk, with a confidence score.",
      "It doesn't stop at a label. A feature-importance breakdown shows which factors drove the prediction, so a teacher knows what to act on.",
    ],
    how: [
      "Trained on the UCI Student Performance dataset",
      "Engineered features: attendance from absences, internal average from G1 and G2, backlogs from past failures",
      "Random Forest and XGBoost tuned with GridSearchCV and compared with 5-fold cross-validation",
      "Flask REST API serving predictions with StandardScaler-scaled inputs",
      "React dashboard with Chart.js radar, doughnut and feature-importance charts",
    ],
    stats: [
      { value: "~88.6%", label: "accuracy (tuned Random Forest)", color: "mint" },
      { value: "~0.88", label: "weighted F1 score", color: "yellow" },
      { value: "3", label: "performance bands predicted", color: "lilac" },
    ],
    image: "/images/projects/edupredict.webp",
    links: {
      live: "https://student-performance-ivory.vercel.app/",
      code: "https://github.com/baymax-14/student-performance",
    },
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const smallBuilds = [
  {
    title: "CineScope",
    blurb: "AngularJS movie discovery app on the TMDB API.",
    image: "/images/projects/cinescope.webp",
    links: { live: "https://baymax-14.github.io/movie-app/", code: "https://github.com/baymax-14/movie-app" },
  },
  {
    title: "Hospital DB",
    blurb: "SQL hospital management system with patients, doctors and appointments.",
    links: { code: "https://github.com/baymax-14/SQL-hospital-database" },
  },
  {
    title: "Brick Breaker",
    blurb: "Python + Pygame arcade game with levels, lives and sound.",
    links: { code: "https://github.com/baymax-14/Brick-breaker" },
  },
];
