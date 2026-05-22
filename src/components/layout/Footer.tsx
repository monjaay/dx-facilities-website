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
          </div>

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

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-white">
              Contact
            </h3>
            <ul className="flex flex-col gap-3.5">
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <Phone size={15} strokeWidth={1.75} className="shrink-0 mt-0.5 text-dx-blue-300" />
                <span>{info.phone}</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <Phone size={15} strokeWidth={1.75} className="shrink-0 mt-0.5 text-dx-blue-300" />
                <span>{info.mobile}</span>
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

        <div className="mt-12 border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {year} DX Facilities. Tous droits réservés.</p>
          <Link
            href="/mentions-legales"
            className="hover:text-white/70 transition-colors duration-120"
          >
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
