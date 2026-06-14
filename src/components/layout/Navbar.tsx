"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";

// Logo dimensions: 870 × 739 px (aspect ratio ~1.18 : 1)
const LOGO_URL =
  "https://res.cloudinary.com/dcubjimoc/image/upload/v1777295664/LOGO_DX_FACILITIES_yc8fuq.png";

const navLinks = [
  { href: "/services", label: "Nos services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/dextera-group", label: "DEXTERA GROUP" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Scroll state + progress bar (DOM ref = no re-render per frame)
  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.width =
          total > 0 ? `${Math.min((y / total) * 100, 100)}%` : "0%";
      }
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className={[
          "sticky top-0 z-50 transition-all duration-180",
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-dx-steel-100 shadow-sm"
            : "bg-white/85 backdrop-blur-md border-b border-dx-steel-100/60",
        ].join(" ")}
        style={{ transition: "background-color 200ms, box-shadow 200ms" }}
      >
        <div className="dx-container flex h-[80px] items-center justify-between">

          {/* Logo */}
          <Link href="/" className="shrink-0" aria-label="DX Facilities, accueil">
            <Image
              src={LOGO_URL}
              alt="DX Facilities"
              width={870}
              height={739}
              style={{ height: 72, width: "auto" }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Navigation principale"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-120 ease-standard",
                  isActive(link.href)
                    ? "text-dx-blue-500 bg-dx-blue-50"
                    : "text-dx-navy-700 hover:text-dx-blue-600 hover:bg-dx-steel-50",
                ].join(" ")}
              >
                {link.label}
                {isActive(link.href) && (
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-dx-blue-500"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              href="/contact"
              className="btn btn--ghost text-sm px-4 py-2"
            >
              Contact
            </Link>
            <Link href="/contact" className="btn btn--primary text-sm px-4 py-2">
              Évaluation gratuite
            </Link>
          </div>

          {/* Mobile hamburger — kept last for natural tab order */}
          <button
            className="flex lg:hidden items-center justify-center w-10 h-10 rounded-lg text-dx-navy-700 hover:bg-dx-steel-50 transition-colors"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
          >
            <Menu size={22} strokeWidth={1.75} />
          </button>
        </div>

        {/* Scroll progress bar */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-dx-blue-500 transition-none"
          ref={progressRef}
          style={{ transition: "width 60ms linear" }}
        />
      </header>

      {/* Mobile overlay + slide-in panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        className={[
          "fixed inset-0 z-50 lg:hidden transition-all duration-240",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        {/* Backdrop */}
        <div
          aria-hidden
          className={[
            "absolute inset-0 bg-dx-navy-700/60 backdrop-blur-sm transition-opacity duration-240",
            menuOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => setMenuOpen(false)}
        />

        {/* Panel */}
        <nav
          className={[
            "absolute right-0 top-0 bottom-0 w-[320px] max-w-[90vw] bg-dx-navy-500 flex flex-col",
            "transition-transform duration-240 ease-standard",
            menuOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
          aria-label="Menu mobile"
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <Image
              src={LOGO_URL}
              alt="DX Facilities"
              width={870}
              height={739}
              style={{ height: 32, width: "auto" }}
              className="brightness-0 invert opacity-90"
            />
            <button
              className="flex items-center justify-center w-9 h-9 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(false)}
              aria-label="Fermer le menu"
            >
              <X size={20} strokeWidth={1.75} />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex flex-col px-4 py-4 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={[
                  "flex items-center justify-between px-3 py-3.5 rounded-lg text-base font-medium transition-all duration-120",
                  isActive(link.href)
                    ? "text-dx-blue-300 bg-white/[0.07]"
                    : "text-white/75 hover:text-white hover:bg-white/[0.06]",
                ].join(" ")}
              >
                {link.label}
                <ChevronRight size={16} strokeWidth={1.75} className="opacity-40" />
              </Link>
            ))}
          </div>

          {/* Panel CTAs */}
          <div className="flex flex-col gap-2.5 px-4 py-6 border-t border-white/10">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="btn btn--inverse w-full justify-center"
            >
              Nous contacter
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="btn btn--primary w-full justify-center"
            >
              Évaluation gratuite
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
