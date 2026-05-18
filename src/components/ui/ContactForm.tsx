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
};

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-dx-blue-50 text-dx-blue-500">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="dx-h3 text-dx-navy-500">Message envoyé</h3>
        <p className="dx-body text-dx-steel-600 max-w-sm">
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
    "w-full rounded border border-dx-steel-200 bg-white px-3 py-2.5 text-sm text-dx-navy-700 placeholder:text-dx-steel-400 shadow-xs transition-all duration-120 focus:border-dx-blue-500 focus:outline-none focus:shadow-focus";

  const labelClass = "block dx-caption font-semibold text-dx-navy-700 mb-1.5";

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

      <button
        type="submit"
        disabled={loading}
        className="btn btn--primary btn--lg self-start disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Envoi en cours…" : "Envoyer votre demande"}
      </button>
    </form>
  );
}
