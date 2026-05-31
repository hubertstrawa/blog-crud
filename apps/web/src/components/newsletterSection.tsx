"use client";

import { useActionState } from "react";
import SubmitButton from "./submitbutton";
import { Input } from "./ui/input";
import { subscribeToNewsletter } from "@/lib/actions/newsletter";

const NewsletterSection = () => {
  const [state, action] = useActionState(subscribeToNewsletter, undefined);

  return (
    <section className="container px-6 pb-20 max-w-6xl mx-auto">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
          Stay in the loop
        </h3>
        <p className="mt-2 text-gray-600">
          Subscribe to get an email when a new post is published.
        </p>

        <form action={action} className="mt-6 flex flex-col gap-3 md:flex-row">
          <Input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            defaultValue={state?.data?.email ?? ""}
            className="h-10 md:flex-1"
          />
          <SubmitButton className="h-10 px-6">Subscribe</SubmitButton>
        </form>

        {!!state?.errors?.email && (
          <p className="mt-2 text-sm text-red-600">{state.errors.email[0]}</p>
        )}

        {!!state?.message && (
          <p
            className={`mt-3 text-sm ${
              state.ok ? "text-green-600" : "text-red-600"
            }`}
          >
            {state.message}
          </p>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
