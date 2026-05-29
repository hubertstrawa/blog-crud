"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type ButtonProps = React.ComponentProps<typeof Button>;

const SubmitButton = ({ children, ...props }: ButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} disabled={pending} {...props}>
      {children}
    </Button>
  );
};

export default SubmitButton;
