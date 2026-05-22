"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  Upload, CheckCircle, AlertCircle, Lock, Eye, EyeOff, LogOut,
  ImageIcon, RefreshCw, BarChart3, Users, Type, Camera, Save,
  Loader2, Home, Globe, ChevronDown,
} from "lucide-react";
import { team } from "@/data/team";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function nameToSlug(name: string): string {
  return name.toLowerCase().normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

const SITE_IMAGES = [
  { key: "hero",             label: "Hero — accueil",         filename: "hero.jpg",             folder: "root" },
  { key: "about-team",      label: "Photo — À propos",       filename: "about-team.jpg",       folder: "root" },
  { key: "case-study",      label: "Étude de cas",            filename: "case-study.jpg",       folder: "root" },
  { key: "dextera-group",   label: "DEXTERA GROUP",           filename: "dextera-group.jpg",    folder: "root" },
] as const;

const SERVICE_SLUGS = [
  { slug: "maintenance-technique",  label: "Maintenance technique" },
  { slug: "gestion-actifs",         label: "Gestion des actifs" },
  { slug: "smart-buildings",        label: "Bâtiments connectés" },
  { slug: "maintenance-predictive", label: "Maintenance prédictive" },
  { slug: "efficacite-energetique", label: "Performance énergétique" },
  { slug: "securite",               label: "Sécurité" },
  { slug: "nettoyage-professionnel",label: "Propreté" },
  { slug: "accueil-courrier",       label: "Accueil & services" },
] as const;

// ---------------------------------------------------------------------------
// Content types (mirror content.json shape)
// ---------------------------------------------------------------------------

interface CKpi   { value: string; unit: string; label: string }
interface CMember { name: string; role: string; company: string; bio: string; photo: string }
interface CHero  { eyebrow: string; title: string; titleAccent: string; subtitle: string; tagline: string; ctaPrimary: string; ctaSecondary: string }
interface CCTABand { title: string; subtitle: string; ctaPrimary: string; ctaSecondary: string }
interface CWhyReason { icon: string; title: string; description: string }
interface CWhyUs { eyebrow: string; title: string; titleAccent: string; titleSuffix: string; reasons: CWhyReason[] }
interface CCaseStudyStat { value: string; label: string }
interface CCaseStudy { eyebrow: string; title: string; body: string; stats: CCaseStudyStat[]; quote: string; quoteCite: string }
interface CServicesPageItem { value: string; label: string }
interface CServicesPage { hero: { eyebrow: string; title: string; subtitle: string }; results: { eyebrow: string; title: string; items: CServicesPageItem[] } }
interface CServiceKpi { value: string; label: string }
interface CServiceProcess { step: string; description: string }
interface CService { slug: string; title: string; category: string; icon: string; description: string; tagline: string; intro: string; details: string; features: string[]; process: CServiceProcess[]; kpis: CServiceKpi[] }
interface CAboutImpact { value: string; label: string }
interface CAboutValue { title: string; description: string }
interface CAboutPage { hero: { eyebrow: string; title: string; subtitle: string }; mission: { eyebrow: string; title: string; body1: string; body2: string }; impacts: CAboutImpact[]; values: { eyebrow: string; title: string; items: CAboutValue[] }; teamSection: { eyebrow: string; title: string; subtitle: string } }
interface CGroupPillar { icon: string; title: string; body: string }
interface CGroupTimeline { year: string; title: string; event: string }
interface CGroupPage { hero: { eyebrow: string; title: string; titleAccent: string; subtitle: string; body: string }; vision: { eyebrow: string; title: string; subtitle: string; pillars: CGroupPillar[] }; history: { eyebrow: string; title: string; body1: string; body2: string; timeline: CGroupTimeline[] } }
interface CContactInfo { phone: string; mobile: string; email: string; address: string; hours: string }
interface CContactPage { hero: { eyebrow: string; title: string; subtitle: string }; info: CContactInfo }
interface CFooter { tagline: string; description: string; slogan: string; groupLabel: string }

interface CSitePhotos { hero: string; "about-team": string; "case-study": string; "dextera-group": string }

interface SiteContent {
  photos: CSitePhotos;
  kpis: CKpi[]; team: CMember[]; hero: CHero; ctaBand: CCTABand;
  whyUs: CWhyUs; caseStudy: CCaseStudy; servicesPage: CServicesPage;
  services: CService[]; aboutPage: CAboutPage; groupPage: CGroupPage;
  contactPage: CContactPage; footer: CFooter;
}

type SaveStatus = "idle" | "saving" | "saved" | "error";
type AdminTab = "photos" | "accueil" | "services" | "pages" | "equipe";
type PageSection = "about" | "group" | "contact";

// ---------------------------------------------------------------------------
// Upload types
// ---------------------------------------------------------------------------

type UploadStatus = "idle" | "uploading" | "success" | "error";
interface SlotState { preview: string | null; file: File | null; status: UploadStatus; savedPath: string | null }
const emptySlot = (): SlotState => ({ preview: null, file: null, status: "idle", savedPath: null });

// ---------------------------------------------------------------------------
// Reusable form components
// ---------------------------------------------------------------------------

function FLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40 mb-1 block">
      {children}
    </span>
  );
}

function FInput({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <FLabel>{label}</FLabel>
      <input type="text" value={value} onChange={e => onChange(e.target.value)}
        className="w-full bg-white/[0.06] border border-white/10 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-dx-blue-500/60 focus:ring-1 focus:ring-dx-blue-500/20 transition-all" />
      {hint && <p className="text-[11px] text-white/25 mt-0.5">{hint}</p>}
    </div>
  );
}

function FTextarea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div className="flex flex-col gap-1">
      <FLabel>{label}</FLabel>
      <textarea value={value} rows={rows} onChange={e => onChange(e.target.value)}
        className="w-full bg-white/[0.06] border border-white/10 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-dx-blue-500/60 focus:ring-1 focus:ring-dx-blue-500/20 transition-all resize-none leading-relaxed" />
    </div>
  );
}

