"use client";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
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
  showControls = true,
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

        {showControls && <div className="flex items-center gap-x-4" style={{ "--qiming-button-hover": "transparent" }}>
          <Button onClick={onToggle} invert={invert && !night} className="hidden h-9 items-center justify-center sm:inline-flex [&>span]:flex [&>span]:items-center [&>span]:justify-center" aria-expanded={expanded} aria-controls={panelId}>
            <span className="inline-flex items-center justify-center gap-2 leading-none"><DestinyWheel turning={expanded} small /> Articles</span>
          </Button>
          <button
            ref={toggleRef}
            type="button"
            onClick={onToggle}
            aria-expanded={expanded.toString()}
            aria-controls={panelId}
            className={clsx(
              "-m-2.5 flex items-center justify-center rounded-full p-2.5 transition-colors duration-200",
              invert && !night ? "qiming-btn-on-yellow" : "qiming-btn-on-blue"
            )}
            aria-label="Toggle navigation"
          >
            <Icon className="h-6 w-6" />
          </button>
        </div>}
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
      className="mx-auto mb-6 flex flex-col items-center gap-2 rounded-full px-6 py-3 text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F9D77C]"
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">cities and stories</span>
      <motion.span
        animate={{ y: reduceMotion || disabled ? 0 : [0, 5, 0] }}
        transition={{ duration: 1.8, repeat: reduceMotion || disabled ? 0 : Infinity, ease: "easeInOut" }}
      >
        <DestinyWheel turning={disabled} arrow="↓" />
      </motion.span>
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

  const changeView = useCallback((nextView) => {
    if (transitioning) return;
    hasTransitioned.current = true;
    if (nextView === "cities") citiesRef.current?.scrollTo({ top: 0, behavior: "instant" });
    setTransitioning(true);
    setView(nextView);
  }, [transitioning]);

  useEffect(() => {
    const scroller = view === "intro" ? introRef.current : citiesRef.current;
    if (!isHome || !scroller || transitioning || expanded) return;

    const direction = view === "intro" ? 1 : -1;
    const atBoundary = () => direction === 1
      ? scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2
      : scroller.scrollTop <= 2;
    const nestedCanScroll = (target) => {
      for (let element = target; element && element !== scroller; element = element.parentElement) {
        if (/(auto|scroll)/.test(getComputedStyle(element).overflowY) &&
          (direction === 1 ? element.scrollTop + element.clientHeight < element.scrollHeight - 2 : element.scrollTop > 2)) return true;
      }
      return false;
    };
    let entered = false;
    const switchView = () => {
      if (entered) return;
      entered = true;
      changeView(view === "intro" ? "cities" : "intro");
    };
    let lastWheel = performance.now();
    let wheelStartedAtBoundary = false;
    let wheelDistance = 0;
    const onWheel = (event) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const now = performance.now();
      // Reaching either boundary does not switch pages until a fresh gesture.
      if (now - lastWheel > 180) {
        wheelStartedAtBoundary = atBoundary() && !nestedCanScroll(event.target);
        wheelDistance = 0;
      }
      lastWheel = now;
      if (event.deltaY * direction <= 0 || !atBoundary() || nestedCanScroll(event.target)) {
        wheelStartedAtBoundary = false;
        return;
      }
      wheelDistance += event.deltaY * direction * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? scroller.clientHeight : 1);
      if (wheelStartedAtBoundary && wheelDistance >= 48) switchView();
    };
    let touchStart = null;
    const onTouchStart = (event) => {
      touchStart = event.touches.length === 1 && atBoundary() && !nestedCanScroll(event.target)
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
    };
    const onTouchMove = (event) => {
      if (!touchStart || event.touches.length !== 1) {
        touchStart = null;
        return;
      }
      const distance = (touchStart.y - event.touches[0].clientY) * direction;
      if (atBoundary() && distance >= 48 && distance > Math.abs(touchStart.x - event.touches[0].clientX)) switchView();
    };
    scroller.addEventListener("wheel", onWheel, { passive: true });
    scroller.addEventListener("touchstart", onTouchStart, { passive: true });
    scroller.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("touchstart", onTouchStart);
      scroller.removeEventListener("touchmove", onTouchMove);
    };
  }, [isHome, view, transitioning, expanded, changeView]);

  const finishTransition = () => {
    if (!transitioning) return;
    setTransitioning(false);
  };

  const navigation = (
      <header>
        <div className="absolute left-0 right-0 top-2 z-40 pt-8 sm:pt-14" aria-hidden={expanded || undefined} inert={expanded ? "" : undefined}>
          <Header panelId={panelId} icon={HiMenuAlt4} toggleRef={openRef} expanded={expanded} onToggle={toggleMenu} showControls={!isBlog} />
        </div>
        {!isBlog && <motion.div
          id={panelId}
          initial={false}
          animate={{ height: expanded ? "auto" : 0 }}
          transition={{ duration: shouldReduceMotion ? 0.55 : 1.35, ease: [0.35, 0, 0.2, 1] }}
          className="relative z-50 overflow-hidden bg-[#10172d] text-[#f6efd9]"
          style={{ perspective: 1200, overflowAnchor: "none" }}
          aria-hidden={!expanded || undefined}
          inert={expanded ? undefined : ""}
        >
          {/* This content-sized scene stays mounted. Only the outer cover moves. */}
          <div className="relative" data-article-sky>
            <NightSky />
            <div className="relative z-10">
          <div className="pb-6 pt-10 sm:pt-16">
            <Header invert night panelId={panelId} icon={IoMdClose} toggleRef={closeRef} expanded={expanded} onToggle={() => {
              setExpanded(false);
              openRef.current?.focus({ preventScroll: true });
            }} />
          </div>
          <Container className="pt-4">
            <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-white/20 pb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#efd7a5]">Notes along the way</p>
            </div>
            <ArticleList night />
          </Container>
            </div>
          </div>
        </motion.div>}
      </header>
  );

  const intro = (
    <>
      {navigation}
      <div data-card-surround style={{ background: "linear-gradient(to bottom, #10172d 0 96px, #F9D77C 96px 100%)" }}>
      <motion.div data-home-card className="relative flex min-h-[calc(100dvh-1.5rem)] flex-col overflow-hidden rounded-b-[clamp(48px,6vw,96px)] bg-[#8DA6D2] pt-14 sm:min-h-[calc(100dvh-2rem)]" initial={false} animate={{ borderTopLeftRadius: expanded ? 96 : 0, borderTopRightRadius: expanded ? 96 : 0 }} transition={{ duration: shouldReduceMotion ? 0.55 : 1.35 }}>
        <div className="relative isolate w-full flex-auto pt-9">{children}</div>
        {isHome && <ScrollHint onClick={() => changeView("cities")} disabled={transitioning} buttonRef={enterRef} />}
      </motion.div>
      </div>
      {/* Only a slim strip of the Cities color peeks below the home card. */}
      <div aria-hidden="true" data-cities-preview className="h-6 shrink-0 bg-[#F9D77C] sm:h-8" />
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
      <div className="fixed inset-0 overflow-hidden bg-[#F9D77C]" style={{ perspective: 1600 }} data-home-view={view} data-transitioning={transitioning}>
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
            className="absolute inset-0 overflow-y-auto overscroll-none bg-[#F9D77C] focus:outline-none"
            style={{ scrollbarGutter: "stable", pointerEvents: transitioning ? "none" : undefined }}
          >{intro}</div>
          <div
            ref={citiesRef}
            data-scroll-view="cities"
            tabIndex={view === "cities" ? 0 : -1}
            aria-label="Cities"
            aria-hidden={view !== "cities" || undefined}
            inert={view !== "cities" ? "" : undefined}
            className="absolute inset-x-0 top-full h-full overflow-y-auto overscroll-none bg-[#F9D77C] text-[#2C2F3B] focus:outline-none"
            style={{ scrollbarGutter: "stable", pointerEvents: transitioning ? "none" : undefined }}
          >
            <div className="sticky top-0 z-20 border-b border-[#2C2F3B]/15 bg-[#F9D77C]/95 px-6 py-4 backdrop-blur-sm sm:px-10">
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
