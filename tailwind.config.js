/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        desk: "#8B8B8B",
        paper: "#F5F4F0",
        rule: "#E3E1DA",
        ink: {
          DEFAULT: "#1A1A1A",
          soft: "#4A4A47",
          // ≥4.5:1 on paper (#F5F4F0) and on the sand note
          mute: "#5E5C57",
        },
        marker: {
          yellow: "#F2C94C",
          mint: "#A8E0C8",
          pink: "#FF4F9A",
          blue: "#2F55D4",
          green: "#22B35E",
          red: "#E8553A",
          // red for error text: ≥4.5:1 on sand and paper
          redink: "#A8321A",
          sand: "#EADFC4",
          lilac: "#B9C2F2",
        },
      },
      fontFamily: {
        display: ['"Jersey 10"', "ui-monospace", "monospace"],
        hand: ['"Gochi Hand"', "cursive"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        sheet: "0 1px 0 rgba(0,0,0,.04), 0 20px 50px -20px rgba(0,0,0,.35)",
        sticky: "0 1px 1px rgba(0,0,0,.08), 0 6px 14px -6px rgba(0,0,0,.25)",
        polaroid: "0 2px 4px rgba(0,0,0,.08), 0 12px 24px -10px rgba(0,0,0,.35)",
        hard: "3px 3px 0 0 #1A1A1A",
      },
      keyframes: {
        wobble: {
          "0%,100%": { transform: "rotate(var(--r, 0deg))" },
          "50%": { transform: "rotate(calc(var(--r, 0deg) + 4deg)) scale(1.05)" },
        },
        blink: { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.25 } },
      },
      animation: {
        wobble: "wobble .5s ease-in-out",
        blink: "blink 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
