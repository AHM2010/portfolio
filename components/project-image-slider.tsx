"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type SliderImage = {
  src: string;
  alt: string;
};

type ProjectImageSliderProps = {
  images: readonly SliderImage[];
  galleryLabel: string;
  priority?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  aspectClassName?: string;
  className?: string;
};

const swipeThreshold = 45;

function ProjectImageSliderComponent({
  images,
  galleryLabel,
  priority = false,
  autoplay = true,
  autoplayDelay = 4500,
  aspectClassName = "aspect-[16/8.3]",
  className = "",
}: ProjectImageSliderProps) {
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(
    () => new Set(),
  );
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touchPaused, setTouchPaused] = useState(false);
  const touchResumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    setCurrent((index) => Math.min(index, Math.max(images.length - 1, 0)));
  }, [images.length]);

  useEffect(
    () => () => {
      if (touchResumeTimer.current) clearTimeout(touchResumeTimer.current);
    },
    [],
  );

  const goTo = useCallback(
    (nextIndex: number, nextDirection?: number) => {
      if (!hasMultipleImages) return;

      const wrappedIndex =
        ((nextIndex % images.length) + images.length) % images.length;
      setDirection(
        nextDirection ??
          (wrappedIndex === current
            ? direction
            : wrappedIndex > current
              ? 1
              : -1),
      );
      setCurrent(wrappedIndex);
    },
    [current, direction, hasMultipleImages, images.length],
  );

  const showPrevious = useCallback(
    () => goTo(current - 1, -1),
    [current, goTo],
  );
  const showNext = useCallback(
    () => goTo(current + 1, 1),
    [current, goTo],
  );

  useEffect(() => {
    if (
      !hasMultipleImages ||
      !autoplay ||
      reduceMotion ||
      hovered ||
      focused ||
      touchPaused
    ) {
      return;
    }

    const timer = window.setInterval(showNext, autoplayDelay);
    return () => window.clearInterval(timer);
  }, [
    autoplay,
    autoplayDelay,
    focused,
    hasMultipleImages,
    hovered,
    reduceMotion,
    showNext,
    touchPaused,
  ]);

  const pauseAfterTouch = useCallback(() => {
    setTouchPaused(true);
    if (touchResumeTimer.current) clearTimeout(touchResumeTimer.current);
    touchResumeTimer.current = setTimeout(() => setTouchPaused(false), 7000);
  }, []);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      pauseAfterTouch();
      const swipeStrength = Math.abs(info.offset.x) + Math.abs(info.velocity.x);

      if (swipeStrength < swipeThreshold) return;
      if (info.offset.x < 0) showNext();
      else showPrevious();
    },
    [pauseAfterTouch, showNext, showPrevious],
  );

  if (images.length === 0) return null;

  const currentImage = images[current];
  const isLoaded = loadedImages.has(currentImage.src);

  if (!hasMultipleImages) {
    return (
      <div
        className={`relative overflow-hidden bg-neutral-200 dark:bg-[#252720] ${aspectClassName} ${className}`}
      >
        {!isLoaded && (
          <div
            className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#e8e3d8] via-[#f4f0e8] to-[#ddd6c7] motion-reduce:animate-none dark:from-[#252720] dark:via-[#303229] dark:to-[#20221c]"
            aria-hidden
          />
        )}
        <Image
          className={`object-cover transition-[opacity,transform] duration-500 group-hover:scale-[1.025] ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
          priority={priority}
          onLoad={() =>
            setLoadedImages((loaded) => new Set(loaded).add(currentImage.src))
          }
        />
      </div>
    );
  }

  return (
    <div
      className={`group/slider relative touch-pan-y overflow-hidden bg-neutral-200 outline-none focus-visible:ring-2 focus-visible:ring-[#b98b24] focus-visible:ring-inset dark:bg-[#252720] ${aspectClassName} ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={galleryLabel}
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onPointerDown={(event) => {
        if (event.pointerType === "touch") pauseAfterTouch();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          showPrevious();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          showNext();
        }
      }}
    >
      {!isLoaded && (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#e8e3d8] via-[#f4f0e8] to-[#ddd6c7] motion-reduce:animate-none dark:from-[#252720] dark:via-[#303229] dark:to-[#20221c]"
          aria-hidden
        />
      )}

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentImage.src}
          className="absolute inset-0"
          custom={direction}
          initial={
            reduceMotion ? { opacity: 0 } : { x: `${direction * 100}%`, opacity: 0.7 }
          }
          animate={{ x: 0, opacity: 1 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { x: `${direction * -100}%`, opacity: 0.7 }
          }
          transition={{
            duration: reduceMotion ? 0 : 0.42,
            ease: [0.22, 1, 0.36, 1],
          }}
          drag={reduceMotion ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={handleDragEnd}
        >
          <Image
            className={`select-none object-cover transition-[opacity,transform] duration-500 group-hover/slider:scale-[1.02] ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
            priority={priority && current === 0}
            draggable={false}
            onLoad={() =>
              setLoadedImages((loaded) => new Set(loaded).add(currentImage.src))
            }
          />
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        className="absolute left-3 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-[#171813]/70 text-white shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-[#b98b24] hover:text-[#171813] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        onClick={showPrevious}
        aria-label="Show previous project image"
      >
        <FiChevronLeft aria-hidden />
      </button>
      <button
        type="button"
        className="absolute right-3 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-[#171813]/70 text-white shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-[#b98b24] hover:text-[#171813] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        onClick={showNext}
        aria-label="Show next project image"
      >
        <FiChevronRight aria-hidden />
      </button>

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[#171813]/70 px-2.5 py-1.5 backdrop-blur-sm">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={`size-2 rounded-full transition-[width,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              current === index
                ? "w-5 bg-[#e1b54e]"
                : "bg-white/60 hover:bg-white"
            }`}
            onClick={() => goTo(index)}
            aria-label={`Show project image ${index + 1} of ${images.length}`}
            aria-current={current === index ? "true" : undefined}
          />
        ))}
      </div>

      <span className="absolute right-3 top-3 z-10 rounded-full bg-[#171813]/70 px-2.5 py-1 text-[.65rem] font-bold tabular-nums text-white backdrop-blur-sm">
        {current + 1} / {images.length}
      </span>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        Showing image {current + 1} of {images.length}
      </span>
    </div>
  );
}

export const ProjectImageSlider = memo(ProjectImageSliderComponent);
