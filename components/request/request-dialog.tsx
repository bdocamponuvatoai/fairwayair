"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Check, Close, Copy, Mail } from "@/components/icons";
import { ButtonArrow, buttonClass, cx } from "@/components/ui";
import {
  communities,
  createMailtoHref,
  createRequestMessage,
  isServiceOption,
  otherCommunity,
  serviceOptions,
  validateRequest,
  type RequestDetails,
  type RequestErrors,
} from "@/lib/request";
import { business } from "@/lib/site";

// Safari does not focus buttons on click, so triggers pass themselves in
// rather than relying on document.activeElement for focus return.
export type RequestOpenOptions = { service?: string; city?: string; trigger?: HTMLElement | null };

export type RequestDialogHandle = { open: (options?: RequestOpenOptions) => void };

type Step = 1 | 2 | 3;

const stepNames = ["Service", "Details", "Review"] as const;

const emptyForm: RequestDetails = { service: "", name: "", phone: "", city: "Palm Desert", details: "" };

const fieldClass =
  "block w-full rounded-xl border border-navy/15 bg-white px-4 py-3.5 text-base text-navy placeholder:text-navy/65 shadow-[inset_0_1px_0_rgb(16_37_64/0.03)] transition-[border-color,box-shadow] duration-200 hover:border-navy/30 focus:border-navy focus:outline-none focus:ring-4 focus:ring-navy/10 aria-invalid:border-red-700 aria-invalid:ring-red-700/10";

