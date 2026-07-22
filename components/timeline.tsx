import { timeline } from "@/data/portfolio";
import { Reveal } from "./motion";

export function Timeline() {
  return (
    <ol
      className="relative list-none before:absolute before:bottom-6 before:left-[25px] before:top-6 before:w-px before:bg-[#dcd7cc] dark:before:bg-[#33352e]"
      aria-label="Ahmed's learning journey"
    >
      {timeline.map((item, index) => (
        <Reveal key={`${item.year}-${item.title}`} delay={index * 0.06}>
          <li className="relative grid grid-cols-[52px_1fr] gap-5 pb-10 last:pb-0 md:gap-7">
            <div
              className="z-10 grid size-[52px] place-items-center rounded-full border border-[#b98b24] bg-[#fffdf8] font-display font-bold text-[#8a6515] dark:bg-[#191a16] dark:text-[#e1b54e]"
              aria-hidden
            >
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8a6515] dark:text-[#e1b54e]">
                {item.year}
              </span>
              <h3 className="my-1 font-display text-2xl">{item.title}</h3>
              <p className="max-w-2xl text-[#62645d] dark:text-[#b0b0a7]">
                {item.description}
              </p>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
