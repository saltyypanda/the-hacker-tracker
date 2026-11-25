import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { PandaHelmet } from "./PandaHelmet";
import { navSections, socialLinks } from "../site-config";

/** Tracks which section is currently in the middle of the screen. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const sectionIds = navSections.map((s) => s.id);

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-base-content/10 bg-base-100/70 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="group flex items-center gap-2.5" aria-label="Hacker Tracker, back to top">
          <PandaHelmet className="h-8 w-8 transition-transform duration-500 group-hover:rotate-[-12deg]" />
          <span className="label-mono text-[0.8rem] text-base-content/90">
            hacker<span className="text-primary">/</span>tracker
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navSections.map(({ id, label }, i) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`label-mono relative rounded px-3 py-2 transition-colors ${
                    isActive ? "text-base-content" : "text-base-content/55 hover:text-base-content"
                  }`}
                >
                  <span className={isActive ? "text-primary" : "text-base-content/35"}>0{i + 1}</span>{" "}
                  {label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-px h-px bg-primary transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-1 md:flex">
          {socialLinks.map(({ name, url, icon }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="grid h-9 w-9 place-items-center rounded-full opacity-60 transition hover:bg-base-content/10 hover:opacity-100"
            >
              <img src={icon} alt="" width={16} height={16} className="h-4 w-4" />
            </a>
          ))}
        </div>

        <button
          type="button"
          className="btn btn-ghost btn-square md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-base-content/10 px-5 pb-8 pt-4 md:hidden">
          <ul className="flex flex-col">
            {navSections.map(({ id, label }, i) => (
              <li key={id} className="border-b border-base-content/5">
                <a
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-4 px-1 py-4 font-display text-2xl"
                >
                  <span className="label-mono text-primary/80">0{i + 1}</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-2">
            {socialLinks.map(({ name, url, icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="grid h-11 w-11 place-items-center rounded-full border border-base-content/15"
              >
                <img src={icon} alt="" width={18} height={18} className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
