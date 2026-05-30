import { z } from "zod";

export const contactLeadFields = [
  "name",
  "email",
  "phone",
  "customerType",
  "companyName",
  "message",
  "privacyConsent",
] as const;

export type ContactLeadField = (typeof contactLeadFields)[number];
export type ContactLeadFieldErrorCode =
  | "required"
  | "tooShort"
  | "tooLong"
  | "email"
  | "consent"
  | "invalid";
export type ContactLeadFormErrorCode =
  | "validation"
  | "setup"
  | "submit"
  | "rateLimit";

export type ContactLeadActionState = {
  status: "idle" | "success" | "error";
  fieldErrors: Partial<Record<ContactLeadField, ContactLeadFieldErrorCode>>;
  formError?: ContactLeadFormErrorCode;
};

export const initialContactLeadActionState: ContactLeadActionState = {
  status: "idle",
  fieldErrors: {},
};

const requiredText = z.string().trim().min(1, "required");

export const contactLeadSchema = z.object({
  locale: z.enum(["nl", "fr", "en"]),
  name: requiredText.min(2, "tooShort").max(120, "tooLong"),
  email: requiredText.email("email").max(254, "tooLong"),
  phone: z.string().trim().max(40, "tooLong"),
  customerType: z.enum(["particular", "business"], {
    error: "invalid",
  }),
  companyName: z.string().trim().max(120, "tooLong"),
  message: requiredText.min(10, "tooShort").max(2000, "tooLong"),
  privacyConsent: z.boolean().refine((value) => value, "consent"),
});

export type ContactLeadInput = z.infer<typeof contactLeadSchema>;

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export function parseContactLeadForm(formData: FormData) {
  return contactLeadSchema.safeParse({
    locale: readText(formData, "locale"),
    name: readText(formData, "name"),
    email: readText(formData, "email"),
    phone: readText(formData, "phone"),
    customerType: readText(formData, "customerType"),
    companyName: readText(formData, "companyName"),
    message: readText(formData, "message"),
    privacyConsent: formData.get("privacyConsent") === "on",
  });
}

function isContactLeadField(value: unknown): value is ContactLeadField {
  return (
    typeof value === "string" &&
    contactLeadFields.includes(value as ContactLeadField)
  );
}

function normalizeIssueMessage(message: string): ContactLeadFieldErrorCode {
  if (
    message === "required" ||
    message === "tooShort" ||
    message === "tooLong" ||
    message === "email" ||
    message === "consent" ||
    message === "invalid"
  ) {
    return message;
  }

  return "invalid";
}

export function mapContactLeadFieldErrors(
  issues: z.ZodIssue[],
): ContactLeadActionState["fieldErrors"] {
  const fieldErrors: ContactLeadActionState["fieldErrors"] = {};

  for (const issue of issues) {
    const [field] = issue.path;

    if (isContactLeadField(field) && !fieldErrors[field]) {
      fieldErrors[field] = normalizeIssueMessage(issue.message);
    }
  }

  return fieldErrors;
}
