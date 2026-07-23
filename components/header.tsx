"use client";

import Image from "next/image";
import Link from "next/link";
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
      className={`pointer-events-none sticky top-0 z-50 transition-[padding] duration-300 ease-out ${
        scrolled ? "pt-1.5 md:pt-2" : "pt-2.5 md:pt-4"
      }`}
    >
      <nav
        className={`pointer-events-auto relative mx-auto flex w-[min(1220px,calc(100%-20px))] animate-nav-enter items-center justify-between border border-[#52452b]/15 bg-[#fffdf8]/95 shadow-[0_14px_38px_rgba(57,47,27,.12)] backdrop-blur-xl transition-[height,width,border-radius,padding] duration-300 ease-out motion-reduce:animate-none dark:border-white/10 dark:bg-[#111412]/95 dark:shadow-[0_16px_42px_rgba(0,0,0,.18)] md:w-[min(1220px,calc(100%-40px))] ${
          scrolled
            ? "h-[52px] rounded-[13px] px-2 md:h-16 md:w-[min(760px,calc(100%-64px))] md:px-3"
            : "h-16 rounded-[15px] px-3 md:h-[72px] md:rounded-[18px] md:px-[18px]"
        }`}
        aria-label="Main navigation"
      >
        <Link
          href="#top"
          className="group flex items-center gap-3 font-bold tracking-tight text-[#272820] transition hover:-translate-y-px dark:text-[#f8f5ed]"
          aria-label="Ahmed Ashraf, home"
        >
          <Image
            className={`rounded-xl border border-black/10 object-cover transition-[width,height,transform] duration-300 group-hover:-rotate-3 group-hover:scale-105 dark:border-white/15 ${
              scrolled ? "size-8 md:size-9" : "size-[38px] md:size-[42px]"
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
              className="relative rounded-[10px] px-3.5 py-2.5 text-sm font-bold text-[#272820] transition after:absolute after:bottom-1 after:left-3.5 after:right-3.5 after:h-0.5 after:origin-center after:scale-x-0 after:rounded after:bg-[#b98b24] after:transition-transform hover:bg-[#b98b24]/10 hover:after:scale-x-100 dark:text-[#c4c8c1] dark:hover:bg-white/10 dark:hover:text-white"
              key={link}
              href={`#${link.toLowerCase()}`}
            >
              {link}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <Link
            className={`group hidden size-[42px] items-center justify-center overflow-hidden rounded-xl text-[#272820] transition-[width,opacity,transform,padding,margin] duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#b98b24]/10 min-[561px]:flex min-[981px]:gap-2 dark:text-[#d9dcd5] dark:hover:bg-white/10 ${
              scrolled
                ? "pointer-events-none min-[561px]:w-0 min-[561px]:scale-90 min-[561px]:opacity-0 min-[981px]:px-0"
                : "min-[981px]:w-auto min-[981px]:px-3"
            }`}
            href={socialLinks.github}
            target="_blank"
            rel="noreferrer"
            aria-label="Ahmed Ashraf on GitHub"
          >
            <FiGithub aria-hidden />
            <span className="hidden min-[981px]:inline">GitHub</span>
          </Link>
          <button
            className="group grid size-10 place-items-center rounded-xl border border-[#52452b]/15 bg-[#272820]/5 text-[#272820] transition hover:-translate-y-0.5 hover:border-[#b98b24]/40 hover:bg-[#b98b24]/10 hover:text-[#8a6515] active:scale-95 md:size-[42px] dark:border-white/15 dark:bg-white/5 dark:text-[#f5f2e9] dark:hover:bg-white/10"
            onClick={toggleTheme}
            aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
          >
            <span className="transition-transform duration-300 group-hover:rotate-[14deg] group-hover:scale-110">
              {dark ? <FiSun /> : <FiMoon />}
            </span>
          </button>
          <Link
            className="group hidden h-[42px] items-center gap-2 rounded-xl bg-[#b98b24] px-4 text-sm font-bold text-[#171813] transition hover:-translate-y-0.5 hover:bg-[#d4aa47] min-[981px]:flex"
            href="#contact"
          >
            Contact{" "}
            <FiArrowUpRight
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
          <button
            className="grid size-10 place-items-center rounded-xl border border-[#52452b]/15 bg-[#272820]/5 text-[#272820] transition active:scale-95 min-[981px]:hidden dark:border-white/15 dark:bg-white/5 dark:text-white"
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
            className="absolute left-0 right-0 top-[72px] grid origin-top animate-menu-enter rounded-2xl border border-[#52452b]/15 bg-[#fffdf8]/95 p-2.5 shadow-soft backdrop-blur-xl motion-reduce:animate-none md:top-20 dark:border-white/10 dark:bg-[#151815]/95"
          >
            {[...links, "Contact"].map((link) => (
              <Link
                className="rounded-xl px-3.5 py-3 font-bold text-[#3f4038] transition hover:bg-[#b98b24]/10 dark:text-[#d7dad3] dark:hover:bg-white/10 dark:hover:text-white"
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
