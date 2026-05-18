"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

// Logo dimensions: 870 × 739 px (aspect ratio 1.177 : 1 — nearly square)
const LOGO_URL =
  "https://res.cloudinary.com/dcubjimoc/image/upload/v1777295664/LOGO_DX_FACILITIES_yc8fuq.png";

const navLinks = [
  { href: "/services", label: "Nos services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/dextera-group", label: "DEXTERA GROUP" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Header — height auto, driven by logo size + padding */}
      <header className="sticky top-0 z-50 border-b border-dx-steel-100 bg-white/85 backdrop-blur-md">
        <div className="dx-container flex h-full items-center justify-between py-3">

          <Link href="/" className="shrink-0" aria-label="DX Facilities, accueil">
            {/* True intrinsic: 870 × 739. Display at 88 px height → ~104 px wide */}
            <Image
              src={LOGO_URL}
              alt="DX Facilities"
              width={870}
              height={739}
              style={{ height: 88, width: "auto" }}
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "font-sans text-sm font-medium transition-colors duration-120 ease-standard relative pb-0.5",
                  isActive(link.href)
                    ? "text-dx-blue-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-dx-blue-500 after:rounded-full"
                    : "text-dx-navy-700 hover:text-dx-blue-700",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact" className="btn btn--secondary text-sm">
              Nous contacter
            </Link>
            <Link href="/contact" className="btn btn--primary text-sm">
              Demander une évaluation
            </Link>
          </div>

          <button
            className="flex lg:hidden items-center justify-center w-10 h-10 text-dx-navy-700"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
          >
            <Menu size={24} strokeWidth={1.75} />
          </button>
        </div>
      </header>

      {/* Mobile slide-in menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-dx-navy-700/50" aria-hidden="true" />
          <nav
            className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-dx-navy-500 px-6 py-8 flex flex-col gap-8"
            onClick={(e) => e.stopPropagation()}
            aria-label="Menu mobile"
          >
            <div className="flex items-center justify-between">
              {/* Mobile logo: 60 px height */}
              <Image
                src={LOGO_URL}
                alt="DX Facilities"
                width={870}
                height={739}
                style={{ height: 60, width: "auto" }}
              />
              <button
                className="flex items-center justify-center w-10 h-10 text-white/70 hover:text-white"
                onClick={() => setMenuOpen(false)}
                aria-label="Fermer le menu"
              >
                <X size={24} strokeWidth={1.75} />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    "font-sans text-base font-medium py-3 border-b border-white/10 transition-colors duration-120",
                    isActive(link.href)
                      ? "text-dx-blue-300"
                      : "text-white/80 hover:text-white",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3 mt-auto">
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
                Demander une évaluation
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
