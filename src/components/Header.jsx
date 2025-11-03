// src/components/Header.jsx
import PillNav from "./PillNav.jsx"; // we'll create this next
import logo from "/logo.svg"; // replace with your logo file

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center bg-transparent backdrop-blur-md">
      <PillNav
        logo={logo}
        logoAlt="Anand"
        items={[
          { label: "Home", href: "#home" },
          { label: "About", href: "#about" },
          { label: "Expertise", href: "#expertise" },
          { label: "Projects", href: "#projects" },
          { label: "Contact", href: "#contact" },
        ]}
        activeHref="#home"
        baseColor="#000000"          // Cyan glow base
        pillColor="#0A0A0A"          // Background inside each pill
        hoveredPillTextColor="#FFFFFF"
        pillTextColor="#FFFFFF"
        className="mt-4"
        initialLoadAnimation={true}
      />
    </header>
  );
}
