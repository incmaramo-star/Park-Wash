"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";

import { submitContactLead } from "@/app/[locale]/contact/actions";
import { Link } from "@/i18n/navigation";
import type {
  ContactLeadField,
  ContactLeadFieldErrorCode,
} from "@/lib/leads/contact";
import { initialContactLeadActionState } from "@/lib/leads/contact";

type FieldCopy = {
  label: string;
  placeholder: string;
};

type ContactLeadFormCopy = {
  title: string;
  body: string;
  fields: {
    name: FieldCopy;
    email: FieldCopy;
    phone: FieldCopy;
    customerType: {
      label: string;
      options: {
        particular: string;
        business: string;
      };
    };
    companyName: FieldCopy;
    message: FieldCopy;
    privacyConsent: {
      title: string;
      label: string;
      notice: string;
      linkLabel: string;
    };
  };
  actions: {
    submit: string;
    pending: string;
  };
  status: {
    success: string;
    validation: string;
    setup: string;
    submit: string;
    rateLimit: string;
  };
  validation: Record<ContactLeadFieldErrorCode, string>;
};

type ContactLeadFormProps = {
  locale: string;
  copy: ContactLeadFormCopy;
};

function SubmitButton({ copy }: { copy: ContactLeadFormCopy }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="focus-ring inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-pw-blue-600 px-5 py-3 font-display text-sm font-bold text-white transition hover:bg-pw-blue-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      disabled={pending}
      type="submit"
    >
      <Send aria-hidden size={18} />
      {pending ? copy.actions.pending : copy.actions.submit}
    </button>
  );
}

