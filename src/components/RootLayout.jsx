"use client";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import CitiesPage from "./CitiesPage";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import Qiming from "../images/qiming-white.svg";
import QimingBlack from "../images/qiming-black.svg";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";
import clsx from "clsx";
import SocialMedia from "./SocialMedia";
import ArticleList from "./ArticleList";
import { NightNavigationProvider } from "./NightNavigation";
import { NightSky, SCENE_DURATION, TransitionAtmosphere } from "./TransitionAtmosphere";

// Navigation always has a visible slide; reduced motion uses a shorter,
// straight transition while decorative effects remain disabled.
const slideTransition = {
  duration: SCENE_DURATION,
  ease: [0.45, 0, 0.2, 1],
};
const viewSlide = {
  intro: { y: "0%" },
  cities: { y: "-100%" },
};

function DestinyWheel({ turning, direction = 1, arrow, small = false }) {
  const reduceMotion = useReducedMotion();
  return (
    <span aria-hidden="true" className={clsx("relative inline-flex shrink-0 items-center justify-center", small ? "h-4 w-4" : "h-11 w-11")}>
      <motion.svg
        viewBox="0 0 40 40"
        className="absolute inset-0 h-full w-full"
        style={{ fill: "none" }}
        initial={false}
        animate={{ rotate: reduceMotion ? 0 : turning ? 270 * direction : 0 }}
        transition={{ duration: reduceMotion ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.45" />
        <circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="1 9.21" strokeLinecap="round" />
        {!arrow && <path d="M20 10V30M10 20H30M13 13L27 27M27 13L13 27" fill="none" stroke="currentColor" strokeWidth="1.5" />}
      </motion.svg>
      {arrow && <span className="text-xl leading-none">{arrow}</span>}
    </span>
  );
}

const Header = ({
  panelId,
  invert = false,
  night = false,
  icon: Icon,
  expanded,
  onToggle,
  toggleRef,
}) => {
  // Container
  return (
    <Container>
      <div className="grid grid-cols-[1fr_auto] items-center gap-y-2 sm:flex sm:justify-between">
        <Link href={"/"} aria-label="Home">
          <Image
            src={invert && !night ? QimingBlack : Qiming}
            alt="Qiming Logo"
            width={120}
            height={40}
          />
        </Link>

        {night && <div className="order-last col-span-2 sm:order-none sm:border-l sm:border-transparent sm:pl-16">
          <h2
            className="font-display text-base font-semibold"
            style={{ color: invert && !night ? "#000000" : undefined }}
          >
            Stay in touch
          </h2>
          <SocialMedia className="mt-4 gap-x-6 sm:mt-6 sm:gap-x-10" invert={!invert || night} />
        </div>}

        <div className="flex items-center gap-x-4">
          <Button onClick={onToggle} invert={invert && !night} className="hidden items-center gap-2 sm:inline-flex" aria-expanded={expanded} aria-controls={panelId}>
            <span className="inline-flex items-center gap-2"><DestinyWheel turning={expanded} small /> Articles</span>
          </Button>
          <button
            ref={toggleRef}
            type="button"
            onClick={onToggle}
            aria-expanded={expanded.toString()}
            aria-controls={panelId}
            className={clsx(
              "-m-2.5 rounded-full p-2.5 transition-colors duration-200",
              invert && !night ? "qiming-btn-on-yellow" : "qiming-btn-on-blue"
            )}
            aria-label="Toggle navigation"
          >
            <Icon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </Container>
  );
};

const ScrollHint = ({ onClick, disabled, buttonRef }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      whileTap={reduceMotion ? undefined : { scale: 0.95 }}
      aria-label="Enter Cities"
      className="mx-auto mb-6 flex flex-col items-center gap-2 rounded-full px-6 py-3 text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FAC03D]"
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">The places that shaped me</span>
      <DestinyWheel turning={disabled} arrow="↓" />
    </motion.button>
  );
};

const RootLayoutInner = ({ children, isHome, isBlog }) => {
  const panelId = useId();
  const [expanded, setExpanded] = useState(false);
  const [view, setView] = useState("intro");
  const [transitioning, setTransitioning] = useState(false);
  const introRef = useRef(null);
  const citiesRef = useRef(null);
  const openRef = useRef(null);
  const closeRef = useRef(null);
  const enterRef = useRef(null);
  const backRef = useRef(null);
  const hasTransitioned = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isHome) return;
    let frame;
    const revealWriting = () => {
      if (window.location.hash !== "#articles") return;
      frame = requestAnimationFrame(() => {
        introRef.current?.scrollTo({ top: 0, behavior: "instant" });
        setExpanded(true);
      });
    };
    revealWriting();
    window.addEventListener("hashchange", revealWriting);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", revealWriting);
    };
  }, [isHome]);

  const toggleMenu = () => {
    setExpanded(!expanded);
    if (!expanded) {
      if (isHome) introRef.current?.scrollTo({ top: 0, behavior: shouldReduceMotion ? "instant" : "smooth" });
      else window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "instant" : "smooth" });
    }
  };

  useEffect(() => {
    if (expanded) closeRef.current?.focus({ preventScroll: true });
  }, [expanded]);

  useEffect(() => {
    // Wait for React to enable the destination arrow before focusing it.
    if (hasTransitioned.current && !transitioning) {
      (view === "cities" ? backRef : enterRef).current?.focus({ preventScroll: true });
    }
  }, [view, transitioning]);

  const changeView = (nextView) => {
    if (transitioning) return;
    hasTransitioned.current = true;
    if (nextView === "cities") citiesRef.current?.scrollTo({ top: 0, behavior: "instant" });
    setTransitioning(true);
    setView(nextView);
  };

  const finishTransition = () => {
    if (!transitioning) return;
    setTransitioning(false);
  };

  const navigation = (
      <header>
        <div className="absolute left-0 right-0 top-2 z-40 pt-8 sm:pt-14" aria-hidden={expanded || undefined} inert={expanded ? "" : undefined}>
          <Header panelId={panelId} icon={HiMenuAlt4} toggleRef={openRef} expanded={expanded} onToggle={toggleMenu} />
        </div>
        <motion.div
          id={panelId}
          initial={false}
          animate={{ height: expanded ? "auto" : 24 }}
          transition={{ duration: shouldReduceMotion ? 0.55 : 1.35, ease: [0.35, 0, 0.2, 1] }}
          className="relative z-50 overflow-hidden bg-[#10172d] text-[#f6efd9]"
          style={{ perspective: 1200, overflowAnchor: "none" }}
          aria-hidden={!expanded || undefined}
          inert={expanded ? undefined : ""}
        >
          {/* This full-height scene stays mounted. Only the outer cover moves. */}
          <div className="relative min-h-[100svh]" data-article-sky>
            <NightSky />
            <div className="relative z-10">
          <div className="pb-6 pt-10 sm:pt-16">
            <Header invert night panelId={panelId} icon={IoMdClose} toggleRef={closeRef} expanded={expanded} onToggle={() => {
              setExpanded(false);
              openRef.current?.focus({ preventScroll: true });
            }} />
          </div>
          <Container className="pb-10 pt-4">
            <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-white/20 pb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#efd7a5]">Notes along the way</p>
            </div>
            <ArticleList night />
          </Container>
            </div>
          </div>
        </motion.div>
      </header>
  );

  const intro = (
    <>
      {navigation}
      <motion.div className="relative flex min-h-[calc(100dvh-3.5rem)] flex-col overflow-hidden rounded-b-[40px] bg-[#2C2F3B] pt-14" initial={false} animate={{ borderTopLeftRadius: expanded ? 40 : 0, borderTopRightRadius: expanded ? 40 : 0 }} transition={{ duration: shouldReduceMotion ? 0.55 : 1.35 }}>
        <div className="relative isolate w-full flex-auto pt-9">{children}</div>
        {isHome && <ScrollHint onClick={() => changeView("cities")} disabled={transitioning} buttonRef={enterRef} />}
      </motion.div>
      {/* This is the only content below the intro: a small yellow reveal. */}
      <div aria-hidden="true" className="h-12 shrink-0 bg-[#FAC03D]" />
    </>
  );

  if (isBlog) return (
    <MotionConfig reducedMotion="never">
      <div className="relative isolate min-h-screen bg-[#10172d] text-[#f6efd9]">
        <div className="pointer-events-none fixed inset-0 -z-10"><NightSky /></div>
        {navigation}
        <motion.div className="relative z-10 pt-24" data-night-reading initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: shouldReduceMotion ? 0.15 : 0.7, duration: shouldReduceMotion ? 0.25 : 0.8 }}>
          {children}
        </motion.div>
      </div>
    </MotionConfig>
  );

  if (!isHome) return (
    <MotionConfig reducedMotion="never">
      <motion.div className="relative" initial={{ opacity: 0, y: shouldReduceMotion ? 12 : 48 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: shouldReduceMotion ? 0.35 : 0.7, ease: [0.22, 1, 0.36, 1] }}>
        {intro}
      </motion.div>
    </MotionConfig>
  );

  return (
    <MotionConfig reducedMotion="never">
      <div className="fixed inset-0 overflow-hidden bg-[#FAC03D]" style={{ perspective: 1600 }} data-home-view={view} data-transitioning={transitioning}>
        <motion.div
          className="relative h-full w-full"
          initial={false}
          animate={view}
          variants={viewSlide}
          transition={shouldReduceMotion ? { duration: 0.55, ease: "easeInOut" } : slideTransition}
          onAnimationComplete={finishTransition}
        >
          <div
            ref={introRef}
            data-scroll-view="intro"
            tabIndex={view === "intro" ? 0 : -1}
            aria-label="Home"
            aria-hidden={view !== "intro" || undefined}
            inert={view !== "intro" ? "" : undefined}
            className="absolute inset-0 overflow-y-auto overscroll-none bg-[#10172d] focus:outline-none"
            style={{ scrollbarGutter: "stable", pointerEvents: transitioning ? "none" : undefined }}
          >{intro}</div>
          <div
            ref={citiesRef}
            data-scroll-view="cities"
            tabIndex={view === "cities" ? 0 : -1}
            aria-label="Cities"
            aria-hidden={view !== "cities" || undefined}
            inert={view !== "cities" ? "" : undefined}
            className="absolute inset-x-0 top-full h-full overflow-y-auto overscroll-none bg-[#FAC03D] text-[#2C2F3B] focus:outline-none"
            style={{ scrollbarGutter: "stable", pointerEvents: transitioning ? "none" : undefined }}
          >
            <div className="sticky top-0 z-20 border-b border-[#2C2F3B]/15 bg-[#FAC03D]/95 px-6 py-4 backdrop-blur-sm sm:px-10">
              <motion.button ref={backRef} type="button" onClick={() => changeView("intro")} disabled={transitioning} whileHover={shouldReduceMotion ? undefined : { y: -2 }} whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }} className="mx-auto flex items-center gap-3 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C2F3B]" aria-label="Back to home">
                <DestinyWheel turning={transitioning} direction={-1} arrow="↑" /> Back to home
              </motion.button>
            </div>
            <CitiesPage />
          </div>
        </motion.div>
        {transitioning && !shouldReduceMotion && <TransitionAtmosphere key={view} scene={view === "cities" ? "sand" : "water"} />}
      </div>
    </MotionConfig>
  );
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return <NightNavigationProvider><RootLayoutInner key={pathname} isHome={pathname === "/"} isBlog={pathname.startsWith("/blog")}>{children}</RootLayoutInner></NightNavigationProvider>;
}
