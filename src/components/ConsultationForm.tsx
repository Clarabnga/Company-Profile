"use client";

import {useEffect, useRef, useState, type FormEvent} from "react";

export type ConsultationFormLocale = "id" | "en";

export interface ConsultationFormProps {
  locale: ConsultationFormLocale;
}

type FieldName =
  | "fullName"
  | "company"
  | "position"
  | "phone"
  | "email"
  | "service"
  | "location"
  | "message"
  | "consent";

type FormErrors = Partial<Record<FieldName, string>>;

const fieldOrder: FieldName[] = [
  "fullName",
  "company",
  "position",
  "phone",
  "email",
  "service",
  "location",
  "message",
  "consent",
];

const copy = {
  id: {
    eyebrow: "Konsultasi perusahaan",
    title: "Diskusikan Kebutuhan Tenaga Kerja Anda",
    intro:
      "Lengkapi formulir demonstrasi ini untuk meninjau alur konsultasi. Informasi tidak dikirim, diterima, atau disimpan.",
    fields: {
      fullName: "Nama Lengkap",
      company: "Perusahaan",
      position: "Jabatan",
      phone: "Nomor Telepon",
      email: "Email",
      service: "Layanan yang Dibutuhkan",
      location: "Lokasi Tenaga Kerja",
      message: "Pesan",
      consent: "Persetujuan",
    },
    placeholders: {
      fullName: "Nama Anda",
      company: "Nama perusahaan",
      position: "Contoh: HR Manager",
      phone: "+62 812 3456 7890",
      email: "nama@perusahaan.co.id",
      location: "Contoh: Jakarta Selatan",
      message: "Jelaskan jenis pekerjaan, estimasi jumlah personel, dan target waktu.",
    },
    servicePlaceholder: "Pilih layanan",
    services: [
      ["security", "Layanan Keamanan"],
      ["outsourcing", "Outsourcing Operasional"],
      ["facility", "Facility Support"],
      ["training", "Rekrutmen dan Pelatihan"],
      ["other", "Lainnya"],
    ],
    consent:
      "Saya memahami bahwa formulir demonstrasi ini tidak mengirimkan informasi kepada Garda Karya Nusantara.",
    phoneHint: "Gunakan nomor aktif dengan kode negara bila diperlukan.",
    requiredHint: "Semua field wajib diisi.",
    submit: "Tinjau Alur Konsultasi",
    loading: "Memproses...",
    summary: "Periksa kembali field berikut:",
    errors: {
      fullName: "Nama lengkap minimal 3 karakter.",
      company: "Nama perusahaan minimal 2 karakter.",
      position: "Jabatan minimal 2 karakter.",
      phone: "Masukkan nomor telepon yang valid.",
      email: "Masukkan alamat email yang valid.",
      service: "Pilih layanan yang dibutuhkan.",
      location: "Lokasi tenaga kerja minimal 2 karakter.",
      message: "Pesan minimal 10 karakter.",
      consent: "Persetujuan wajib diberikan untuk melanjutkan.",
    },
    successEyebrow: "Demonstrasi selesai",
    successTitle: "Alur konsultasi selesai",
    successMessage:
      "Formulir demonstrasi ini tidak mengirimkan permintaan. Informasi tidak diterima, disimpan, atau diteruskan ke layanan eksternal.",
    restart: "Mulai Lagi",
  },
  en: {
    eyebrow: "Business consultation",
    title: "Discuss Your Workforce Requirements",
    intro:
      "Complete this demonstration form to review the consultation flow. Information is not sent, received, or stored.",
    fields: {
      fullName: "Full Name",
      company: "Company",
      position: "Position",
      phone: "Phone",
      email: "Email",
      service: "Service Needed",
      location: "Workforce Location",
      message: "Message",
      consent: "Consent",
    },
    placeholders: {
      fullName: "Your name",
      company: "Company name",
      position: "Example: HR Manager",
      phone: "+62 812 3456 7890",
      email: "name@company.com",
      location: "Example: South Jakarta",
      message: "Describe the roles, estimated workforce size, and target timeline.",
    },
    servicePlaceholder: "Select a service",
    services: [
      ["security", "Security Services"],
      ["outsourcing", "Operational Outsourcing"],
      ["facility", "Facility Support"],
      ["training", "Recruitment and Training"],
      ["other", "Other"],
    ],
    consent:
      "I understand that this demonstration form does not submit information to Garda Karya Nusantara.",
    phoneHint: "Use an active number with a country code when applicable.",
    requiredHint: "All fields are required.",
    submit: "Review Consultation Flow",
    loading: "Processing...",
    summary: "Please review the following fields:",
    errors: {
      fullName: "Full Name must contain at least 3 characters.",
      company: "Company must contain at least 2 characters.",
      position: "Position must contain at least 2 characters.",
      phone: "Enter a valid Phone number.",
      email: "Enter a valid Email address.",
      service: "Select the Service Needed.",
      location: "Workforce Location must contain at least 2 characters.",
      message: "Message must contain at least 10 characters.",
      consent: "Consent is required to continue.",
    },
    successEyebrow: "Demonstration complete",
    successTitle: "Consultation flow completed",
    successMessage:
      "This demonstration form does not submit a request. Information was not received, stored, or forwarded to an external service.",
    restart: "Start Again",
  },
} as const;

