"use client";

import { useId } from "react";
import styles from "./TransitionAtmosphere.module.css";

export const SCENE_DURATION = 1.5;

// Deterministic positions keep the server and client markup identical.
const grains = Array.from({ length: 48 }, (_, i) => ({
  left: `${(i * 37) % 110}%`,
  top: `${(i * 23) % 100}%`,
  "--grain-size": `${2 + i % 4}px`,
  "--drift": `${-100 - i % 7 * 30}px`,
  animationDelay: `${i % 8 * 0.025}s`,
}));
const stars = Array.from({ length: 56 }, (_, i) => ({
  left: `${3 + (i * 41) % 94}%`,
  top: `${2 + (i * 29) % 94}%`,
  width: i % 9 === 0 ? 3 : 1.5,
  height: i % 9 === 0 ? 3 : 1.5,
  animationDelay: `${i % 12 * 0.055}s`,
  "--star-opacity": 0.25 + i % 5 * 0.13,
}));

export function TransitionAtmosphere({ scene }) {
  const gradientId = useId();
  return (
    <div aria-hidden="true" data-transition-effect={scene} className={styles.transition} style={{ "--scene-duration": `${SCENE_DURATION}s` }}>
      {scene === "sand" ? <>
        <div className={`${styles.dustCloud} ${styles.dustFar}`} />
        <div className={`${styles.dustCloud} ${styles.dustNear}`} />
        <svg className={styles.wind} viewBox="0 0 1200 800" preserveAspectRatio="none" fill="none">
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d={`M-200 ${110 + i * 55} Q250 ${-10 + i * 54} 610 ${160 + i * 48} T1450 ${70 + i * 52}`} stroke={i % 2 ? "#fff1c4" : "#aa733b"} strokeWidth={i % 3 + 1} opacity=".3" />
          ))}
        </svg>
        {grains.map((style, i) => <span key={i} className={styles.grain} style={style} />)}
      </> : <>
        <svg className={`${styles.water} ${styles.waterBehind}`} viewBox="0 0 1200 1200" preserveAspectRatio="none" fill="none">
          <path d="M-100 130Q150 260 400 130T850 130T1300 130V1300H-100Z" fill="#cf9329" />
        </svg>
        <svg className={styles.water} viewBox="0 0 1200 1200" preserveAspectRatio="none" fill="none">
          <defs>
            <linearGradient id={gradientId} x1="200" y1="0" x2="850" y2="1100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff3c6" />
              <stop offset=".22" stopColor="#f9d168" />
              <stop offset=".65" stopColor="#e4a72d" />
              <stop offset="1" stopColor="#ba7e1b" />
            </linearGradient>
          </defs>
          <path d="M-100 150C140 -40 270 290 530 140S950 20 1300 160V1300H-100Z" fill={`url(#${gradientId})`} />
          <path d="M-100 150C140 -40 270 290 530 140S950 20 1300 160" stroke="#fff5d4" strokeWidth="5" opacity=".8" />
          {[0, 1, 2, 3, 4].map(i => <path key={i} d={`M-100 ${280 + i * 140}Q180 ${170 + i * 140} 480 ${300 + i * 140}T1300 ${230 + i * 140}`} stroke="#fff0b1" strokeWidth={i % 2 ? 2 : 4} opacity=".3" />)}
          <g fill="#fff9dc" opacity=".7">
            <ellipse cx="210" cy="130" rx="15" ry="4" /><ellipse cx="685" cy="78" rx="24" ry="3" /><ellipse cx="940" cy="112" rx="12" ry="3" />
          </g>
        </svg>
      </>}
    </div>
  );
}

export function NightSky() {
  return (
    <div aria-hidden="true" data-night-sky className={styles.nightSky}>
      <div className={styles.skyGlow} />
      <div className={styles.skyHint}>
        {[8, 23, 38, 54, 69, 84, 94].map((left, i) => <span key={left} style={{ left: `${left}%`, top: 7 + i % 3 * 4, opacity: .35 + i % 3 * .2 }} />)}
      </div>
      {stars.map((style, i) => <span key={i} className={styles.star} style={style} />)}
      <svg className={styles.constellation} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" fill="none">
        <g stroke="#c8d7f8" strokeWidth=".8" opacity=".3"><path d="M820 105L915 155L975 95L1060 190L1120 140M75 540L140 610L220 580L265 700" /></g>
        <g fill="#f8e3ad" opacity=".65">{[[820,105],[915,155],[975,95],[1060,190],[1120,140],[75,540],[140,610],[220,580],[265,700]].map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.5" />)}</g>
      </svg>
      <span className={styles.moon} />
    </div>
  );
}