export function ContactLeadForm({ locale, copy }: ContactLeadFormProps) {
  const [state, formAction] = useActionState(
    submitContactLead,
    initialContactLeadActionState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  function getError(field: ContactLeadField) {
    const error = state.fieldErrors[field];
    return error ? copy.validation[error] : undefined;
  }

  function describedBy(field: ContactLeadField) {
    return getError(field) ? `${field}-error` : undefined;
  }

  const formError =
    state.formError === "setup"
      ? copy.status.setup
      : state.formError === "submit"
        ? copy.status.submit
        : state.formError === "rateLimit"
          ? copy.status.rateLimit
          : state.formError === "validation"
            ? copy.status.validation
            : undefined;

  return (
    <form
      action={formAction}
      className="rounded-md border border-pw-fog bg-pw-white p-5 shadow-1 md:p-6"
      ref={formRef}
    >
      <input name="locale" type="hidden" value={locale} />
      <div>
        <h2 className="font-display text-2xl font-bold text-pw-ink">
          {copy.title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-pw-graphite">{copy.body}</p>
      </div>

      {state.status === "success" ? (
        <p className="mt-5 flex gap-3 rounded-md border border-pw-signal/30 bg-pw-signal/10 p-4 text-sm leading-6 text-pw-ink">
          <CheckCircle2
            aria-hidden
            className="mt-0.5 shrink-0 text-pw-signal"
            size={20}
          />
          <span>{copy.status.success}</span>
        </p>
      ) : null}

      {formError ? (
        <p className="mt-5 flex gap-3 rounded-md border border-pw-alert/30 bg-pw-alert/10 p-4 text-sm leading-6 text-pw-ink">
          <AlertCircle
            aria-hidden
            className="mt-0.5 shrink-0 text-pw-alert"
            size={20}
          />
          <span>{formError}</span>
        </p>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            className="block text-sm font-semibold text-pw-ink"
            htmlFor="name"
          >
            {copy.fields.name.label}
          </label>
          <input
            aria-describedby={describedBy("name")}
            aria-invalid={Boolean(getError("name"))}
            autoComplete="name"
            className="focus-ring mt-2 min-h-11 w-full rounded-md border border-pw-fog bg-pw-paper px-3 py-2 text-sm text-pw-ink"
            id="name"
            maxLength={120}
            minLength={2}
            name="name"
            placeholder={copy.fields.name.placeholder}
            required
            type="text"
          />
          <FieldError error={getError("name")} id="name-error" />
        </div>

        <div>
          <label
            className="block text-sm font-semibold text-pw-ink"
            htmlFor="email"
          >
            {copy.fields.email.label}
          </label>
          <input
            aria-describedby={describedBy("email")}
            aria-invalid={Boolean(getError("email"))}
            autoComplete="email"
            className="focus-ring mt-2 min-h-11 w-full rounded-md border border-pw-fog bg-pw-paper px-3 py-2 text-sm text-pw-ink"
            id="email"
            maxLength={254}
            name="email"
            placeholder={copy.fields.email.placeholder}
            required
            type="email"
          />
          <FieldError error={getError("email")} id="email-error" />
        </div>

        <div>
          <label
            className="block text-sm font-semibold text-pw-ink"
            htmlFor="phone"
          >
            {copy.fields.phone.label}
          </label>
          <input
            aria-describedby={describedBy("phone")}
            aria-invalid={Boolean(getError("phone"))}
            autoComplete="tel"
            className="focus-ring mt-2 min-h-11 w-full rounded-md border border-pw-fog bg-pw-paper px-3 py-2 text-sm text-pw-ink"
            id="phone"
            maxLength={40}
            name="phone"
            placeholder={copy.fields.phone.placeholder}
            type="tel"
          />
          <FieldError error={getError("phone")} id="phone-error" />
        </div>

        <div>
          <label
            className="block text-sm font-semibold text-pw-ink"
            htmlFor="customerType"
          >
            {copy.fields.customerType.label}
          </label>
          <select
            aria-describedby={describedBy("customerType")}
            aria-invalid={Boolean(getError("customerType"))}
            className="focus-ring mt-2 min-h-11 w-full rounded-md border border-pw-fog bg-pw-paper px-3 py-2 text-sm text-pw-ink"
            defaultValue="particular"
            id="customerType"
            name="customerType"
            required
          >
            <option value="particular">
              {copy.fields.customerType.options.particular}
            </option>
            <option value="business">
              {copy.fields.customerType.options.business}
            </option>
          </select>
          <FieldError
            error={getError("customerType")}
            id="customerType-error"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            className="block text-sm font-semibold text-pw-ink"
            htmlFor="companyName"
          >
            {copy.fields.companyName.label}
          </label>
          <input
            aria-describedby={describedBy("companyName")}
            aria-invalid={Boolean(getError("companyName"))}
            autoComplete="organization"
            className="focus-ring mt-2 min-h-11 w-full rounded-md border border-pw-fog bg-pw-paper px-3 py-2 text-sm text-pw-ink"
            id="companyName"
            maxLength={120}
            name="companyName"
            placeholder={copy.fields.companyName.placeholder}
            type="text"
          />
          <FieldError error={getError("companyName")} id="companyName-error" />
        </div>

        <div className="sm:col-span-2">
          <label
            className="block text-sm font-semibold text-pw-ink"
            htmlFor="message"
          >
            {copy.fields.message.label}
          </label>
          <textarea
            aria-describedby={describedBy("message")}
            aria-invalid={Boolean(getError("message"))}
            className="focus-ring mt-2 min-h-32 w-full rounded-md border border-pw-fog bg-pw-paper px-3 py-2 text-sm text-pw-ink"
            id="message"
            maxLength={2000}
            minLength={10}
            name="message"
            placeholder={copy.fields.message.placeholder}
            required
            rows={6}
          />
          <FieldError error={getError("message")} id="message-error" />
        </div>
      </div>

      <div className="mt-6 border-t border-pw-fog pt-5">
        <p className="font-display text-lg font-bold text-pw-ink">
          {copy.fields.privacyConsent.title}
        </p>
        <label className="mt-4 flex gap-3 text-sm leading-7 text-pw-graphite">
          <input
            aria-describedby={describedBy("privacyConsent")}
            aria-invalid={Boolean(getError("privacyConsent"))}
            className="focus-ring mt-1 h-5 w-5 shrink-0 rounded-xs border-pw-blue-600 text-pw-blue-600"
            name="privacyConsent"
            required
            type="checkbox"
          />
          <span>
            {copy.fields.privacyConsent.label}{" "}
            <Link
              className="focus-ring font-semibold text-pw-blue-700 underline underline-offset-4 hover:text-pw-blue-900"
              href="/privacy-policy"
            >
              {copy.fields.privacyConsent.linkLabel}
            </Link>
            .
          </span>
        </label>
        <FieldError
          error={getError("privacyConsent")}
          id="privacyConsent-error"
        />
        <p className="mt-3 text-sm leading-7 text-pw-slate">
          {copy.fields.privacyConsent.notice}
        </p>
      </div>

      <div className="mt-6">
        <SubmitButton copy={copy} />
      </div>
    </form>
  );
}

function FieldError({ error, id }: { error?: string; id: string }) {
  if (!error) {
    return null;
  }

  return (
    <p className="mt-2 text-sm font-semibold text-pw-alert" id={id}>
      {error}
    </p>
  );
}
