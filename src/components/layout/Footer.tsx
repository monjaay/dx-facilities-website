import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { services } from "@/data/services";
import contentData from "@/data/content.json";

const LOGO_DARK_URL =
  "https://res.cloudinary.com/dcubjimoc/image/upload/v1777295664/LOGO_DX_FACILITIES_yc8fuq.png";

const company = [
  { href: "/a-propos", label: "À propos" },
  { href: "/dextera-group", label: "DEXTERA GROUP" },
  { href: "/contact", label: "Contact" },
  { href: "/mentions-legales", label: "Mentions légales" },
];

// SVG paths for social icons (lucide-react doesn't include all social brands)
function IconFacebook() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    href: "https://web.facebook.com/profile.php?id=61572254160652",
    label: "Facebook DX Facilities",
    Icon: IconFacebook,
  },
  {
    href: "https://www.instagram.com/dx_facilities/",
    label: "Instagram DX Facilities",
    Icon: IconInstagram,
  },
  {
    href: "https://sn.linkedin.com/company/dx-facilities",
    label: "LinkedIn DX Facilities",
    Icon: IconLinkedIn,
  },
];

const { footer, contactPage } = contentData;

export function Footer() {
  const year = new Date().getFullYear();
  const info = contactPage.info;

  return (
    <footer className="bg-[#050810] text-white/70">
      <div className="dx-container py-16">
        {/* Tagline micro-section */}
        <p className="text-sm italic text-white/35 mb-10 border-b border-white/[0.06] pb-10">
          {footer.tagline}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Image
              src={LOGO_DARK_URL}
              alt="DX Facilities"
              width={870}
              height={739}
              style={{ height: 48, width: "auto" }}
              className="self-start brightness-0 invert opacity-90"
            />
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">
              {footer.description}
            </p>
            <p className="text-sm italic text-dx-blue-300 font-medium">
              {footer.slogan}
            </p>
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-white/40">
              {footer.groupLabel}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/40 hover:text-white hover:border-white/30 hover:bg-white/[0.06] transition-all duration-150"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Services column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-white">
              Nos services
            </h3>
            <ul className="flex flex-col gap-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-120 ease-standard"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-white">
              Entreprise
            </h3>
            <ul className="flex flex-col gap-2.5">
              {company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-120 ease-standard"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-white">
              Contact
            </h3>
            <ul className="flex flex-col gap-3.5">
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <Phone size={15} strokeWidth={1.75} className="shrink-0 mt-0.5 text-dx-blue-300" />
                <a href={`tel:${info.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors duration-120">
                  {info.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <Phone size={15} strokeWidth={1.75} className="shrink-0 mt-0.5 text-dx-blue-300" />
                <a href={`tel:${info.mobile.replace(/\s/g, "")}`} className="hover:text-white transition-colors duration-120">
                  {info.mobile}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <Mail size={15} strokeWidth={1.75} className="shrink-0 mt-0.5 text-dx-blue-300" />
                <a
                  href={`mailto:${info.email}`}
                  className="hover:text-white transition-colors duration-120"
                >
                  {info.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <MapPin size={15} strokeWidth={1.75} className="shrink-0 mt-0.5 text-dx-blue-300" />
                <span className="whitespace-pre-line">{info.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {year} DX Facilities. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <Link
              href="/mentions-legales"
              className="hover:text-white/70 transition-colors duration-120"
            >
              Mentions légales
            </Link>
            <span className="text-white/20">·</span>
            <span>Membre de DEXTERA GROUP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
