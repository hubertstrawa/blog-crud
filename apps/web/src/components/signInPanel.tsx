import Link from "next/link";

const SignInPanel = () => {
  return (
    <>
      <Link href="/auth/signin">Sign In</Link>
      <Link
        href="/auth/signup"
        className="!bg-blue-600 !text-white hover:!bg-blue-500 !px-5 shadow-sm"
      >
        Sign Up
      </Link>
    </>
  );
};

export default SignInPanel;
