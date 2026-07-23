import Link from "next/link";
import {
  FiBriefcase,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import { socialLinks } from "@/data/portfolio";

const cards = [
  {
    label: "Email",
    value: "ahmed_ashraf2010@yahoo.com",
    href: "mailto:ahmed_ashraf2010@yahoo.com",
    icon: FiMail,
  },
  {
    label: "GitHub",
    value: "@AHM2010",
    href: socialLinks.github,
    icon: FiGithub,
  },
  {
    label: "LinkedIn",
    value: "Ahmed Ashraf",
    href: socialLinks.linkedin,
    icon: FiLinkedin,
  },
] as const;

export function ContactCards() {
  const card =
    "flex min-h-24 min-w-0 items-start gap-3.5 rounded-[18px] border border-[#dcd7cc] bg-paper p-5 transition hover:-translate-y-1 hover:border-gold dark:border-[#33352e] dark:hover:border-gold dark:bg-[#191a16]";
  const staticCard =
    "flex min-h-24 min-w-0 items-start gap-3.5 rounded-[18px] border border-[#dcd7cc] bg-paper p-5 dark:border-[#33352e] dark:bg-[#191a16]";
  const content = (label: string, value: string) => (
    <span className="grid min-w-0">
      <small className="text-[.68rem] uppercase tracking-wider text-muted dark:text-[#b0b0a7]">
        {label}
      </small>
      <strong className="wrap-break-word text-sm [overflow-wrap:anywhere]">
        {value}
      </strong>
    </span>
  );
  return (
    <div className="mt-5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map(({ label, value, href, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          className={card}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
        >
          <Icon className="mt-1 shrink-0 text-lg text-[#8a6515]" aria-hidden />
          {content(label, value)}
        </Link>
      ))}
      <div className={staticCard}>
        <FiMapPin
          className="mt-1 shrink-0 text-lg text-[#8a6515]"
          aria-hidden
        />
        {content("Location", "Al Madinah, Saudi Arabia")}
      </div>
      <div className={staticCard}>
        <FiBriefcase
          className="mt-1 shrink-0 text-lg text-[#8a6515]"
          aria-hidden
        />
        {content("Availability", "Open to junior / mid-level opportunities")}
      </div>
    </div>
  );
}
