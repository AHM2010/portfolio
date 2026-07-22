"use client";

import { useMemo, useState } from "react";
import { projects, projectFilters } from "@/data/portfolio";
import type { ProjectFilter } from "@/types";
import { ProjectCard } from "./project-card";

type ActiveFilter = "All" | ProjectFilter;

export function ProjectExplorer() {
  const [active, setActive] = useState<ActiveFilter>("All");
  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((project) => project.categories.includes(active)),
    [active],
  );
  return (
    <>
      <div
        className="mt-10 flex gap-2 overflow-x-auto pb-2"
        role="group"
        aria-label="Filter projects by technology"
      >
        {projectFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-bold transition hover:-translate-y-0.5 hover:border-[#b98b24] ${active === filter ? "border-[#171813] bg-[#171813] text-[#f6f2e9] dark:border-[#f3f0e8] dark:bg-[#f3f0e8] dark:text-[#11120f]" : "border-[#dcd7cc] bg-[#fffdf8] text-[#62645d] dark:border-[#33352e] dark:bg-[#191a16] dark:text-[#b0b0a7]"}`}
            aria-pressed={active === filter}
            onClick={() => setActive(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <p
        className="mt-2 text-xs text-[#62645d] dark:text-[#b0b0a7]"
        aria-live="polite"
      >
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
      <div className="mt-6 grid items-start gap-6 md:grid-cols-2">
        {visible.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            priority={index < 2}
          />
        ))}
      </div>
    </>
  );
}
