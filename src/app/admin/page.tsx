"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Upload,
  CheckCircle,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  ImageIcon,
  RefreshCw,
} from "lucide-react";
import { team } from "@/data/team";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

// Site-level images (non-team) that can be replaced from the admin
const SITE_IMAGES = [
  { key: "hero", label: "Hero — page d'accueil", folder: "root", filename: "hero.jpg" },
  { key: "about-team", label: "Photo — À propos", folder: "root", filename: "about-team.jpg" },
  { key: "services-overview", label: "Vue d'ensemble — Services", folder: "root", filename: "services-overview.jpg" },
  { key: "case-study", label: "Étude de cas", folder: "root", filename: "case-study.jpg" },
  { key: "dextera-group", label: "DEXTERA GROUP", folder: "root", filename: "dextera-group.jpg" },
] as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface SlotState {
  preview: string | null;
  file: File | null;
  status: UploadStatus;
  savedPath: string | null;
}

function emptySlot(): SlotState {
  return { preview: null, file: null, status: "idle", savedPath: null };
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function PhotoCard({
  label,
  subtitle,
  currentSrc,
  slotState,
  onFileSelect,
  onUpload,
  onReset,
  aspect = "aspect-square",
}: {
  label: string;
  subtitle?: string;
  currentSrc?: string;
  slotState: SlotState;
  onFileSelect: (file: File) => void;
  onUpload: () => void;
  onReset: () => void;
  aspect?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const displaySrc = slotState.preview ?? (slotState.savedPath ?? currentSrc);

  return (
    <div className="flex flex-col gap-3 bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
      {/* Photo area */}
      <div
        className={`relative ${aspect} rounded-lg overflow-hidden bg-white/[0.06] border border-white/10 group cursor-pointer`}
        onClick={() => inputRef.current?.click()}
        title="Cliquer pour choisir une photo"
      >
        {displaySrc ? (
          <Image
            src={displaySrc}
            alt={label}
            fill
            className="object-cover"
            unoptimized={!!slotState.preview} // previews are data URLs
            key={displaySrc} // force re-render on change
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/[0.08] flex items-center justify-center">
              <ImageIcon size={18} className="text-white/30" />
            </div>
            <span className="text-xs text-white/25">Aucune photo</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <div className="flex items-center gap-1.5 text-white text-xs font-semibold bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
            <Upload size={12} />
            Changer
          </div>
        </div>

        {/* Success overlay */}
        {slotState.status === "success" && (
          <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/20 backdrop-blur-sm">
            <CheckCircle size={28} className="text-emerald-400" />
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFileSelect(f);
          e.target.value = ""; // allow re-selecting same file
        }}
      />

      {/* Info */}
      <div className="flex-1">
        <p className="text-sm font-semibold text-white leading-snug">{label}</p>
        {subtitle && (
          <p className="text-xs text-dx-blue-300 mt-0.5">{subtitle}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        {!slotState.file && slotState.status !== "success" && (
          <button
            onClick={() => inputRef.current?.click()}
            className="w-full text-sm py-2 px-3 rounded-lg border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-colors text-center"
          >
            Choisir une photo
          </button>
        )}

        {slotState.file && slotState.status !== "success" && (
          <button
            onClick={onUpload}
            disabled={slotState.status === "uploading"}
            className="w-full text-sm py-2 px-3 rounded-lg bg-dx-blue-500 hover:bg-dx-blue-600 text-white font-semibold transition-colors disabled:opacity-50 text-center"
          >
            {slotState.status === "uploading" ? (
              <span className="flex items-center justify-center gap-2">
                <RefreshCw size={13} className="animate-spin" />
                Enregistrement…
              </span>
            ) : (
              "Enregistrer"
            )}
          </button>
        )}

        {slotState.status === "success" && (
          <button
            onClick={onReset}
            className="w-full text-sm py-2 px-3 rounded-lg border border-emerald-500/30 text-emerald-400 hover:border-emerald-500/60 transition-colors text-center flex items-center justify-center gap-1.5"
          >
            <CheckCircle size={13} />
            Sauvegardé — Changer
          </button>
        )}

        {slotState.status === "error" && (
          <p className="text-xs text-red-400 flex items-center gap-1.5 justify-center">
            <AlertCircle size={12} />
            Erreur — réessayez
          </p>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function AdminPage() {
  // Auth state
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Per-slot upload state — keyed by member name or site image key
  const [slots, setSlots] = useState<Record<string, SlotState>>(() => {
    const init: Record<string, SlotState> = {};
    team.forEach((m) => (init[m.name] = emptySlot()));
    SITE_IMAGES.forEach((img) => (init[img.key] = emptySlot()));
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
      if (res.ok) {
        setIsAuth(true);
      } else {
        setAuthError("Mot de passe incorrect");
      }
    } catch {
      setAuthError("Erreur de connexion");
    } finally {
      setAuthLoading(false);
    }
  }

  // ---------------------------------------------------------------------------
  // Upload logic
  // ---------------------------------------------------------------------------

  const handleFileSelect = useCallback((key: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSlots((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          preview: e.target?.result as string,
          file,
          status: "idle",
        },
      }));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleUpload = useCallback(
    async (
      key: string,
      filename: string,
      folder: string,
      memberSlug?: string
    ) => {
      const slot = slots[key];
      if (!slot?.file) return;

      setSlots((prev) => ({
        ...prev,
        [key]: { ...prev[key], status: "uploading" },
      }));

      const ext = slot.file.name.split(".").pop() ?? "jpg";
      const finalFilename = filename.includes(".")
        ? filename
        : `${filename}.${ext}`;

      const formData = new FormData();
      formData.append("file", slot.file);
      formData.append("filename", finalFilename);
      formData.append("folder", folder);
      if (memberSlug) formData.append("memberSlug", memberSlug);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "x-admin-password": password },
          body: formData,
        });

        if (res.ok) {
          const data = (await res.json()) as { path: string };
          setSlots((prev) => ({
            ...prev,
            [key]: {
              ...prev[key],
              status: "success",
              savedPath: data.path,
              file: null,
            },
          }));
        } else {
          setSlots((prev) => ({
            ...prev,
            [key]: { ...prev[key], status: "error" },
          }));
        }
      } catch {
        setSlots((prev) => ({
          ...prev,
          [key]: { ...prev[key], status: "error" },
        }));
      }
    },
    [slots, password]
  );

  const resetSlot = useCallback((key: string) => {
    setSlots((prev) => ({ ...prev, [key]: emptySlot() }));
  }, []);

  // ---------------------------------------------------------------------------
  // Password gate
  // ---------------------------------------------------------------------------

  if (!isAuth) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#090d1a] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          {/* Brand */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-9 h-9 bg-dx-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <Lock size={16} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-none">
                DX Facilities
              </p>
              <p className="text-dx-blue-300 text-xs font-semibold uppercase tracking-widest mt-0.5">
                Administration
              </p>
            </div>
          </div>

          <form onSubmit={handleAuth} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.07] border border-white/15 text-white rounded-xl px-4 py-3.5 pr-12 focus:outline-none focus:border-dx-blue-500 focus:ring-1 focus:ring-dx-blue-500/30 transition-all placeholder:text-white/25"
                  placeholder="••••••••••"
                  autoFocus
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  aria-label={showPwd ? "Masquer" : "Afficher"}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {authError && (
                <p className="text-red-400 text-sm flex items-center gap-1.5">
                  <AlertCircle size={13} />
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={authLoading || !password}
              className="w-full py-3.5 rounded-xl bg-dx-blue-500 hover:bg-dx-blue-600 text-white font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {authLoading ? "Connexion…" : "Accéder"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Admin dashboard
  // ---------------------------------------------------------------------------

  return (
    <div className="fixed inset-0 z-[9999] bg-[#090d1a] overflow-y-auto">
      {/* Top bar */}
      <header className="sticky top-0 z-10 bg-[#090d1a]/90 backdrop-blur-md border-b border-white/[0.07] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-base">DX Facilities</span>
          <span className="text-[10px] font-bold uppercase tracking-widest bg-dx-blue-500/20 text-dx-blue-300 border border-dx-blue-500/20 px-2 py-1 rounded-md">
            Admin
          </span>
        </div>
        <button
          onClick={() => {
            setIsAuth(false);
            setPassword("");
          }}
          className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          <LogOut size={14} />
          Déconnexion
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-14">
        {/* ── Team photos ── */}
        <section>
          <div className="mb-6">
            <h1 className="text-xl font-bold text-white">
              Photos de l&apos;équipe
            </h1>
            <p className="text-sm text-white/45 mt-1">
              Format recommandé : JPG ou PNG, ratio 1:1, minimum 600 × 600 px.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {team.map((member) => {
              const slug = nameToSlug(member.name);
              return (
                <PhotoCard
                  key={member.name}
                  label={member.name}
                  subtitle={member.role}
                  currentSrc={`/images/team/${slug}.jpg`}
                  slotState={slots[member.name]}
                  onFileSelect={(f) => handleFileSelect(member.name, f)}
                  onUpload={() =>
                    handleUpload(member.name, `${slug}.jpg`, "team", slug)
                  }
                  onReset={() => resetSlot(member.name)}
                  aspect="aspect-square"
                />
              );
            })}
          </div>
        </section>

        {/* ── Site images ── */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Images du site</h2>
            <p className="text-sm text-white/45 mt-1">
              Remplacez les photos principales utilisées sur les différentes
              pages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SITE_IMAGES.map((img) => (
              <PhotoCard
                key={img.key}
                label={img.label}
                currentSrc={`/images/${img.filename}`}
                slotState={slots[img.key]}
                onFileSelect={(f) => handleFileSelect(img.key, f)}
                onUpload={() =>
                  handleUpload(img.key, img.filename, img.folder)
                }
                onReset={() => resetSlot(img.key)}
                aspect="aspect-video"
              />
            ))}
          </div>
        </section>

        {/* ── Deploy note ── */}
        <div className="rounded-xl border border-dx-blue-500/20 bg-dx-blue-500/[0.06] p-5 flex gap-4">
          <div className="w-8 h-8 rounded-lg bg-dx-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
            <Upload size={15} className="text-dx-blue-300" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white/80 mb-1">
              Déploiement
            </p>
            <p className="text-sm text-white/50 leading-relaxed">
              Les photos sont sauvegardées localement dans{" "}
              <code className="text-dx-blue-300 text-xs bg-white/10 px-1.5 py-0.5 rounded">
                public/images/
              </code>
              . Après vos uploads, ouvrez un terminal et lancez :{" "}
              <code className="text-dx-blue-300 text-xs bg-white/10 px-1.5 py-0.5 rounded">
                git add -A &amp;&amp; git commit -m &quot;photos équipe&quot;
                &amp;&amp; git push
              </code>{" "}
              — Vercel redéploiera automatiquement.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
