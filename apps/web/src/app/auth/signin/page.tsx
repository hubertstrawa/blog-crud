import Link from "next/link";
import SignInForm from "./_components/signInForm";
import { Button } from "@/components/ui/button";
import { PUBLIC_BACKEND_URL } from "@/lib/constants";

const SignInPage = () => {
  return (
    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl ring-1 ring-black/5 shadow-xl w-full max-w-sm flex flex-col">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm text-gray-500">
          Sign in to continue to Ztrawy Blog
        </p>
      </div>
      <SignInForm />
      <Link
        href={"/auth/forgot"}
        className="mt-4 text-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
      >
        Forgot your password?
      </Link>
      <div className="my-5 flex items-center gap-3 text-xs text-gray-400">
        <span className="h-px flex-1 bg-gray-200" />
        OR
        <span className="h-px flex-1 bg-gray-200" />
      </div>
      <Button variant="outline" className="w-full" asChild>
        <a href={`${PUBLIC_BACKEND_URL}/auth/google/login`}>Sign in with Google</a>
      </Button>
    </div>
  );
};

export default SignInPage;
