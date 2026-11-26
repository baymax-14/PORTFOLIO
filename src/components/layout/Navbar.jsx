import { NavLink, Link } from "react-router-dom";
import { FaStar, FaUser, FaHeart, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { BsGrid1X2Fill } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { FiMail } from "react-icons/fi";
import { profile } from "../../data/profile";
import { cn } from "../../lib/cn";

const TABS = [
  { to: "/", label: "Home", icon: FaStar, end: true },
  { to: "/about", label: "About", icon: FaUser },
  { to: "/work", label: "Work", icon: BsGrid1X2Fill },
  { to: "/playground", label: "Playground", icon: IoDiamond },
];

const SOCIALS = [
  { href: profile.socials.linkedin, label: "LinkedIn", icon: FaLinkedinIn, bg: "bg-marker-yellow" },
  { href: profile.socials.github, label: "GitHub", icon: FaGithub, bg: "bg-marker-pink" },
  { href: `mailto:${profile.email}`, label: "Email", icon: FiMail, bg: "bg-marker-green" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-white/95 backdrop-blur">
      <nav aria-label="Primary" className="flex h-11 items-stretch justify-between pr-2 sm:pr-3">
        <div className="flex items-stretch">
          <Link
            to="/"
            aria-label={`${profile.name}, home`}
            className="grid w-11 place-items-center transition-transform hover:rotate-12"
          >
            <img src="/favicon.svg" alt="" className="size-5" />
          </Link>

          <ul className="flex items-stretch">
            {TABS.map(({ to, label, icon: Icon, end }) => (
              <li key={to} className="flex">
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-1.5 px-2.5 text-ink transition-colors sm:px-3.5",
                      isActive ? "bg-marker-yellow" : "hover:bg-paper",
                    )
                  }
                >
                  <Icon className="size-3" aria-hidden />
                  <span className="mono-label hidden sm:inline">{label}</span>
                  <span className="sr-only sm:hidden">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ul className="hidden items-center gap-1.5 md:flex">
            {SOCIALS.map(({ href, label, icon: Icon, bg }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className={cn(
                    "grid size-6 place-items-center rounded-full border border-ink text-[11px] text-ink transition-transform hover:-translate-y-0.5 hover:rotate-12",
                    bg,
                  )}
                >
                  <Icon aria-hidden />
                </a>
              </li>
            ))}
          </ul>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              cn(
                "ml-1 inline-flex items-center gap-1.5 border border-ink px-2.5 py-1 text-ink shadow-[2px_2px_0_0_#1A1A1A] transition-[transform,box-shadow] hover:-translate-x-px hover:-translate-y-px hover:shadow-[3px_3px_0_0_#1A1A1A]",
                isActive ? "bg-marker-yellow" : "bg-white",
              )
            }
          >
            <FaHeart className="size-2.5 text-marker-pink" aria-hidden />
            <span className="mono-label">Contact</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
