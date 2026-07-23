"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import {
  FiArrowUpRight,
  FiGithub,
  FiMenu,
  FiMoon,
  FiSun,
  FiX,
} from "react-icons/fi";
import { socialLinks } from "@/data/portfolio";

const links = ["Projects", "Skills", "About", "Journey"];
const navWidths = {
  expanded: "1220px",
  compact: "780px",
} as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));

    const updateScrolledState = () => setScrolled(window.scrollY > 24);
    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  const toggleTheme = () => {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    document.documentElement.style.colorScheme = nextDark ? "dark" : "light";
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  };

  return (
    <header
      className={`pointer-events-none sticky top-0 z-50 pt-2.5 transition-[padding] duration-300 ease-out ${
        scrolled ? "min-[981px]:pt-2" : "min-[981px]:pt-4"
      }`}
    >
      <nav
        className={`pointer-events-auto relative mx-auto flex h-16 w-[min(var(--nav-width),calc(100%-20px))] animate-nav-enter items-center justify-between rounded-[15px] border border-[#52452b]/15 bg-paper/95 px-3 shadow-[0_14px_38px_rgba(57,47,27,.12)] backdrop-blur-xl transition-[height,width,border-radius,padding] duration-300 ease-out motion-reduce:animate-none dark:border-white/10 dark:bg-[#111412]/95 dark:shadow-[0_16px_42px_rgba(0,0,0,.18)] md:w-[min(var(--nav-width),calc(100%-40px))] ${
          scrolled
            ? "min-[981px]:h-16 min-[981px]:rounded-[13px] min-[981px]:px-3"
            : "min-[981px]:h-18 min-[981px]:rounded-[18px] min-[981px]:px-4.5"
        }`}
        style={
          {
            "--nav-width": scrolled ? navWidths.compact : navWidths.expanded,
          } as CSSProperties
        }
        aria-label="Main navigation"
      >
        <Link
          href="#top"
          className={`group flex items-center gap-3 font-bold tracking-tight text-[#272820] transition hover:-translate-y-px dark:text-[#f8f5ed]`}
          aria-label="Ahmed Ashraf, home"
        >
          <Image
            className={`size-9.5 rounded-xl border border-black/10 object-cover transition-[width,height,transform] duration-300 group-hover:-rotate-3 group-hover:scale-105 dark:border-white/15 ${
              scrolled ? "min-[981px]:size-9" : "min-[981px]:size-10.5"
            }`}
            src="/images/logo.jpeg"
            width={42}
            height={42}
            alt=""
            priority
          />
          <span>Ahmed Ashraf</span>
        </Link>

        <div className="ml-7 mr-auto hidden gap-2 min-[981px]:flex">
          {links.map((link) => (
            <Link
              className={`relative rounded-[10px] text-sm font-bold text-[#272820] transition-[padding,background-color] duration-500 after:absolute after:bottom-1 after:left-3.5 after:right-3.5 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-sm after:bg-gold after:transition-transform hover:bg-gold/10 hover:after:scale-x-100 dark:text-[#c4c8c1] dark:hover:bg-white/10 dark:hover:text-white ${
                scrolled ? "px-2.5 py-2" : "px-3.5 py-2.5"
              }`}
              key={link}
              href={`#${link.toLowerCase()}`}
            >
              {link}
            </Link>
          ))}
        </div>

        <div
          className={`flex items-center transition-[gap] duration-500 ${
            scrolled ? "gap-1" : "gap-1 md:gap-2"
          }`}
        >
          <Link
            className={`group hidden h-10.5 items-center justify-center overflow-hidden rounded-xl text-[#272820] will-change-transform transition-[width,opacity,transform,padding,background-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 hover:bg-gold/10 active:scale-95 min-[561px]:flex min-[981px]:gap-2 dark:text-[#d9dcd5] dark:hover:bg-white/10 ${
              scrolled
                ? "pointer-events-none min-[561px]:w-0 min-[561px]:scale-90 min-[561px]:opacity-0 min-[981px]:px-0"
                : "min-[561px]:w-10.5 min-[981px]:w-25.5 min-[981px]:px-3"
            }`}
            href={socialLinks.github}
            target="_blank"
            rel="noreferrer"
            aria-label="Ahmed Ashraf on GitHub"
          >
            <FiGithub
              className="shrink-0 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:rotate-6 group-hover:scale-110"
              aria-hidden
            />
            <span className="hidden whitespace-nowrap min-[981px]:inline">
              GitHub
            </span>
          </Link>
          <button
            className={`group mr-1 grid size-10 place-items-center rounded-xl border border-[#52452b]/15 bg-[#272820]/5 text-[#272820] will-change-transform transition-[width,height,transform,background-color,border-color,color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 hover:border-gold/40 hover:bg-gold/10 hover:text-[#8a6515] active:scale-90 dark:border-white/15 dark:bg-white/5 dark:text-[#f5f2e9] dark:hover:bg-white/10 ${
              scrolled ? "min-[981px]:size-8.5" : "min-[981px]:size-10.5"
            }`}
            onClick={toggleTheme}
            aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
          >
            <span className="relative grid size-5 place-items-center transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:rotate-12 group-hover:scale-110">
              <FiSun
                className={`absolute transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                  dark
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-75 opacity-0"
                }`}
                aria-hidden
              />
              <FiMoon
                className={`absolute transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                  dark
                    ? "rotate-90 scale-75 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }`}
                aria-hidden
              />
            </span>
          </button>
          <Link
            className={`group hidden items-center rounded-xl bg-gold text-sm font-bold text-ink transition-[height,padding,gap,transform,background-color] duration-500 hover:-translate-y-0.5 hover:bg-[#d4aa47] min-[981px]:flex ${
              scrolled ? "h-8.5 gap-1 px-3" : "h-10.5 gap-2 px-4"
            }`}
            href="#contact"
          >
            Contact{" "}
            <FiArrowUpRight
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
          <button
            className="grid size-10 place-items-center rounded-xl border border-[#52452b]/15 bg-[#272820]/5 text-[#272820] transition-transform duration-300 active:scale-95 min-[981px]:hidden dark:border-white/15 dark:bg-white/5 dark:text-white"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {open && (
          <div
            id="mobile-menu"
            className="absolute left-0 right-0 top-18 grid origin-top animate-menu-enter rounded-2xl border border-[#52452b]/15 bg-paper/95 p-2.5 shadow-soft backdrop-blur-xl motion-reduce:animate-none dark:border-white/10 dark:bg-[#151815]/95"
          >
            {[...links, "Contact"].map((link) => (
              <Link
                className="rounded-xl px-3.5 py-3 font-bold text-[#3f4038] transition hover:bg-gold/10 dark:text-[#d7dad3] dark:hover:bg-white/10 dark:hover:text-white"
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
              >
                {link}
              </Link>
            ))}
            <Link
              className="mt-1 flex items-center gap-2 border-t border-[#dcd7cc] px-3.5 py-3 font-bold dark:border-white/10"
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              <FiGithub aria-hidden />
              GitHub
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
