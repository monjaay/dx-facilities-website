/**
 * Bandeau groupe Dextera — charte commune à tous les sites du groupe.
 * Site courant : DX Facilities (non cliquable, surligné).
 * Référence : opaldx-site/docs/dextera-group-bar.html
 */
const SITES = [
  { name: "Dextera Construction", href: "https://dextera-group.com/subsidiaries/dextera-construction.html" },
  { name: "Opal DX", href: "https://opaldx.com" },
  { name: "DX Facilities", href: null }, // site courant
  { name: "Dextera Real Estate", href: "https://realestate.dextera-group.com" },
  { name: "DX Management", href: "https://dextera-group.com/subsidiaries/dx-management.html" },
];

export function GroupBar() {
  return (
    <nav
      aria-label="Sites du groupe Dextera"
      className="border-b border-white/10 bg-[#050505] text-[11px] tracking-[0.04em]"
    >
      <div className="mx-auto flex min-h-[34px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8">
        <a
          href="https://dextera-group.com"
          rel="noopener"
          className="whitespace-nowrap font-medium tracking-[0.14em] text-white/85 transition-colors hover:text-white"
        >
          DEXTERA <b className="font-extrabold">GROUP</b>
        </a>
        <div className="flex items-center gap-2.5 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SITES.map((s, i) => (
            <span key={s.name} className="flex items-center gap-2.5">
              {i > 0 && <span aria-hidden className="text-white/25">·</span>}
              {s.href ? (
                <a href={s.href} rel="noopener" className="py-2 text-white/55 transition-colors hover:text-white">
                  {s.name}
                </a>
              ) : (
                <span aria-current="true" className="py-2 font-semibold text-white">
                  {s.name}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}
