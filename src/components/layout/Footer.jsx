import { profile } from "../../data/profile";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-2 border-t border-rule bg-white/60 px-5 py-4 text-ink-soft sm:flex-row">
      <p className="mono-label">
        © {new Date().getFullYear()} {profile.name}
      </p>
      <p className="font-hand text-sm">built by hand in Amravati ✏️</p>
    </footer>
  );
}
