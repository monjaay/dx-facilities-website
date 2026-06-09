"use client";

import { useState } from "react";
import { services } from "@/data/services";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  consent: boolean;
};

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  consent: false,
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json() as { error?: string };
        setError(data.error ?? "Une erreur est survenue. Veuillez réessayer.");
      }
    } catch {
      setError("Erreur de connexion. Vérifiez votre connexion et réessayez.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-dx-blue-500 text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="dx-h3 text-white">Message envoyé</h3>
        <p className="dx-body text-white/70 max-w-sm">
          Nous avons bien reçu votre demande. Notre équipe vous recontactera
          dans les 24 heures ouvrées.
        </p>
        <button
          className="btn btn--ghost mt-2"
          onClick={() => { setForm(initialState); setSubmitted(false); }}
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded border border-white/15 bg-white/[0.08] px-3 py-2.5 text-sm text-white placeholder:text-white/30 transition-all duration-120 focus:border-dx-blue-400 focus:outline-none focus:ring-0";

  const labelClass = "block dx-caption font-semibold text-white/80 mb-1.5";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Nom complet <span className="text-dx-danger-500" aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            Entreprise <span className="text-dx-danger-500" aria-hidden="true">*</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            value={form.company}
            onChange={handleChange}
            className={inputClass}
            placeholder="Nom de votre entreprise"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-dx-danger-500" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="votre@email.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
            placeholder="+221 XX XXX XX XX"
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className={labelClass}>
          Service d'intérêt
        </label>
        <select
          id="service"
          name="service"
          value={form.service}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Sélectionner un service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-dx-danger-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
          placeholder="Décrivez votre besoin, vos contraintes, la superficie de vos installations…"
        />
      </div>

      {/* CDP consent — required by Sénégal data protection law */}
      <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          checked={form.consent}
          onChange={handleChange}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border border-white/25 bg-white/10 accent-dx-blue-500 focus:outline-none focus:ring-2 focus:ring-dx-blue-400 focus:ring-offset-0"
          aria-describedby="consent-desc"
        />
        <label htmlFor="consent" id="consent-desc" className="text-xs leading-relaxed text-white/60 cursor-pointer">
          J'accepte que mes données personnelles (nom, entreprise, email, téléphone) soient collectées et traitées par DX Facilities dans le seul but de répondre à ma demande, conformément à la loi n° 2008-12 sur la protection des données personnelles au Sénégal et aux directives de la{" "}
          <abbr title="Commission de Protection des Données Personnelles">CDP</abbr>.{" "}
          <a
            href="/mentions-legales"
            className="underline text-white/75 hover:text-white transition-colors duration-120"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mentions légales
          </a>
          <span className="text-red-400 ml-1" aria-hidden="true">*</span>
        </label>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !form.consent}
        className="btn btn--primary btn--lg self-start disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Envoi en cours…" : "Envoyer votre demande"}
      </button>
    </form>
  );
}