function FList({ label, value, onChange, hint }: { label: string; value: string[]; onChange: (v: string[]) => void; hint?: string }) {
  const text = value.join("\n");
  return (
    <div className="flex flex-col gap-1">
      <FLabel>{label}</FLabel>
      <textarea value={text} rows={Math.max(3, value.length + 1)}
        onChange={e => onChange(e.target.value.split("\n"))}
        className="w-full bg-white/[0.06] border border-white/10 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-dx-blue-500/60 focus:ring-1 focus:ring-dx-blue-500/20 transition-all resize-none leading-relaxed font-mono text-xs" />
      {hint && <p className="text-[11px] text-white/25 mt-0.5">{hint}</p>}
    </div>
  );
}

function SaveBtn({ status, onClick, label = "Enregistrer" }: { status: SaveStatus; onClick: () => void; label?: string }) {
  return (
    <button onClick={onClick} disabled={status === "saving"}
      className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-dx-blue-500 hover:bg-dx-blue-600 text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
      {status === "saving"  ? <><Loader2 size={14} className="animate-spin" />Enregistrement…</>
       : status === "saved"  ? <><CheckCircle size={14} className="text-emerald-300" />Sauvegardé</>
       : status === "error"  ? <><AlertCircle size={14} className="text-red-400" />Erreur — réessayer</>
       : <><Save size={14} />{label}</>}
    </button>
  );
}

function SectionCard({ title, subtitle, children, status, onSave, saveLabel }: {
  title: string; subtitle?: string; children: React.ReactNode;
  status: SaveStatus; onSave: () => void; saveLabel?: string;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6 flex flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white">{title}</h2>
          {subtitle && <p className="text-xs text-white/35 mt-0.5">{subtitle}</p>}
        </div>
        <SaveBtn status={status} onClick={onSave} label={saveLabel} />
      </div>
      {children}
    </div>
  );
}

