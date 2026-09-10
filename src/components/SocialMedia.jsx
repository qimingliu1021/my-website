"use client";

import clsx from "clsx";
import { useEffect, useId, useRef, useState } from "react";
import { BsLinkedin, BsEnvelope, BsCheck2 } from "react-icons/bs";

const EMAIL = "qiming1021@outlook.com";

function copyWithSelection() {
  // Clipboard API access can be unavailable in embedded or unfocused browsers.
  const previousFocus = document.activeElement;
  const selection = window.getSelection();
  const ranges = selection ? Array.from({ length: selection.rangeCount }, (_, i) => selection.getRangeAt(i).cloneRange()) : [];
  const field = document.createElement("textarea");
  field.value = EMAIL;
  field.readOnly = true;
  field.style.cssText = "position:fixed;top:0;left:-9999px;opacity:0";
  document.body.appendChild(field);
  try {
    field.focus({ preventScroll: true });
    field.select();
    if (!document.execCommand("copy")) throw new Error("Copy was not available");
  } finally {
    field.remove();
    selection?.removeAllRanges();
    ranges.forEach((range) => selection?.addRange(range));
    previousFocus?.focus({ preventScroll: true });
  }
}
function XIcon(props) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...props}><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.9-9L.8 2h6.5l4.5 6.7L18.9 2Zm-1.1 18h1.7L6.4 3.9H4.6L17.8 20Z" /></svg>;
}
export const SocialMediaProfiles = [
  { title: "X", href: "https://x.com/Qiming685481", icon: XIcon },
  { title: "LinkedIn", href: "https://www.linkedin.com/in/qimingliu1382/", icon: BsLinkedin },
];

export default function SocialMedia({ className, invert = false }) {
  const [status, setStatus] = useState("");
  const timer = useRef(null);
  const tooltipId = useId();
  useEffect(() => () => clearTimeout(timer.current), []);
  const copyEmail = async () => {
    clearTimeout(timer.current);
    try {
      try {
        await navigator.clipboard.writeText(EMAIL);
      } catch {
        copyWithSelection();
      }
      setStatus("Successfully copied!");
    } catch {
      setStatus("Couldn’t copy. Select the address to copy it.");
    }
    timer.current = setTimeout(() => setStatus(""), 4000);
  };
  return (
    <ul role="list" className={clsx("flex items-center gap-x-10", invert ? "text-white" : "text-neutral-950", className)}>
      {SocialMediaProfiles.map(({ title, href, icon: Icon }) => <li key={title}>
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={title} className="inline-flex rounded p-1 transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
          <Icon className="h-5 w-5 fill-current" />
        </a>
      </li>)}
      <li className="group relative">
        <button type="button" onClick={copyEmail} aria-label={`Copy email address ${EMAIL}`} aria-describedby={tooltipId} className="inline-flex rounded p-1 transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
          {status === "Successfully copied!" ? <BsCheck2 className="h-5 w-5" /> : <BsEnvelope className="h-5 w-5" />}
        </button>
        <div id={tooltipId} role="tooltip" className={clsx("absolute left-1/2 top-full z-[60] w-max max-w-[240px] -translate-x-1/2 pt-3 text-center text-xs transition-opacity", status ? "visible opacity-100" : "invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100")}>
          <div className="rounded-xl border border-white/15 bg-[#10172d] px-4 py-3 text-[#f6efd9] shadow-lg">
            <span className="select-text">{EMAIL}</span>
            <span className="mt-1 block text-[#FAC03D]">{status || "Click to copy"}</span>
          </div>
        </div>
        <span role="status" aria-live="polite" className="sr-only">{status}</span>
      </li>
    </ul>
  );
}
