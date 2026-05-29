"use client";

import { cn } from "@/lib/utils";
import {
  PropsWithChildren,
  ReactNode,
  RefObject,
  useRef,
  useState,
} from "react";
import { useOnClickOutside } from "usehooks-ts";

type Props = PropsWithChildren<{
  triggerIcon: ReactNode;
  triggerClassName?: string;
}>;
const SideBar = (props: Props) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref as RefObject<HTMLElement>, () => setShow(false));
  return (
    <>
      <button
        className={cn(
          "z-50 flex items-center justify-center rounded-full p-2 text-gray-700 bg-white/70 backdrop-blur-xl shadow-sm border border-black/5 transition-colors hover:bg-white",
          props.triggerClassName,
        )}
        onClick={() => setShow((prev) => !prev)}
      >
        {props.triggerIcon}
      </button>
      <div
        ref={ref}
        className={cn(
          "w-72 absolute top-0 z-50 duration-300 transition-all ease-out bg-white/90 backdrop-blur-xl rounded-r-2xl min-h-screen p-6 shadow-2xl border-r border-black/5",
          {
            "-left-full": !show,
            "left-0": show,
          },
        )}
      >
        {props.children}
      </div>
    </>
  );
};

export default SideBar;
