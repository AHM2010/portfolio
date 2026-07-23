"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { FiCheckCircle, FiChevronDown } from "react-icons/fi";
import { ProjectImageSlider } from "./project-image-slider";
import { Badge, ButtonLink } from "./ui";

const features = [
  "Authentication",
  "Dashboard analytics",
  "Customer management",
  "Customer details",
  "Deals pipeline",
  "Task management",
  "Settings",
  "Responsive design",
  "Dark mode",
  "TypeScript",
  "Accessibility",
  "Reusable components",
];
const tech = ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"];
const crmImages = [
  {
    src: "/screenshots/nexora-dashboard.png",
    alt: "Nexora CRM analytics dashboard",
  },
  {
    src: "/screenshots/nexora-customers.png",
    alt: "Nexora CRM customer management page",
  },
  {
    src: "/screenshots/nexora-customer-details.png",
    alt: "Nexora CRM customer details page",
  },
  {
    src: "/screenshots/nexora-deals-dark.png",
    alt: "Nexora CRM deals pipeline in dark mode",
  },
  {
    src: "/screenshots/nexora-tasks.png",
    alt: "Nexora CRM task management page",
  },
  {
    src: "/screenshots/nexora-settings.png",
    alt: "Nexora CRM settings page",
  },
] as const;

export function CrmShowcase() {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <article className="grid overflow-hidden rounded-[30px] bg-[#1b1d18] p-5 text-[#f2f2ec] shadow-soft md:p-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-12 lg:p-12">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#dbb557]">
          Flagship case study · In development
        </p>
        <h3 className="mt-4 font-display text-5xl leading-none">
          CRM Dashboard
        </h3>
        <p className="mt-4 text-[#c4c6bd]">
          A scalable workspace concept for helping small teams understand their
          pipeline, manage customer relationships, and keep daily work moving.
        </p>
        <h4 className="mb-2 mt-7 text-xs font-bold uppercase tracking-widest text-[#dbb557]">
          Project overview
        </h4>
        <p className="text-[#bcbeb6]">
          The planned interface brings analytics, contacts, deals, and tasks
          into a consistent system with typed data and reusable components.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {tech.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
        <div className="mt-6">
          <ButtonLink
            href="https://nexora-crm-one.vercel.app/"
            variant="contact"
            external
          >
            Live demo
          </ButtonLink>
        </div>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {features.map((feature) => (
            <li
              className="flex items-center gap-2 text-xs text-[#c5c7be]"
              key={feature}
            >
              <FiCheckCircle className="text-[#d9ad45]" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <ProjectImageSlider
        images={crmImages}
        galleryLabel="Nexora CRM project screenshots"
        priority
        aspectClassName="aspect-16/10"
        className="mt-9 self-center rounded-[20px] border border-[#363a31] bg-[#0d0f0c] shadow-2xl lg:mt-0"
      />
      <div className="col-span-full mt-8 border-t border-[#34372f] pt-5">
        <button
          className="flex w-full items-center justify-between text-left font-bold"
          type="button"
          aria-expanded={detailsOpen}
          aria-controls="crm-case-study-details"
          onClick={() => setDetailsOpen((open) => !open)}
        >
          {detailsOpen ? "Hide case-study details" : "Read case-study details"}
          <FiChevronDown
            className={`transition-transform duration-300 ${detailsOpen ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
        <AnimatePresence initial={false}>
          {detailsOpen && (
            <motion.div
              id="crm-case-study-details"
              className="overflow-hidden"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                className="mt-5 grid gap-4 text-xs text-[#aeb1a8] sm:grid-cols-2 lg:grid-cols-5 [&_b]:block [&_b]:text-[#dfb956]"
                initial={reduceMotion ? false : { y: -8 }}
                animate={{ y: 0 }}
                exit={reduceMotion ? undefined : { y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <p>
                  <b>Problem</b> Customer information, deal progress, and tasks
                  can become fragmented across separate tools.
                </p>
                <p>
                  <b>Solution</b> A unified, responsive dashboard concept with
                  clear navigation and shared interface patterns.
                </p>
                <p>
                  <b>What I’m learning</b> Typed application structure,
                  dashboard information hierarchy, reusable components, and
                  accessibility.
                </p>
                <p>
                  <b>Challenges</b> Keeping dense business data understandable
                  across desktop and mobile layouts.
                </p>
                <p>
                  <b>Future improvements</b> Complete authentication, connect
                  persistent data, add testing, and validate the workflows with
                  users.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}
