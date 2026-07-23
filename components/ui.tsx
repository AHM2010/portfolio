import Link from "next/link";
import type { ReactNode } from "react";
import { FiArrowUpRight } from "react-icons/fi";

const buttonStyles = {
  primary:
    "bg-ink text-cream hover:-translate-y-0.5 hover:bg-[#8a6515] hover:text-white dark:bg-[#f3f0e8] dark:text-[#11120f]",
  secondary:
    "border border-[#dcd7cc] bg-paper hover:-translate-y-0.5 dark:border-[#33352e] dark:bg-[#191a16]",
  text: "px-2.5 hover:-translate-y-0.5",
  contact:
    "border border-[#dcd7cc] bg-paper text-ink hover:-translate-y-0.5 hover:bg-white dark:border-[#33352e] dark:bg-ink dark:text-[#f3f0e8] dark:hover:bg-[#25271f]",
} as const;

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-[#dcd7cc] py-20 md:py-28 dark:border-[#33352e]"
    >
      <div className="mb-9 grid items-end gap-5 md:mb-12 md:grid-cols-[1fr_.75fr] md:gap-12">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[.15em] text-[#8a6515] dark:text-[#e1b54e]">
            {eyebrow}
          </p>
          <h2 className="font-display text-[clamp(2.7rem,5vw,4.8rem)] font-semibold leading-none tracking-[-.045em]">
            {title}
          </h2>
        </div>
        <p className="m-0 text-base text-muted dark:text-[#b0b0a7]">{intro}</p>
      </div>
      {children}
    </section>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonStyles;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-[14px] px-5 font-bold transition duration-200 ${buttonStyles[variant]}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
      {external && <FiArrowUpRight aria-hidden />}
    </Link>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#dcd7cc] bg-paper/70 px-3 py-1.5 text-xs font-semibold text-muted dark:border-[#3a3e34] dark:bg-[#20231d] dark:text-[#e0e0d8]">
      {children}
    </span>
  );
}
