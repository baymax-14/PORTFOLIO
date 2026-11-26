// Playground collage. Positions are in a 1100 × 720 canvas (px), before zoom.
// kind: "photo" (opens in the lightbox), "tag" (handwritten label), "note" (sticky note), "sticker"
export const CANVAS = { width: 1100, height: 720 };

export const playItems = [
  { id: "setup", kind: "photo", src: "/images/setup.webp", caption: "my desk, mid-DocuMind", x: 40, y: 50, w: 210, aspect: "3/4", rotate: -6 },
  { id: "hello", kind: "tag", text: "hello world 👋", color: "mint", x: 300, y: 18, rotate: -4 },
  { id: "documind", kind: "photo", src: "/images/projects/documind-ai.webp", caption: "DocuMind's front page", x: 290, y: 70, w: 360, aspect: "16/9", rotate: 3 },
  { id: "me", kind: "photo", src: "/images/anand.webp", caption: "snow trip ❄️", x: 700, y: 30, w: 180, aspect: "3/4", rotate: 5 },
  { id: "first", kind: "tag", text: "where it started", color: "yellow", x: 70, y: 352, rotate: 3 },
  { id: "cinescope", kind: "photo", src: "/images/projects/cinescope.webp", caption: "CineScope, the AngularJS days", x: 40, y: 390, w: 300, aspect: "16/10", rotate: 4 },
  { id: "portfolio-v1", kind: "photo", src: "/images/projects/portfolio-v1.webp", caption: "portfolio v1: the dark era", x: 380, y: 400, w: 300, aspect: "16/10", rotate: -3 },
  { id: "hirehub", kind: "photo", src: "/images/projects/hirehub.webp", caption: "HireHub, live on Vercel", x: 760, y: 280, w: 300, aspect: "16/10", rotate: -4 },
  { id: "smiley", kind: "sticker", x: 690, y: 330, rotate: -10 },
  { id: "edupredict", kind: "photo", src: "/images/projects/edupredict.webp", caption: "EduPredict says log in first", x: 790, y: 500, w: 250, aspect: "16/10", rotate: 6 },
  { id: "hint", kind: "note", text: "psst: everything here is draggable. click a photo to see it big.", color: "yellow", x: 470, y: 620, w: 230, rotate: -2 },
];
