import Link from "next/link";
import SignUpForm from "./_components/signupform";

const SignUpPage = () => {
  return (
    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl ring-1 ring-black/5 shadow-xl w-full max-w-sm flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p className="mt-1.5 text-sm text-gray-500">
          Join the community in a few seconds
        </p>
      </div>
      <SignUpForm />
      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
          href={"/auth/signin"}
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
