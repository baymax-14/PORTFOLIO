// Torn-chip skill groups. Each group gets one marker color.
export const skillGroups = [
  { color: "yellow", label: "Frontend", sticker: "⚡", items: ["React", "Redux Toolkit", "Tailwind", "Vite"] },
  { color: "green", label: "Backend", sticker: "🛠️", items: ["Node / Express", "FastAPI", "Flask", "JWT + RBAC"] },
  { color: "pink", label: "AI / ML", sticker: "🧠", items: ["RAG", "Hybrid Search", "Gemini API", "XGBoost"] },
  { color: "blue", label: "Data & Ops", sticker: "🐳", items: ["MongoDB", "PostgreSQL", "Qdrant", "Docker"] },
];

// "Built with" strip (icons mapped in components/home/Toolbelt.jsx)
export const toolbelt = ["React", "Node.js", "Python", "FastAPI", "MongoDB", "PostgreSQL", "Docker", "Tailwind"];

// Full list for the About page (from the resume)
export const skillDetails = [
  { label: "Languages", color: "yellow", items: ["JavaScript (ES6+)", "Python", "SQL", "HTML5", "CSS3"] },
  { label: "Frontend", color: "mint", items: ["React", "Redux Toolkit", "React Router", "Tailwind CSS", "Vite", "Responsive design", "Web accessibility"] },
  { label: "Backend & APIs", color: "lilac", items: ["Node.js", "Express", "FastAPI", "Flask", "REST APIs", "JWT auth", "RBAC", "Multer"] },
  { label: "Databases", color: "sand", items: ["MongoDB", "PostgreSQL", "Redis", "Qdrant (vector DB)"] },
  { label: "AI & ML", color: "pink", items: ["Gemini API", "WebLLM", "RAG", "Hybrid search (BM25 + vectors)", "scikit-learn", "XGBoost"] },
  { label: "Tools & Testing", color: "yellow", items: ["Git & GitHub", "Docker / Compose", "Vercel", "Render", "Cloudinary", "Postman", "Pytest", "ESLint"] },
];