export function RequestDialog({ onReady }: { onReady: (handle: RequestDialogHandle) => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const formId = useId();

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<RequestDetails>(emptyForm);
  const [errors, setErrors] = useState<RequestErrors>({});
  const [copyState, setCopyState] = useState<"idle" | "copied" | "manual">("idle");
  const [openCount, setOpenCount] = useState(0);

  const open = useCallback<RequestDialogHandle["open"]>((options = {}) => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    triggerRef.current =
      options.trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    const preset = isServiceOption(options.service) ? options.service : "";
    setForm((prev) => ({
      ...prev,
      service: preset || prev.service,
      city: options.city ?? prev.city,
    }));
    setErrors({});
    setCopyState("idle");
    setStep(preset ? 2 : 1);
    dialog.showModal();
    setOpenCount((n) => n + 1);
  }, []);

  useEffect(() => onReady({ open }), [onReady, open]);

  // Move focus to the step heading so screen readers announce the change.
  useEffect(() => {
    if (openCount === 0) return;
    headingRef.current?.focus({ preventScroll: true });
    dialogRef.current?.querySelector("[data-scroll]")?.scrollTo({ top: 0 });
  }, [step, openCount]);

  const close = () => dialogRef.current?.close();

  const update = <K extends keyof RequestDetails>(key: K, value: RequestDetails[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const continueFromService = () => {
    if (!form.service) {
      setErrors({ service: validateRequest(form).service });
      return;
    }
    setStep(2);
  };

  const review = (event: FormEvent) => {
    event.preventDefault();
    const { name, phone } = validateRequest(form);
    if (name || phone) {
      setErrors({ name, phone });
      const firstInvalid = name ? "name" : "phone";
      document.getElementById(`${formId}-${firstInvalid}`)?.focus();
      return;
    }
    setCopyState("idle");
    setStep(3);
  };

  const message = step === 3 ? createRequestMessage(form) : "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopyState("copied");
    } catch {
      setCopyState("manual");
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${formId}-title`}
      className="sheet text-navy"
      onClose={() => triggerRef.current?.focus({ preventScroll: true })}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="flex h-full flex-col bg-sand-50 md:shadow-[-40px_0_80px_-40px_rgb(7_20_38/0.5)]">
        <header className="flex items-center justify-between gap-4 border-b border-navy/10 px-5 py-4 sm:px-8">
          <p id={`${formId}-title`} className="mono-label text-navy/70">
            Service request
          </p>
          <button
            type="button"
            onClick={close}
            className="-mr-2 grid size-11 place-items-center rounded-full text-xl transition-colors hover:bg-navy/5"
            aria-label="Close service request"
          >
            <Close />
          </button>
        </header>

        <div data-scroll className="flex-1 overflow-y-auto overscroll-contain px-5 pt-8 pb-10 sm:px-8 sm:pt-10">
          <ol className="grid grid-cols-3 gap-2" aria-label="Request progress">
            {stepNames.map((name, index) => {
              const n = index + 1;
              return (
                <li key={name} aria-current={n === step ? "step" : undefined} className="min-w-0">
                  <span
                    className={cx(
                      "block h-0.5 rounded-full transition-colors duration-500",
                      n <= step ? "bg-navy" : "bg-navy/12",
                    )}
                  />
                  <span className={cx("mt-2.5 block truncate mono-label", n === step ? "text-navy" : "text-navy/70")}>
                    {String(n).padStart(2, "0")} {name}
                  </span>
                </li>
              );
            })}
          </ol>

          {step === 1 && (
            <section className="mt-10">
              <h2 ref={headingRef} tabIndex={-1} className="text-title font-semibold focus:outline-none">
                What can we help with?
              </h2>
              <p className="mt-3 text-navy/70">
                Not sure? Pick the closest match, or call{" "}
                <a
                  className="font-semibold text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy"
                  href={business.phone.href}
                >
                  {business.phone.display}
                </a>
                .
              </p>
              <fieldset className="mt-8" aria-describedby={errors.service ? `${formId}-service-error` : undefined}>
                <legend className="sr-only">Service</legend>
                <div className="grid gap-2.5 xs:grid-cols-2">
                  {serviceOptions.map((option) => (
                    <label
                      key={option}
                      className="group relative flex min-h-16 cursor-pointer items-center justify-between gap-3 rounded-xl border border-navy/12 bg-white px-4 py-3 transition-[border-color,background-color,box-shadow] duration-200 hover:border-navy/35 has-checked:border-navy has-checked:bg-navy has-checked:text-white has-focus-visible:ring-4 has-focus-visible:ring-navy/20"
                    >
                      <input
                        type="radio"
                        name="service"
                        value={option}
                        checked={form.service === option}
                        onChange={() => update("service", option)}
                        className="sr-only"
                      />
                      <span className="font-medium">{option}</span>
                      <span
                        aria-hidden="true"
                        className="grid size-5 shrink-0 place-items-center rounded-full border border-current/30 text-xs text-navy transition-colors group-has-checked:border-gold group-has-checked:bg-gold"
                      >
                        <Check className="opacity-0 group-has-checked:opacity-100" />
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {errors.service && (
                <p id={`${formId}-service-error`} role="alert" className="mt-4 text-sm font-medium text-red-800">
                  {errors.service}
                </p>
              )}
              <button
                type="button"
                onClick={continueFromService}
                className={buttonClass("navy", "mt-8 w-full sm:w-auto")}
              >
                Continue <ButtonArrow icon={<ArrowRight />} />
              </button>
            </section>
          )}

          {step === 2 && (
            <form className="mt-10" onSubmit={review} noValidate>
              <h2 ref={headingRef} tabIndex={-1} className="text-title font-semibold focus:outline-none">
                A little about you.
              </h2>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl bg-sand-100 px-4 py-3">
                <span className="mono-label text-navy/70">Service</span>
                <span className="font-semibold">{form.service}</span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="ml-auto text-sm font-semibold underline decoration-navy/25 underline-offset-4 hover:decoration-navy"
                >
                  Change
                </button>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field id={`${formId}-name`} label="Your name" error={errors.name}>
                  <input
                    id={`${formId}-name`}
                    name="name"
                    autoComplete="name"
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                    className={fieldClass}
                  />
                </Field>
                <Field id={`${formId}-phone`} label="Phone number" error={errors.phone}>
                  <input
                    id={`${formId}-phone`}
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={25}
                    placeholder="(760) 555-0123"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    aria-invalid={errors.phone ? true : undefined}
                    aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
                    className={fieldClass}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field id={`${formId}-city`} label="Your community">
                  <div className="relative">
                    <select
                      id={`${formId}-city`}
                      name="city"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      className={cx(fieldClass, "appearance-none pr-11")}
                    >
                      {communities.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                      <option>{otherCommunity}</option>
                    </select>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </Field>
              </div>

              <div className="mt-5">
                <Field id={`${formId}-details`} label="What have you noticed?" hint="Optional">
                  <textarea
                    id={`${formId}-details`}
                    name="details"
                    rows={4}
                    maxLength={1500}
                    placeholder="What the system is doing, and when it started."
                    value={form.details}
                    onChange={(e) => update("details", e.target.value)}
                    className={cx(fieldClass, "resize-y")}
                  />
                </Field>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-navy/70">
                Nothing leaves your device until you send the email yourself. Please don’t include payment information.
              </p>

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button type="button" onClick={() => setStep(1)} className={buttonClass("ghost-dark")}>
                  Back
                </button>
                <button type="submit" className={buttonClass("navy")}>
                  Review request <ButtonArrow icon={<ArrowRight />} />
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <section className="mt-10">
              <h2 ref={headingRef} tabIndex={-1} className="text-title font-semibold focus:outline-none">
                Your draft is ready.
              </h2>
              <p className="mt-3 text-navy/70">Review the details. Nothing has been sent yet.</p>

              <dl className="mt-7 divide-y divide-navy/10 rounded-2xl border border-navy/10 bg-white">
                {(
                  [
                    ["Service", form.service],
                    ["Name", form.name.trim()],
                    ["Phone", form.phone.trim()],
                    ["Community", form.city],
                    ["Details", form.details.trim() || "Discuss by phone"],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="grid gap-1 px-5 py-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
                    <dt className="pt-0.5 mono-label text-navy/70">{label}</dt>
                    <dd className="break-words whitespace-pre-line">{value}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6 text-sm leading-relaxed text-navy/70">
                The button below opens a prefilled email to{" "}
                <strong className="font-semibold text-navy">{business.email}</strong>. Send it from your email app to
                submit the request. A visit is confirmed only after Fairway Air replies.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={createMailtoHref(business.email, form)} className={buttonClass("gold", "sm:flex-1")}>
                  Open email draft <ButtonArrow icon={<Mail />} />
                </a>
                <button type="button" onClick={copy} className={buttonClass("ghost-dark")}>
                  {copyState === "copied" ? <Check className="text-lg" /> : <Copy className="text-lg" />}
                  {copyState === "copied" ? "Copied" : "Copy text"}
                </button>
              </div>

              <p role="status" className="mt-3 min-h-5 text-sm text-navy/70">
                {copyState === "copied" && "Request copied. Paste it into any email to send."}
                {copyState === "manual" && "Select and copy the request below."}
              </p>

              {copyState === "manual" && (
                <label className="mt-2 block">
                  <span className="sr-only">Request text</span>
                  <textarea
                    readOnly
                    rows={8}
                    value={message}
                    onFocus={(e) => e.currentTarget.select()}
                    className={cx(fieldClass, "font-mono text-sm")}
                    autoFocus
                  />
                </label>
              )}

              <button
                type="button"
                onClick={() => setStep(2)}
                className="mt-6 text-sm font-semibold underline decoration-navy/25 underline-offset-4 hover:decoration-navy"
              >
                Edit your details
              </button>
            </section>
          )}
        </div>

        <footer className="border-t border-navy/10 px-5 py-4 text-sm text-navy/70 sm:px-8">
          Need help sooner?{" "}
          <a
            href={business.phone.href}
            className="font-semibold text-navy underline decoration-navy/25 underline-offset-4 hover:decoration-navy"
          >
            Call {business.phone.display}
          </a>
        </footer>
      </div>
    </dialog>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-semibold">
        {label}
        {hint && <span className="font-normal text-navy/70">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}
