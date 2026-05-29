"use client";

import SubmitButton from "@/components/submitbutton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/actions/auth";
import { useActionState } from "react";

const SignUpForm = () => {
  const [state, action] = useActionState(signUp, undefined);
  return (
    <form action={action} className="flex flex-col gap-4">
      {!!state?.message && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-red-600 text-sm">
          {state.message}
        </p>
      )}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          defaultValue={state?.data?.name}
        />
        {!!state?.errors?.name && (
          <p className="text-red-500 text-sm">{state.errors.name}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="john@example.com"
          defaultValue={state?.data?.email}
        />
        {!!state?.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          defaultValue={state?.data?.password}
        />
        {!!state?.errors?.password && (
          <div className="text-sm text-red-500">
            <p>Password Must:</p>
            <ul className="list-disc pl-5">
              {state.errors.password.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <SubmitButton className="w-full mt-1">Sign Up</SubmitButton>
    </form>
  );
};

export default SignUpForm;
