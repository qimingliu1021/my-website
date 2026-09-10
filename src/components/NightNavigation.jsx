"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NightSky } from "./TransitionAtmosphere";

const NavigationContext = createContext(null);

export function NightNavigationProvider({ children }) {
  const [destination, setDestination] = useState(null);
  const origin = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (destination && pathname !== origin.current) setDestination(null);
  }, [pathname, destination]);
  const navigate = (href) => {
    if (destination || href === pathname) return;
    origin.current = pathname;
    router.prefetch(href);
    setDestination(href);
  };
  return (
    <NavigationContext.Provider value={navigate}>
      {children}
      <AnimatePresence>
        {destination && <motion.div
          key="night-navigation"
          aria-hidden="true"
          data-night-navigation
          className="pointer-events-none fixed inset-0 z-[100] overflow-hidden bg-[#10172d]"
          initial={{ clipPath: reduced ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)", opacity: reduced ? 0 : 1 }}
          animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.2 : 0.85, ease: [0.45, 0, 0.2, 1] }}
          onAnimationComplete={() => { if (pathname === origin.current) router.push(destination); }}
        ><NightSky /></motion.div>}
      </AnimatePresence>
    </NavigationContext.Provider>
  );
}

export function NightLink({ href, onClick, ...props }) {
  const navigate = useContext(NavigationContext);
  return <Link {...props} href={href} onClick={(event) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !navigate) return;
    event.preventDefault();
    // Keep the source sky open while the full-screen sky extends over it.
    navigate(href);
  }} />;
}
