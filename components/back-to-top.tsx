"use client";
import { FiArrowUp } from "react-icons/fi";
export function BackToTop() {
  return (
    <a
      href="#top"
      className="group ml-auto grid size-10 place-items-center rounded-full border border-[#dcd7cc] bg-[#171813]/5 text-[#171813] transition hover:-translate-y-1 hover:border-[#b98b24] hover:bg-[#b98b24] hover:text-[#171813] active:scale-95 dark:border-white/15 dark:bg-white/5 dark:text-[#dcd7cc] dark:hover:text-[#e1b54e]"
      aria-label="Back to top"
    >
      <FiArrowUp
        className="transition-transform group-hover:-translate-y-0.5"
        aria-hidden
      />
    </a>
  );
}
