"use client";
import SubmitButton from "@/components/submitbutton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/actions/auth";
import { useActionState } from "react";

const SignInForm = () => {
  const [state, action] = useActionState(signIn, undefined);
  return (
    <form action={action} className="flex flex-col gap-4">
      {!!state?.message && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-red-600 text-sm">
          {state.message}
        </p>
      )}
      <div className="flex flex-col gap-1.5">
        <Label defaultValue={state?.data.email} htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          placeholder="john@example.com"
          type="email"
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
          defaultValue={state?.data.password}
        />
        {!!state?.errors?.password && (
          <p className="text-red-500 text-sm">{state.errors.password}</p>
        )}
      </div>

      <SubmitButton className="w-full mt-1">Sign In</SubmitButton>
    </form>
  );
};

export default SignInForm;
