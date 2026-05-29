"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, ChevronDownIcon, CloseIcon } from "./icons";
import { services } from "@/lib/services";

type Status = "idle" | "submitting" | "error";

/**
 * Push a `generate_lead` event to the GTM dataLayer.
 * GTM (container GTM-TJ8BW6SX) listens for this Custom Event to fire the GA4
 * conversion tag — configure the matching trigger in the Tag Manager workspace.
 */
function trackLeadSubmission() {
  if (typeof window === "undefined") return;
  const w = window as typeof window & {
    dataLayer?: Record<string, unknown>[];
  };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({
    event: "generate_lead",
    form_name: "contact_daniel_lux",
    form_location: window.location.pathname,
  });
}

const fieldClass =
  "w-full rounded-lg border border-paper-200 bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent";
const labelClass = "mb-1.5 block text-sm font-semibold text-night";

/** Multi-select dropdown of the company's services. */
function ServicesSelect({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = (name: string) =>
    onChange(
      selected.includes(name)
        ? selected.filter((n) => n !== name)
        : [...selected, name],
    );

  return (
    <div ref={ref} className="relative">
      <span id="services-label" className={labelClass}>
        Services concernés
      </span>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-labelledby="services-label"
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-paper-200 bg-white px-4 py-2.5 text-left text-sm transition-colors focus:border-accent"
      >
        <span className={selected.length ? "text-ink" : "text-ink-soft"}>
          {selected.length
            ? `${selected.length} service${selected.length > 1 ? "s" : ""} sélectionné${selected.length > 1 ? "s" : ""}`
            : "Sélectionnez un ou plusieurs services"}
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 text-ink-soft transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="group"
          aria-labelledby="services-label"
          className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-lg border border-paper-200 bg-white p-2 shadow-xl"
        >
          {services.map((s) => {
            const checked = selected.includes(s.name);
            return (
              <label
                key={s.slug}
                className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-ink transition-colors hover:bg-paper"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(s.name)}
                  className="h-4 w-4 shrink-0 accent-accent"
                />
                {s.name}
              </label>
            );
          })}
        </div>
      )}

      {selected.length > 0 && (
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {selected.map((name) => (
            <li key={name}>
              <button
                type="button"
                onClick={() => toggle(name)}
                className="inline-flex items-center gap-1 rounded-full bg-accent-100 px-2.5 py-1 text-xs font-semibold text-accent-700 transition-colors hover:bg-accent hover:text-white"
                aria-label={`Retirer ${name}`}
              >
                {name}
                <CloseIcon className="h-3 w-3" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(
      formData.entries(),
    );
    payload.services = selectedServices.join(", ");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(body.error ?? "L'envoi a échoué. Veuillez réessayer.");
      }

      trackLeadSubmission();
      router.push("/merci");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue. Veuillez réessayer.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from users, catches bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="entreprise-hp">Ne pas remplir ce champ</label>
        <input
          id="entreprise-hp"
          name="entreprise"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className={labelClass}>
            Nom <span className="text-accent-700">*</span>
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            required
            autoComplete="family-name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="prenom" className={labelClass}>
            Prénom
          </label>
          <input
            id="prenom"
            name="prenom"
            type="text"
            autoComplete="given-name"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="telephone" className={labelClass}>
            Téléphone
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Adresse e-mail <span className="text-accent-700">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </div>
      </div>

      <ServicesSelect
        selected={selectedServices}
        onChange={setSelectedServices}
      />

      <div>
        <label htmlFor="message" className={labelClass}>
          Votre projet <span className="text-accent-700">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={`${fieldClass} resize-y`}
          placeholder="Décrivez votre projet : type de travaux, surface, délais souhaités…"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-accent"
        />
        <label htmlFor="consent" className="text-sm leading-relaxed text-ink-soft">
          J&apos;accepte que les informations transmises via ce formulaire soient
          utilisées et conservées pour le traitement de ma demande.{" "}
          <span className="text-accent-700">*</span>
        </label>
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Envoi en cours…" : "Envoyer ma demande"}
        {status !== "submitting" && <ArrowRightIcon className="h-4 w-4" />}
      </button>

      <p className="text-xs text-ink-soft">
        Les champs marqués d&apos;un <span className="text-accent-700">*</span> sont
        obligatoires.
      </p>
    </form>
  );
}
