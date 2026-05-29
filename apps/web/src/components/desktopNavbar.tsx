"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

type Props = PropsWithChildren;

const DesktopNavbar = (props: Props) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isScrolledDown = scrollPosition > 10;

  return (
    <nav
      className={cn(
        "hidden md:block fixed top-0 inset-x-0 w-full transition-all duration-300 z-50 text-white",
        isScrolledDown || !isHome
          ? "bg-white text-gray-900 border-b border-black/5 shadow-sm"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="flex items-center px-6 py-3 container mx-auto">
        {props.children}
      </div>
    </nav>
  );
};

export default DesktopNavbar;