function describedBy(...ids: Array<string | false | undefined>) {
  const value = ids.filter(Boolean).join(" ");
  return value || undefined;
}

export function ConsultationForm({locale}: ConsultationFormProps) {
  const c = copy[locale];
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameRef = useRef<number | null>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  function clearError(field: FieldName) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = {...current};
      delete next[field];
      return next;
    });
  }

  function validate(form: FormData): FormErrors {
    const next: FormErrors = {};
    const fullName = String(form.get("fullName") || "").trim();
    const company = String(form.get("company") || "").trim();
    const position = String(form.get("position") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const email = String(form.get("email") || "").trim();
    const service = String(form.get("service") || "").trim();
    const location = String(form.get("location") || "").trim();
    const message = String(form.get("message") || "").trim();
    const phoneDigits = phone.replace(/\D/g, "");

    if (fullName.length < 3) next.fullName = c.errors.fullName;
    if (company.length < 2) next.company = c.errors.company;
    if (position.length < 2) next.position = c.errors.position;
    if (
      !/^\+?[0-9][0-9\s().-]{7,19}$/.test(phone) ||
      phoneDigits.length < 8 ||
      phoneDigits.length > 15
    ) {
      next.phone = c.errors.phone;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = c.errors.email;
    if (!service) next.service = c.errors.service;
    if (location.length < 2) next.location = c.errors.location;
    if (message.length < 10) next.message = c.errors.message;
    if (!form.get("consent")) next.consent = c.errors.consent;

    return next;
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    const nextErrors = validate(new FormData(event.currentTarget));
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      frameRef.current = requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setLoading(true);
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setLoading(false);
      setSuccess(true);
    }, 900);
  }

  if (success) {
    return (
      <section
        className="consultation-form-shell consultation-form-success"
        aria-labelledby="consultation-success-title"
        role="status"
        aria-live="polite"
      >
        <span className="consultation-form-success__eyebrow">{c.successEyebrow}</span>
        <h2 id="consultation-success-title" className="consultation-form-success__title">
          {c.successTitle}
        </h2>
        <p className="consultation-form-success__message">{c.successMessage}</p>
        <button
          className="button consultation-form-success__restart"
          type="button"
          onClick={() => {
            setErrors({});
            setSuccess(false);
          }}
        >
          {c.restart}
        </button>
      </section>
    );
  }

  const errorId = (field: FieldName) =>
    errors[field] ? `consultation-${field}-error` : undefined;

  return (
    <section
      className="consultation-form-shell"
      aria-labelledby="consultation-form-title"
    >
      <div className="consultation-form__header">
        <span className="consultation-form__eyebrow">{c.eyebrow}</span>
        <h2 id="consultation-form-title" className="consultation-form__title">
          {c.title}
        </h2>
        <p className="consultation-form__intro">{c.intro}</p>
        <p id="consultation-required-hint" className="consultation-form__required-hint">
          {c.requiredHint}
        </p>
      </div>

      <form
        className="consultation-form"
        onSubmit={submit}
        noValidate
        aria-busy={loading}
      >
        {Object.keys(errors).length > 0 && (
          <div
            ref={errorSummaryRef}
            className="consultation-form__error-summary"
            role="alert"
            tabIndex={-1}
          >
            <strong>{c.summary}</strong>
            <ul>
              {fieldOrder.flatMap((field) =>
                errors[field]
                  ? [
                      <li key={field}>
                        <a href={`#consultation-${field}`}>{errors[field]}</a>
                      </li>,
                    ]
                  : [],
              )}
            </ul>
          </div>
        )}

        <div className="consultation-form__grid">
          <div className="consultation-form__field">
            <label className="consultation-form__label" htmlFor="consultation-fullName">
              {c.fields.fullName}
            </label>
            <input
              className="consultation-form__control"
              id="consultation-fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder={c.placeholders.fullName}
              required
              aria-invalid={!!errors.fullName}
              aria-describedby={describedBy("consultation-required-hint", errorId("fullName"))}
              disabled={loading}
              onInput={() => clearError("fullName")}
            />
            {errors.fullName && (
              <small id="consultation-fullName-error" className="consultation-form__error">
                {errors.fullName}
              </small>
            )}
          </div>

          <div className="consultation-form__field">
            <label className="consultation-form__label" htmlFor="consultation-company">
              {c.fields.company}
            </label>
            <input
              className="consultation-form__control"
              id="consultation-company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder={c.placeholders.company}
              required
              aria-invalid={!!errors.company}
              aria-describedby={describedBy("consultation-required-hint", errorId("company"))}
              disabled={loading}
              onInput={() => clearError("company")}
            />
            {errors.company && (
              <small id="consultation-company-error" className="consultation-form__error">
                {errors.company}
              </small>
            )}
          </div>

          <div className="consultation-form__field">
            <label className="consultation-form__label" htmlFor="consultation-position">
              {c.fields.position}
            </label>
            <input
              className="consultation-form__control"
              id="consultation-position"
              name="position"
              type="text"
              autoComplete="organization-title"
              placeholder={c.placeholders.position}
              required
              aria-invalid={!!errors.position}
              aria-describedby={describedBy("consultation-required-hint", errorId("position"))}
              disabled={loading}
              onInput={() => clearError("position")}
            />
            {errors.position && (
              <small id="consultation-position-error" className="consultation-form__error">
                {errors.position}
              </small>
            )}
          </div>

          <div className="consultation-form__field">
            <label className="consultation-form__label" htmlFor="consultation-phone">
              {c.fields.phone}
            </label>
            <input
              className="consultation-form__control"
              id="consultation-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder={c.placeholders.phone}
              required
              aria-invalid={!!errors.phone}
              aria-describedby={describedBy("consultation-phone-hint", errorId("phone"))}
              disabled={loading}
              onInput={() => clearError("phone")}
            />
            <small id="consultation-phone-hint" className="consultation-form__hint">
              {c.phoneHint}
            </small>
            {errors.phone && (
              <small id="consultation-phone-error" className="consultation-form__error">
                {errors.phone}
              </small>
            )}
          </div>

          <div className="consultation-form__field">
            <label className="consultation-form__label" htmlFor="consultation-email">
              {c.fields.email}
            </label>
            <input
              className="consultation-form__control"
              id="consultation-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={c.placeholders.email}
              required
              aria-invalid={!!errors.email}
              aria-describedby={describedBy("consultation-required-hint", errorId("email"))}
              disabled={loading}
              onInput={() => clearError("email")}
            />
            {errors.email && (
              <small id="consultation-email-error" className="consultation-form__error">
                {errors.email}
              </small>
            )}
          </div>

          <div className="consultation-form__field">
            <label className="consultation-form__label" htmlFor="consultation-service">
              {c.fields.service}
            </label>
            <select
              className="consultation-form__control"
              id="consultation-service"
              name="service"
              defaultValue=""
              required
              aria-invalid={!!errors.service}
              aria-describedby={describedBy("consultation-required-hint", errorId("service"))}
              disabled={loading}
              onChange={() => clearError("service")}
            >
              <option value="" disabled>
                {c.servicePlaceholder}
              </option>
              {c.services.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.service && (
              <small id="consultation-service-error" className="consultation-form__error">
                {errors.service}
              </small>
            )}
          </div>

          <div className="consultation-form__field consultation-form__field--full">
            <label className="consultation-form__label" htmlFor="consultation-location">
              {c.fields.location}
            </label>
            <input
              className="consultation-form__control"
              id="consultation-location"
              name="location"
              type="text"
              autoComplete="address-level2"
              placeholder={c.placeholders.location}
              required
              aria-invalid={!!errors.location}
              aria-describedby={describedBy("consultation-required-hint", errorId("location"))}
              disabled={loading}
              onInput={() => clearError("location")}
            />
            {errors.location && (
              <small id="consultation-location-error" className="consultation-form__error">
                {errors.location}
              </small>
            )}
          </div>

          <div className="consultation-form__field consultation-form__field--full">
            <label className="consultation-form__label" htmlFor="consultation-message">
              {c.fields.message}
            </label>
            <textarea
              className="consultation-form__control consultation-form__message"
              id="consultation-message"
              name="message"
              rows={5}
              maxLength={1200}
              placeholder={c.placeholders.message}
              required
              aria-invalid={!!errors.message}
              aria-describedby={describedBy("consultation-required-hint", errorId("message"))}
              disabled={loading}
              onInput={() => clearError("message")}
            />
            {errors.message && (
              <small id="consultation-message-error" className="consultation-form__error">
                {errors.message}
              </small>
            )}
          </div>

          <div className="consultation-form__field consultation-form__field--full">
            <div className="consultation-form__consent">
              <input
                id="consultation-consent"
                name="consent"
                type="checkbox"
                required
                aria-invalid={!!errors.consent}
                aria-describedby={describedBy("consultation-consent-copy", errorId("consent"))}
                disabled={loading}
                onChange={() => clearError("consent")}
              />
              <label id="consultation-consent-copy" htmlFor="consultation-consent">
                <strong>{c.fields.consent}.</strong> {c.consent}
              </label>
            </div>
            {errors.consent && (
              <small id="consultation-consent-error" className="consultation-form__error">
                {errors.consent}
              </small>
            )}
          </div>
        </div>

        <button
          className="button consultation-form__submit"
          type="submit"
          disabled={loading}
          aria-busy={loading}
        >
          {loading && <span className="consultation-form__spinner" aria-hidden="true" />}
          {loading ? c.loading : c.submit}
        </button>

        <p className="consultation-form__note">
          {locale === "id"
            ? "Formulir demonstrasi: tidak ada informasi yang keluar dari browser."
            : "Demonstration form: no information leaves the browser."}
        </p>
      </form>
    </section>
  );
}

export default ConsultationForm;
