"use server";

import { z } from "zod";
import { BACKEND_URL } from "../constants";

const SubscribeNewsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterState = {
  ok?: boolean;
  message?: string;
  errors?: {
    email?: string[];
  };
  data?: {
    email?: string;
  };
};

export async function subscribeToNewsletter(
  state: NewsletterState | undefined,
  formData: FormData,
): Promise<NewsletterState> {
  const input = {
    email: String(formData.get("email") ?? ""),
  };

  const parsed = SubscribeNewsletterSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ...state,
      ok: false,
      message: "Please fix the form errors.",
      errors: parsed.error.flatten().fieldErrors,
      data: { email: input.email },
    };
  }

  try {
    const response = await fetch(`${BACKEND_URL}/newsletter/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        ok: false,
        message: "Could not subscribe right now. Please try again.",
        data: { email: parsed.data.email },
      };
    }

    return {
      ok: true,
      message: "You are subscribed. Thanks for joining our newsletter!",
      errors: {},
      data: { email: "" },
    };
  } catch {
    return {
      ok: false,
      message: "Network error. Please try again in a moment.",
      data: { email: parsed.data.email },
    };
  }
}
