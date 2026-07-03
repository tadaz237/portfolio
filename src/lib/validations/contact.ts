import { z } from "zod";

export interface ContactMessages {
  nameMin: string;
  emailInvalid: string;
  subjectMin: string;
  messageMin: string;
}

const defaultMessages: ContactMessages = {
  nameMin: "Name must be at least 2 characters.",
  emailInvalid: "Please enter a valid email.",
  subjectMin: "Subject must be at least 3 characters.",
  messageMin: "Message must be at least 10 characters.",
};

/**
 * Build the contact schema with localized error messages. Used on the client
 * (with dictionary strings) and on the server (with defaults).
 */
export function createContactSchema(m: ContactMessages = defaultMessages) {
  return z.object({
    name: z.string().trim().min(2, m.nameMin).max(80),
    email: z.string().trim().email(m.emailInvalid).max(160),
    subject: z.string().trim().min(3, m.subjectMin).max(120),
    message: z.string().trim().min(10, m.messageMin).max(4000),
    // Honeypot — must stay empty. Bots tend to fill every field.
    company: z.string().max(0).optional(),
  });
}

export const contactSchema = createContactSchema();
export type ContactFormValues = z.infer<typeof contactSchema>;
