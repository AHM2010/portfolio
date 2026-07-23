"use client";
import { FiArrowUp } from "react-icons/fi";
export function BackToTop() {
  return (
    <a
      href="#top"
      className="group ml-auto grid size-10 place-items-center rounded-full border border-[#dcd7cc] bg-[#171813]/5 text-[#171813] transition hover:-translate-y-1 hover:border-[#8a6515] hover:bg-[#8a6515] dark:hover:text-[#e1b54e] active:scale-95 dark:border-white/15 dark:bg-white/5 dark:text-[#dcd7cc]"
      aria-label="Back to top"
    >
      <FiArrowUp
        className="transition-transform group-hover:-translate-y-0.5"
        aria-hidden
      />
    </a>
  );
}