function DeployNote() {
  return (
    <div className="rounded-xl border border-dx-blue-500/20 bg-dx-blue-500/[0.06] p-5 flex gap-4">
      <div className="w-8 h-8 rounded-lg bg-dx-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
        <RefreshCw size={15} className="text-dx-blue-300" />
      </div>
      <div>
        <p className="text-sm font-semibold text-white/80 mb-1">Publication automatique</p>
        <p className="text-sm text-white/50 leading-relaxed">
          Chaque sauvegarde commit directement sur GitHub. Vercel reconstruit le site en{" "}
          <span className="text-white/70">~25 secondes</span> — aucune action manuelle requise.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Photo card
// ---------------------------------------------------------------------------

function PhotoCard({ label, subtitle, currentSrc, slotState, onFileSelect, onUpload, onReset, aspect = "aspect-square" }: {
  label: string; subtitle?: string; currentSrc?: string; slotState: SlotState;
  onFileSelect: (f: File) => void; onUpload: () => void; onReset: () => void; aspect?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const displaySrc = slotState.preview ?? (slotState.savedPath ?? currentSrc);
  return (
    <div className="flex flex-col gap-3 bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
      <div className={`relative ${aspect} rounded-lg overflow-hidden bg-white/[0.06] border border-white/10 group cursor-pointer`}
        onClick={() => inputRef.current?.click()}>
        {displaySrc ? (
          <Image src={displaySrc} alt={label} fill className="object-cover" unoptimized={!!slotState.preview} key={displaySrc} />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/[0.08] flex items-center justify-center">
              <ImageIcon size={18} className="text-white/30" />
            </div>
            <span className="text-xs text-white/25">Aucune photo</span>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <div className="flex items-center gap-1.5 text-white text-xs font-semibold bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
            <Upload size={12} /> Changer
          </div>
        </div>
        {slotState.status === "success" && (
          <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/20 backdrop-blur-sm">
            <CheckCircle size={28} className="text-emerald-400" />
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) onFileSelect(f); e.target.value = ""; }} />
      <div className="flex-1">
        <p className="text-sm font-semibold text-white leading-snug">{label}</p>
        {subtitle && <p className="text-xs text-dx-blue-300 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex flex-col gap-2">
        {!slotState.file && slotState.status !== "success" && (
          <button onClick={() => inputRef.current?.click()}
            className="w-full text-sm py-2 px-3 rounded-lg border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-colors text-center">
            Choisir une photo
          </button>
        )}
        {slotState.file && slotState.status !== "success" && (
          <button onClick={onUpload} disabled={slotState.status === "uploading"}
            className="w-full text-sm py-2 px-3 rounded-lg bg-dx-blue-500 hover:bg-dx-blue-600 text-white font-semibold transition-colors disabled:opacity-50 text-center">
            {slotState.status === "uploading"
              ? <span className="flex items-center justify-center gap-2"><RefreshCw size={13} className="animate-spin" />Enregistrement…</span>
              : "Enregistrer"}
          </button>
        )}
        {slotState.status === "success" && (
          <button onClick={onReset}
            className="w-full text-sm py-2 px-3 rounded-lg border border-emerald-500/30 text-emerald-400 hover:border-emerald-500/60 transition-colors text-center flex items-center justify-center gap-1.5">
            <CheckCircle size={13} /> Sauvegardé — Changer
          </button>
        )}
        {slotState.status === "error" && (
          <p className="text-xs text-red-400 flex items-center gap-1.5 justify-center"><AlertCircle size={12} />Erreur — réessayez</p>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Loading/Error states
// ---------------------------------------------------------------------------

function ContentSpinner() {
  return (
    <div className="flex items-center gap-3 text-white/40 py-12">
      <Loader2 size={16} className="animate-spin" />
      <span className="text-sm">Chargement du contenu…</span>
    </div>
  );
}

function ContentErr() {
  return (
    <p className="text-red-400 text-sm flex items-center gap-2 py-4">
      <AlertCircle size={14} />
      Impossible de charger le contenu. Le serveur local doit être en cours d'exécution.
    </p>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function AdminPage() {
  // Auth
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Navigation
  const [activeTab, setActiveTab] = useState<AdminTab>("photos");
  const [pageSection, setPageSection] = useState<PageSection>("about");
  const [selectedService, setSelectedService] = useState<string>(SERVICE_SLUGS[0].slug);

  // Content
  const [draft, setDraft] = useState<SiteContent | null>(null);
  const [contentLoading, setContentLoading] = useState(false);
  const [contentError, setContentError] = useState(false);

  // Save statuses (one per logical section)
  const [saveStatus, setSaveStatusState] = useState<Record<string, SaveStatus>>({});
  const setSave = (key: string, s: SaveStatus) =>
    setSaveStatusState(p => ({ ...p, [key]: s }));
  const ss = (key: string): SaveStatus => saveStatus[key] ?? "idle";

  // Upload slots
  const [slots, setSlots] = useState<Record<string, SlotState>>(() => {
    const init: Record<string, SlotState> = {};
    team.forEach(m => (init[m.name] = emptySlot()));
    SITE_IMAGES.forEach(img => (init[img.key] = emptySlot()));
    SERVICE_SLUGS.forEach(s => (init["svc-" + s.slug] = emptySlot()));
    return init;
  });

  // ---------------------------------------------------------------------------
  // Auth
  // ---------------------------------------------------------------------------

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) setIsAuth(true);
      else setAuthError("Mot de passe incorrect");
    } catch { setAuthError("Erreur de connexion"); }
    finally { setAuthLoading(false); }
  }

  // ---------------------------------------------------------------------------
  // Content loading
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (!isAuth) return;
    setContentLoading(true);
    setContentError(false);
    fetch("/api/admin-content", { headers: { "x-admin-password": password } })
      .then(r => { if (!r.ok) throw new Error(); return r.json() as Promise<SiteContent>; })
      .then(d => { setDraft(d); setContentLoading(false); })
      .catch(() => { setContentError(true); setContentLoading(false); });
  }, [isAuth, password]);

  // ---------------------------------------------------------------------------
  // Content save
  // ---------------------------------------------------------------------------

  async function saveContent(key: string) {
    if (!draft) return;
    setSave(key, "saving");
    try {
      const res = await fetch("/api/admin-content", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify(draft),
      });
      if (res.ok) { setSave(key, "saved"); setTimeout(() => setSave(key, "idle"), 2500); }
      else setSave(key, "error");
    } catch { setSave(key, "error"); }
  }

  // Draft update helpers
  function upd(path: (d: SiteContent) => SiteContent) {
    setDraft(p => p ? path(p) : p);
  }

  const setKpi = (i: number, f: keyof CKpi, v: string) =>
    upd(d => ({ ...d, kpis: d.kpis.map((k, j) => j === i ? { ...k, [f]: v } : k) }));

  const setMember = (i: number, f: keyof CMember, v: string) =>
    upd(d => ({ ...d, team: d.team.map((m, j) => j === i ? { ...m, [f]: v } : m) }));

  const setHero = (f: keyof CHero, v: string) =>
    upd(d => ({ ...d, hero: { ...d.hero, [f]: v } }));

  const setCTA = (f: keyof CCTABand, v: string) =>
    upd(d => ({ ...d, ctaBand: { ...d.ctaBand, [f]: v } }));

  const setWhyUs = (f: string, v: unknown) =>
    upd(d => ({ ...d, whyUs: { ...d.whyUs, [f]: v } }));

  const setWhyReason = (i: number, f: keyof CWhyReason, v: string) =>
    upd(d => ({ ...d, whyUs: { ...d.whyUs, reasons: d.whyUs.reasons.map((r, j) => j === i ? { ...r, [f]: v } : r) } }));

  const setCase = (f: keyof CCaseStudy, v: unknown) =>
    upd(d => ({ ...d, caseStudy: { ...d.caseStudy, [f]: v } }));

  const setCaseStat = (i: number, f: keyof CCaseStudyStat, v: string) =>
    upd(d => ({ ...d, caseStudy: { ...d.caseStudy, stats: d.caseStudy.stats.map((s, j) => j === i ? { ...s, [f]: v } : s) } }));

  const setSvcPage = (sub: "hero" | "results", f: string, v: unknown) =>
    upd(d => ({ ...d, servicesPage: { ...d.servicesPage, [sub]: { ...d.servicesPage[sub], [f]: v } } }));

  const setSvcResult = (i: number, f: keyof CServicesPageItem, v: string) =>
    upd(d => ({ ...d, servicesPage: { ...d.servicesPage, results: { ...d.servicesPage.results, items: d.servicesPage.results.items.map((it, j) => j === i ? { ...it, [f]: v } : it) } } }));

  const setSvc = (slug: string, f: keyof CService, v: unknown) =>
    upd(d => ({ ...d, services: d.services.map(s => s.slug === slug ? { ...s, [f]: v } : s) }));

  const setSvcProcess = (slug: string, i: number, f: keyof CServiceProcess, v: string) =>
    upd(d => ({ ...d, services: d.services.map(s => s.slug === slug ? { ...s, process: s.process.map((p, j) => j === i ? { ...p, [f]: v } : p) } : s) }));

  const setSvcKpi = (slug: string, i: number, f: keyof CServiceKpi, v: string) =>
    upd(d => ({ ...d, services: d.services.map(s => s.slug === slug ? { ...s, kpis: s.kpis.map((k, j) => j === i ? { ...k, [f]: v } : k) } : s) }));

  const setAbout = (sub: keyof CAboutPage, f: string, v: unknown) =>
    upd(d => ({ ...d, aboutPage: { ...d.aboutPage, [sub]: typeof d.aboutPage[sub] === "object" && !Array.isArray(d.aboutPage[sub]) ? { ...(d.aboutPage[sub] as object), [f]: v } : v } }));

  const setAboutImpact = (i: number, f: keyof CAboutImpact, v: string) =>
    upd(d => ({ ...d, aboutPage: { ...d.aboutPage, impacts: d.aboutPage.impacts.map((it, j) => j === i ? { ...it, [f]: v } : it) } }));

  const setAboutValue = (i: number, f: keyof CAboutValue, v: string) =>
    upd(d => ({ ...d, aboutPage: { ...d.aboutPage, values: { ...d.aboutPage.values, items: d.aboutPage.values.items.map((it, j) => j === i ? { ...it, [f]: v } : it) } } }));

  const setGroup = (sub: keyof CGroupPage, f: string, v: unknown) =>
    upd(d => ({ ...d, groupPage: { ...d.groupPage, [sub]: { ...(d.groupPage[sub] as object), [f]: v } } }));

  const setGroupPillar = (i: number, f: keyof CGroupPillar, v: string) =>
    upd(d => ({ ...d, groupPage: { ...d.groupPage, vision: { ...d.groupPage.vision, pillars: d.groupPage.vision.pillars.map((p, j) => j === i ? { ...p, [f]: v } : p) } } }));

  const setGroupTimeline = (i: number, f: keyof CGroupTimeline, v: string) =>
    upd(d => ({ ...d, groupPage: { ...d.groupPage, history: { ...d.groupPage.history, timeline: d.groupPage.history.timeline.map((t, j) => j === i ? { ...t, [f]: v } : t) } } }));

  const setContact = (sub: "hero" | "info", f: string, v: string) =>
    upd(d => ({ ...d, contactPage: { ...d.contactPage, [sub]: { ...(d.contactPage[sub] as object), [f]: v } } }));

  const setFooter = (f: keyof CFooter, v: string) =>
    upd(d => ({ ...d, footer: { ...d.footer, [f]: v } }));

  // ---------------------------------------------------------------------------
  // Upload logic
  // ---------------------------------------------------------------------------

  const handleFileSelect = useCallback((key: string, file: File) => {
    const reader = new FileReader();
    reader.onload = e => setSlots(p => ({ ...p, [key]: { ...p[key], preview: e.target?.result as string, file, status: "idle" } }));
    reader.readAsDataURL(file);
  }, []);

  const handleUpload = useCallback(async (
    key: string,
    folder: string,
    // How to persist the URL back into content.json draft:
    persistTo: { type: "team"; index: number } | { type: "sitePhoto"; photoKey: keyof CSitePhotos } | { type: "none" }
  ) => {
    const slot = slots[key];
    if (!slot?.file) return;
    setSlots(p => ({ ...p, [key]: { ...p[key], status: "uploading" } }));
    const fd = new FormData();
    fd.append("file", slot.file);
    fd.append("folder", folder);
    try {
      const res = await fetch("/api/upload", { method: "POST", headers: { "x-admin-password": password }, body: fd });
      if (!res.ok) { setSlots(p => ({ ...p, [key]: { ...p[key], status: "error" } })); return; }
      const data = await res.json() as { path: string };
      const url = data.path;
      // Persist URL into draft
      if (persistTo.type === "team") {
        const i = persistTo.index;
        setDraft(prev => {
          if (!prev) return prev;
          const team = prev.team.map((m, j) => j === i ? { ...m, photo: url } : m);
          const next = { ...prev, team };
          // Auto-save to GitHub
          fetch("/api/admin-content", {
            method: "POST", headers: { "Content-Type": "application/json", "x-admin-password": password },
            body: JSON.stringify(next),
          }).catch(() => {});
          return next;
        });
      } else if (persistTo.type === "sitePhoto") {
        const pk = persistTo.photoKey;
        setDraft(prev => {
          if (!prev) return prev;
          const next = { ...prev, photos: { ...prev.photos, [pk]: url } };
          fetch("/api/admin-content", {
            method: "POST", headers: { "Content-Type": "application/json", "x-admin-password": password },
            body: JSON.stringify(next),
          }).catch(() => {});
          return next;
        });
      }
      setSlots(p => ({ ...p, [key]: { ...p[key], status: "success", savedPath: url, file: null } }));
    } catch { setSlots(p => ({ ...p, [key]: { ...p[key], status: "error" } })); }
  }, [slots, password]);

  const resetSlot = useCallback((key: string) => setSlots(p => ({ ...p, [key]: emptySlot() })), []);

  // ---------------------------------------------------------------------------
  // Auth gate
  // ---------------------------------------------------------------------------

  if (!isAuth) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#090d1a] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-9 h-9 bg-dx-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <Lock size={16} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-none">DX Facilities</p>
              <p className="text-dx-blue-300 text-xs font-semibold uppercase tracking-widest mt-0.5">Administration</p>
            </div>
          </div>
          <form onSubmit={handleAuth} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-white/50">Mot de passe</label>
              <div className="relative">
                <input type={showPwd ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full bg-white/[0.07] border border-white/15 text-white rounded-xl px-4 py-3.5 pr-12 focus:outline-none focus:border-dx-blue-500 focus:ring-1 focus:ring-dx-blue-500/30 transition-all placeholder:text-white/25"
                  placeholder="••••••••••" autoFocus autoComplete="current-password" />
                <button type="button" onClick={() => setShowPwd(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {authError && <p className="text-red-400 text-sm flex items-center gap-1.5"><AlertCircle size={13} />{authError}</p>}
            </div>
            <button type="submit" disabled={authLoading || !password}
              className="w-full py-3.5 rounded-xl bg-dx-blue-500 hover:bg-dx-blue-600 text-white font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              {authLoading ? "Connexion…" : "Accéder"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Tab config
  // ---------------------------------------------------------------------------

  const TABS: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: "photos",   label: "Photos",    icon: <Camera size={15} /> },
    { id: "accueil",  label: "Accueil",   icon: <Home size={15} /> },
    { id: "services", label: "Services",  icon: <BarChart3 size={15} /> },
    { id: "pages",    label: "Pages",     icon: <Globe size={15} /> },
    { id: "equipe",   label: "Équipe",    icon: <Users size={15} /> },
  ];

  const curSvc = draft?.services.find(s => s.slug === selectedService);

  // ---------------------------------------------------------------------------
  // Dashboard
  // ---------------------------------------------------------------------------

  return (
    <div className="fixed inset-0 z-[9999] bg-[#090d1a] overflow-y-auto">

      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#090d1a]/90 backdrop-blur-md border-b border-white/[0.07] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-base">DX Facilities</span>
          <span className="text-[10px] font-bold uppercase tracking-widest bg-dx-blue-500/20 text-dx-blue-300 border border-dx-blue-500/20 px-2 py-1 rounded-md">Admin</span>
        </div>
        <button onClick={() => { setIsAuth(false); setPassword(""); setDraft(null); }}
          className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors">
          <LogOut size={14} /> Déconnexion
        </button>
      </header>

      {/* Tab bar */}
      <div className="sticky top-[72px] z-10 bg-[#090d1a]/95 backdrop-blur-md border-b border-white/[0.07] px-6">
        <div className="flex gap-1 max-w-6xl mx-auto overflow-x-auto">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${activeTab === tab.id ? "text-white border-dx-blue-500" : "text-white/40 border-transparent hover:text-white/70"}`}>
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-10">

        {/* ================================================================
            PHOTOS TAB
        ================================================================ */}
        {activeTab === "photos" && (
          <>
            <section>
              <div className="mb-6">
                <h1 className="text-xl font-bold text-white">Photos de l&apos;équipe</h1>
                <p className="text-sm text-white/45 mt-1">JPG ou PNG, ratio 1:1, minimum 600 × 600 px.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {team.map((member, i) => (
                  <PhotoCard key={member.name} label={member.name} subtitle={member.role}
                    currentSrc={draft?.team[i]?.photo || undefined}
                    slotState={slots[member.name]}
                    onFileSelect={f => handleFileSelect(member.name, f)}
                    onUpload={() => handleUpload(member.name, "team", { type: "team", index: i })}
                    onReset={() => resetSlot(member.name)} aspect="aspect-square" />
                ))}
              </div>
            </section>

            <section>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">Images du site</h2>
                <p className="text-sm text-white/45 mt-1">Photos principales des pages d&apos;accueil, À propos et Groupe.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SITE_IMAGES.map(img => (
                  <PhotoCard key={img.key} label={img.label}
                    currentSrc={draft?.photos?.[img.key as keyof CSitePhotos] || `/images/${img.filename}`}
                    slotState={slots[img.key]}
                    onFileSelect={f => handleFileSelect(img.key, f)}
                    onUpload={() => handleUpload(img.key, img.folder, { type: "sitePhoto", photoKey: img.key as keyof CSitePhotos })}
                    onReset={() => resetSlot(img.key)} aspect="aspect-video" />
                ))}
              </div>
            </section>

            <section>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">Images des services</h2>
                <p className="text-sm text-white/45 mt-1">
                  Une image par page de service (<code className="text-dx-blue-300 text-xs bg-white/10 px-1 py-0.5 rounded">public/images/services/[slug].jpg</code>).
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {SERVICE_SLUGS.map(svc => (
                  <PhotoCard key={svc.slug} label={svc.label}
                    currentSrc={`/images/services/${svc.slug}.jpg`}
                    slotState={slots["svc-" + svc.slug]}
                    onFileSelect={f => handleFileSelect("svc-" + svc.slug, f)}
                    onUpload={() => handleUpload("svc-" + svc.slug, "services", { type: "none" })}
                    onReset={() => resetSlot("svc-" + svc.slug)} aspect="aspect-video" />
                ))}
              </div>
            </section>

            <DeployNote />
          </>
        )}

        {/* ================================================================
            ACCUEIL TAB
        ================================================================ */}
        {activeTab === "accueil" && (
          <>
            {contentLoading && <ContentSpinner />}
            {contentError && <ContentErr />}
            {draft && (
              <>
                {/* Hero */}
                <SectionCard title="Section Hero" subtitle="Première section visible — page d'accueil" status={ss("hero")} onSave={() => saveContent("hero")}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FInput label="Eyebrow" value={draft.hero.eyebrow} onChange={v => setHero("eyebrow", v)} />
                    <FInput label="Tagline / signature" value={draft.hero.tagline} onChange={v => setHero("tagline", v)} />
                    <FInput label="Titre principal" value={draft.hero.title} onChange={v => setHero("title", v)} />
                    <FInput label="Titre — accent cobalt" value={draft.hero.titleAccent} onChange={v => setHero("titleAccent", v)} />
                    <div className="md:col-span-2">
                      <FTextarea label="Sous-titre" value={draft.hero.subtitle} onChange={v => setHero("subtitle", v)} rows={3} />
                    </div>
                    <FInput label="Bouton principal" value={draft.hero.ctaPrimary} onChange={v => setHero("ctaPrimary", v)} />
                    <FInput label="Bouton secondaire" value={draft.hero.ctaSecondary} onChange={v => setHero("ctaSecondary", v)} />
                  </div>
                </SectionCard>

                {/* KPIs */}
                <SectionCard title="Bandeau KPIs" subtitle="4 chiffres clés affichés en bandeau navy" status={ss("kpis")} onSave={() => saveContent("kpis")}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {draft.kpis.map((kpi, i) => (
                      <div key={i} className="flex flex-col gap-3 bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">KPI {i + 1}</p>
                        <FInput label="Valeur" value={kpi.value} onChange={v => setKpi(i, "value", v)} />
                        <FInput label="Unité" value={kpi.unit} onChange={v => setKpi(i, "unit", v)} />
                        <FInput label="Label" value={kpi.label} onChange={v => setKpi(i, "label", v)} />
                        <div className="pt-3 border-t border-white/[0.07] text-center">
                          <div className="text-2xl font-bold text-white leading-none">
                            {kpi.value}<span className="text-base text-dx-blue-300 ml-0.5">{kpi.unit}</span>
                          </div>
                          <p className="text-[11px] text-white/40 mt-1 uppercase tracking-wider">{kpi.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                {/* WhyUs */}
                <SectionCard title="Section « Pourquoi nous »" subtitle="4 raisons de choisir DX Facilities" status={ss("whyus")} onSave={() => saveContent("whyus")}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <FInput label="Eyebrow" value={draft.whyUs.eyebrow} onChange={v => setWhyUs("eyebrow", v)} />
                    <div className="flex gap-2">
                      <div className="flex-1"><FInput label="Titre" value={draft.whyUs.title} onChange={v => setWhyUs("title", v)} /></div>
                      <div className="flex-1"><FInput label="Accent" value={draft.whyUs.titleAccent} onChange={v => setWhyUs("titleAccent", v)} /></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {draft.whyUs.reasons.map((r, i) => (
                      <div key={i} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 flex flex-col gap-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Raison {i + 1}</p>
                        <FInput label="Titre" value={r.title} onChange={v => setWhyReason(i, "title", v)} />
                        <FTextarea label="Description" value={r.description} onChange={v => setWhyReason(i, "description", v)} rows={2} />
                      </div>
                    ))}
                  </div>
                </SectionCard>

                {/* Case Study */}
                <SectionCard title="Étude de cas" subtitle="Section preuve sociale avec statistiques" status={ss("case")} onSave={() => saveContent("case")}>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FInput label="Eyebrow" value={draft.caseStudy.eyebrow} onChange={v => setCase("eyebrow", v)} />
                    </div>
                    <FInput label="Titre" value={draft.caseStudy.title} onChange={v => setCase("title", v)} />
                    <FTextarea label="Corps du texte" value={draft.caseStudy.body} onChange={v => setCase("body", v)} rows={4} />
                    <div className="grid grid-cols-3 gap-3">
                      {draft.caseStudy.stats.map((st, i) => (
                        <div key={i} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-3 flex flex-col gap-2">
                          <p className="text-[10px] font-bold uppercase text-white/30">Stat {i + 1}</p>
                          <FInput label="Valeur" value={st.value} onChange={v => setCaseStat(i, "value", v)} />
                          <FInput label="Label" value={st.label} onChange={v => setCaseStat(i, "label", v)} />
                        </div>
                      ))}
                    </div>
                    <FTextarea label="Citation client" value={draft.caseStudy.quote} onChange={v => setCase("quote", v)} rows={2} />
                    <FInput label="Source citation" value={draft.caseStudy.quoteCite} onChange={v => setCase("quoteCite", v)} />
                  </div>
                </SectionCard>

                {/* CTA Band */}
                <SectionCard title="Bandeau CTA" subtitle="Bandeau cobalt d'appel à l'action" status={ss("cta")} onSave={() => saveContent("cta")}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2"><FInput label="Titre" value={draft.ctaBand.title} onChange={v => setCTA("title", v)} /></div>
                    <div className="md:col-span-2"><FTextarea label="Sous-titre" value={draft.ctaBand.subtitle} onChange={v => setCTA("subtitle", v)} rows={2} /></div>
                    <FInput label="Bouton principal" value={draft.ctaBand.ctaPrimary} onChange={v => setCTA("ctaPrimary", v)} />
                    <FInput label="Bouton secondaire" value={draft.ctaBand.ctaSecondary} onChange={v => setCTA("ctaSecondary", v)} />
                  </div>
                </SectionCard>

                {/* Footer */}
                <SectionCard title="Footer" subtitle="Textes du bas de page" status={ss("footer")} onSave={() => saveContent("footer")}>
                  <div className="flex flex-col gap-4">
                    <FTextarea label="Tagline (ligne italique)" value={draft.footer.tagline} onChange={v => setFooter("tagline", v)} rows={2} />
                    <FTextarea label="Description entreprise" value={draft.footer.description} onChange={v => setFooter("description", v)} rows={2} />
                    <FInput label="Signature / slogan" value={draft.footer.slogan} onChange={v => setFooter("slogan", v)} />
                    <FInput label="Label groupe" value={draft.footer.groupLabel} onChange={v => setFooter("groupLabel", v)} />
                  </div>
                </SectionCard>

                <DeployNote />
              </>
            )}
          </>
        )}

        {/* ================================================================
            SERVICES TAB
        ================================================================ */}
        {activeTab === "services" && (
          <>
            {contentLoading && <ContentSpinner />}
            {contentError && <ContentErr />}
            {draft && (
              <>
                {/* Services page header */}
                <SectionCard title="Page Services — En-tête & résultats" subtitle="Textes de la page listant les 8 services" status={ss("svcpage")} onSave={() => saveContent("svcpage")}>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FInput label="Eyebrow" value={draft.servicesPage.hero.eyebrow} onChange={v => setSvcPage("hero", "eyebrow", v)} />
                    </div>
                    <FInput label="Titre" value={draft.servicesPage.hero.title} onChange={v => setSvcPage("hero", "title", v)} />
                    <FTextarea label="Sous-titre" value={draft.servicesPage.hero.subtitle} onChange={v => setSvcPage("hero", "subtitle", v)} rows={3} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FInput label="Eyebrow résultats" value={draft.servicesPage.results.eyebrow} onChange={v => setSvcPage("results", "eyebrow", v)} />
                      <FInput label="Titre résultats" value={draft.servicesPage.results.title} onChange={v => setSvcPage("results", "title", v)} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {draft.servicesPage.results.items.map((it, i) => (
                        <div key={i} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-3 flex flex-col gap-2">
                          <p className="text-[10px] font-bold uppercase text-white/30">Résultat {i + 1}</p>
                          <FInput label="Valeur" value={it.value} onChange={v => setSvcResult(i, "value", v)} />
                          <FTextarea label="Label" value={it.label} onChange={v => setSvcResult(i, "label", v)} rows={2} />
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionCard>

                {/* Service detail editor */}
                <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden">
                  {/* Service selector */}
                  <div className="border-b border-white/[0.07] p-4 flex items-center gap-4">
                    <Type size={16} className="text-dx-blue-300 shrink-0" />
                    <div className="flex flex-col gap-1 flex-1">
                      <p className="text-sm font-bold text-white">Détail d&apos;un service</p>
                      <p className="text-xs text-white/40">Sélectionnez un service à éditer</p>
                    </div>
                    <div className="relative">
                      <select value={selectedService} onChange={e => setSelectedService(e.target.value)}
                        className="appearance-none bg-white/[0.08] border border-white/15 text-white text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-dx-blue-500/60 transition-all cursor-pointer">
                        {SERVICE_SLUGS.map(s => (
                          <option key={s.slug} value={s.slug} className="bg-[#090d1a]">{s.label}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                    </div>
                    <SaveBtn status={ss("svc-" + selectedService)} onClick={() => saveContent("svc-" + selectedService)} label="Enregistrer ce service" />
                  </div>

                  {curSvc && (
                    <div className="p-6 flex flex-col gap-6">
                      {/* Basic fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FInput label="Titre" value={curSvc.title} onChange={v => setSvc(selectedService, "title", v)} />
                        <FInput label="Catégorie" value={curSvc.category} onChange={v => setSvc(selectedService, "category", v)} />
                        <FInput label="Tagline" value={curSvc.tagline} onChange={v => setSvc(selectedService, "tagline", v)} />
                        <FInput label="Description courte (cartes)" value={curSvc.description} onChange={v => setSvc(selectedService, "description", v)} />
                        <div className="md:col-span-2">
                          <FTextarea label="Intro (page de détail)" value={curSvc.intro} onChange={v => setSvc(selectedService, "intro", v)} rows={3} />
                        </div>
                        <div className="md:col-span-2">
                          <FTextarea label="Détails / Notre engagement" value={curSvc.details} onChange={v => setSvc(selectedService, "details", v)} rows={5} />
                        </div>
                      </div>

                      {/* Features */}
                      <FList label="Prestations — une par ligne" value={curSvc.features}
                        onChange={v => setSvc(selectedService, "features", v.filter(l => l.trim() !== ""))}
                        hint="Chaque ligne = une prestation affichée avec une coche" />

                      {/* Process steps */}
                      <div className="flex flex-col gap-3">
                        <FLabel>Étapes de l&apos;approche</FLabel>
                        {curSvc.process.map((p, i) => (
                          <div key={i} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-3">
                            <FInput label={`Étape ${i + 1} — Titre`} value={p.step} onChange={v => setSvcProcess(selectedService, i, "step", v)} />
                            <FTextarea label="Description" value={p.description} onChange={v => setSvcProcess(selectedService, i, "description", v)} rows={2} />
                          </div>
                        ))}
                      </div>

                      {/* Service KPIs */}
                      <div className="flex flex-col gap-3">
                        <FLabel>Indicateurs clés (sidebar)</FLabel>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {curSvc.kpis.map((k, i) => (
                            <div key={i} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 flex flex-col gap-3">
                              <p className="text-[10px] font-bold uppercase text-white/30">KPI {i + 1}</p>
                              <FInput label="Valeur" value={k.value} onChange={v => setSvcKpi(selectedService, i, "value", v)} />
                              <FInput label="Label" value={k.label} onChange={v => setSvcKpi(selectedService, i, "label", v)} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <DeployNote />
              </>
            )}
          </>
        )}

        {/* ================================================================
            PAGES TAB
        ================================================================ */}
        {activeTab === "pages" && (
          <>
            {/* Page selector */}
            <div className="flex gap-2 border-b border-white/[0.07] pb-4">
              {([
                { id: "about" as PageSection,   label: "À propos" },
                { id: "group" as PageSection,   label: "DEXTERA GROUP" },
                { id: "contact" as PageSection, label: "Contact" },
              ] as const).map(p => (
                <button key={p.id} onClick={() => setPageSection(p.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pageSection === p.id ? "bg-dx-blue-500 text-white" : "bg-white/[0.05] text-white/50 hover:text-white"}`}>
                  {p.label}
                </button>
              ))}
            </div>

            {contentLoading && <ContentSpinner />}
            {contentError && <ContentErr />}

            {/* ── À PROPOS ── */}
            {draft && pageSection === "about" && (
              <>
                <SectionCard title="À propos — Hero" status={ss("about-hero")} onSave={() => saveContent("about-hero")}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FInput label="Eyebrow" value={draft.aboutPage.hero.eyebrow} onChange={v => setAbout("hero", "eyebrow", v)} />
                    <div className="md:col-span-1"><FInput label="Titre" value={draft.aboutPage.hero.title} onChange={v => setAbout("hero", "title", v)} /></div>
                    <div className="md:col-span-2"><FTextarea label="Sous-titre" value={draft.aboutPage.hero.subtitle} onChange={v => setAbout("hero", "subtitle", v)} rows={2} /></div>
                  </div>
                </SectionCard>

                <SectionCard title="Section Mission" status={ss("about-mission")} onSave={() => saveContent("about-mission")}>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FInput label="Eyebrow" value={draft.aboutPage.mission.eyebrow} onChange={v => setAbout("mission", "eyebrow", v)} />
                      <FInput label="Titre" value={draft.aboutPage.mission.title} onChange={v => setAbout("mission", "title", v)} />
                    </div>
                    <FTextarea label="Paragraphe 1" value={draft.aboutPage.mission.body1} onChange={v => setAbout("mission", "body1", v)} rows={3} />
                    <FTextarea label="Paragraphe 2" value={draft.aboutPage.mission.body2} onChange={v => setAbout("mission", "body2", v)} rows={3} />
                  </div>
                </SectionCard>

                <SectionCard title="Chiffres d'impact" subtitle="4 stats affichées en cartes cobalt" status={ss("about-impacts")} onSave={() => saveContent("about-impacts")}>
                  <div className="grid grid-cols-2 gap-3">
                    {draft.aboutPage.impacts.map((imp, i) => (
                      <div key={i} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 flex flex-col gap-3">
                        <p className="text-[10px] font-bold uppercase text-white/30">Impact {i + 1}</p>
                        <FInput label="Valeur" value={imp.value} onChange={v => setAboutImpact(i, "value", v)} />
                        <FInput label="Label" value={imp.label} onChange={v => setAboutImpact(i, "label", v)} />
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard title="Nos valeurs" subtitle="3 cartes avec titre et description" status={ss("about-values")} onSave={() => saveContent("about-values")}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FInput label="Eyebrow" value={draft.aboutPage.values.eyebrow} onChange={v => setAbout("values", "eyebrow", v)} />
                    <FInput label="Titre section" value={draft.aboutPage.values.title} onChange={v => setAbout("values", "title", v)} />
                  </div>
                  <div className="flex flex-col gap-3 mt-4">
                    {draft.aboutPage.values.items.map((val, i) => (
                      <div key={i} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-3">
                        <FInput label={`Valeur ${i + 1} — Titre`} value={val.title} onChange={v => setAboutValue(i, "title", v)} />
                        <FTextarea label="Description" value={val.description} onChange={v => setAboutValue(i, "description", v)} rows={2} />
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard title="Section Équipe — Titre" subtitle="Textes au-dessus de la grille d'équipe" status={ss("about-team")} onSave={() => saveContent("about-team")}>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FInput label="Eyebrow" value={draft.aboutPage.teamSection.eyebrow} onChange={v => setAbout("teamSection", "eyebrow", v)} />
                      <FInput label="Titre" value={draft.aboutPage.teamSection.title} onChange={v => setAbout("teamSection", "title", v)} />
                    </div>
                    <FTextarea label="Sous-titre" value={draft.aboutPage.teamSection.subtitle} onChange={v => setAbout("teamSection", "subtitle", v)} rows={2} />
                  </div>
                </SectionCard>
              </>
            )}

            {/* ── DEXTERA GROUP ── */}
            {draft && pageSection === "group" && (
              <>
                <SectionCard title="DEXTERA GROUP — Hero" status={ss("group-hero")} onSave={() => saveContent("group-hero")}>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FInput label="Eyebrow" value={draft.groupPage.hero.eyebrow} onChange={v => setGroup("hero", "eyebrow", v)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FInput label="Titre" value={draft.groupPage.hero.title} onChange={v => setGroup("hero", "title", v)} />
                      <FInput label="Titre — accent cobalt" value={draft.groupPage.hero.titleAccent} onChange={v => setGroup("hero", "titleAccent", v)} />
                    </div>
                    <FTextarea label="Paragraphe principal" value={draft.groupPage.hero.subtitle} onChange={v => setGroup("hero", "subtitle", v)} rows={3} />
                    <FTextarea label="Paragraphe secondaire" value={draft.groupPage.hero.body} onChange={v => setGroup("hero", "body", v)} rows={3} />
                  </div>
                </SectionCard>

                <SectionCard title="Section Vision — Piliers" subtitle="4 cartes de piliers stratégiques" status={ss("group-vision")} onSave={() => saveContent("group-vision")}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <FInput label="Eyebrow" value={draft.groupPage.vision.eyebrow} onChange={v => setGroup("vision", "eyebrow", v)} />
                    <FInput label="Titre" value={draft.groupPage.vision.title} onChange={v => setGroup("vision", "title", v)} />
                    <div className="md:col-span-2">
                      <FTextarea label="Sous-titre" value={draft.groupPage.vision.subtitle} onChange={v => setGroup("vision", "subtitle", v)} rows={2} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {draft.groupPage.vision.pillars.map((p, i) => (
                      <div key={i} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 flex flex-col gap-3">
                        <p className="text-[10px] font-bold uppercase text-white/30">Pilier {i + 1}</p>
                        <FInput label="Titre" value={p.title} onChange={v => setGroupPillar(i, "title", v)} />
                        <FTextarea label="Description" value={p.body} onChange={v => setGroupPillar(i, "body", v)} rows={2} />
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard title="Section Histoire & Timeline" status={ss("group-history")} onSave={() => saveContent("group-history")}>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FInput label="Eyebrow" value={draft.groupPage.history.eyebrow} onChange={v => setGroup("history", "eyebrow", v)} />
                      <FInput label="Titre" value={draft.groupPage.history.title} onChange={v => setGroup("history", "title", v)} />
                    </div>
                    <FTextarea label="Paragraphe 1" value={draft.groupPage.history.body1} onChange={v => setGroup("history", "body1", v)} rows={3} />
                    <FTextarea label="Paragraphe 2" value={draft.groupPage.history.body2} onChange={v => setGroup("history", "body2", v)} rows={3} />
                    <div className="flex flex-col gap-3 mt-2">
                      {draft.groupPage.history.timeline.map((t, i) => (
                        <div key={i} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 grid grid-cols-[80px_1fr_2fr] gap-3 items-start">
                          <FInput label="Année" value={t.year} onChange={v => setGroupTimeline(i, "year", v)} />
                          <FInput label="Titre" value={t.title} onChange={v => setGroupTimeline(i, "title", v)} />
                          <FTextarea label="Événement" value={t.event} onChange={v => setGroupTimeline(i, "event", v)} rows={2} />
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionCard>
              </>
            )}

            {/* ── CONTACT ── */}
            {draft && pageSection === "contact" && (
              <>
                <SectionCard title="Contact — En-tête" status={ss("contact-hero")} onSave={() => saveContent("contact-hero")}>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FInput label="Eyebrow" value={draft.contactPage.hero.eyebrow} onChange={v => setContact("hero", "eyebrow", v)} />
                      <FInput label="Titre" value={draft.contactPage.hero.title} onChange={v => setContact("hero", "title", v)} />
                    </div>
                    <FTextarea label="Sous-titre" value={draft.contactPage.hero.subtitle} onChange={v => setContact("hero", "subtitle", v)} rows={2} />
                  </div>
                </SectionCard>

                <SectionCard title="Coordonnées" subtitle="Affiché dans la sidebar et le footer" status={ss("contact-info")} onSave={() => saveContent("contact-info")}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FInput label="Téléphone fixe" value={draft.contactPage.info.phone} onChange={v => setContact("info", "phone", v)} />
                    <FInput label="Mobile" value={draft.contactPage.info.mobile} onChange={v => setContact("info", "mobile", v)} />
                    <FInput label="Email" value={draft.contactPage.info.email} onChange={v => setContact("info", "email", v)} />
                    <div className="md:col-span-2">
                      <FTextarea label="Adresse (une ligne = un retour)" value={draft.contactPage.info.address} onChange={v => setContact("info", "address", v)} rows={3} />
                    </div>
                    <div className="md:col-span-2">
                      <FTextarea label="Horaires (une ligne = un retour)" value={draft.contactPage.info.hours} onChange={v => setContact("info", "hours", v)} rows={2} />
                    </div>
                  </div>
                </SectionCard>
              </>
            )}

            {draft && <DeployNote />}
          </>
        )}

        {/* ================================================================
            ÉQUIPE TAB
        ================================================================ */}
        {activeTab === "equipe" && (
          <>
            {contentLoading && <ContentSpinner />}
            {contentError && <ContentErr />}
            {draft && (
              <>
                <SectionCard title="Membres de l'équipe" subtitle="Noms, rôles, entreprises et biographies affichés sur la page À propos" status={ss("team")} onSave={() => saveContent("team")}>
                  <div className="flex flex-col gap-4">
                    {draft.team.map((m, i) => (
                      <div key={i} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_2fr] gap-4 items-start">
                        <FInput label="Nom" value={m.name} onChange={v => setMember(i, "name", v)} hint="Utilisé pour générer le nom du fichier photo" />
                        <FInput label="Rôle" value={m.role} onChange={v => setMember(i, "role", v)} />
                        <FInput label="Entreprise" value={m.company} onChange={v => setMember(i, "company", v)} />
                        <FTextarea label="Biographie" value={m.bio} onChange={v => setMember(i, "bio", v)} rows={3} />
                      </div>
                    ))}
                  </div>
                </SectionCard>
                <DeployNote />
              </>
            )}
          </>
        )}

      </main>
    </div>
  );
}
