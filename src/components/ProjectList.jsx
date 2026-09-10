"use client";

import Image from "next/image";
import clsx from "clsx";
import { useState, useEffect } from "react";
import FadeIn from "./FadeIn";
import { useReducedMotion } from "framer-motion";
import pomu1 from "../images/projects/pomu-1.jpg";
import pomu2 from "../images/projects/pomu-2.jpg";
import pomu3 from "../images/projects/pomu-3.jpg";
import stewards1 from "../images/projects/stewards-1.jpg";
import stewards2 from "../images/projects/stewards-2.jpg";
import stewards3 from "../images/projects/stewards-3.jpg";
import stewards4 from "../images/projects/stewards-4.jpg";
import momeChoix1 from "../images/projects/mome-1.jpg";
import momeChoix2 from "../images/projects/mome-2.jpg";

// Image carousel component
const ImageCarousel = ({ images, alt, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (reduceMotion || images.length < 2) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length, reduceMotion]);

  return (
    <div className={clsx("relative overflow-hidden", className)}>
      {images.map((image, index) => (
        <div
          key={image.src}
          aria-hidden={index !== currentIndex}
          className={clsx(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={image}
            alt={`${alt} ${index + 1}`}
            fill
            sizes="(min-width: 1024px) 480px, (min-width: 640px) 600px, 90vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ))}

      {/* Dots indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {images.map((_, index) => (
          <div
            key={index}
            className={clsx(
              "w-2 h-2 rounded-full transition-colors",
              index === currentIndex ? "bg-white" : "bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
};

// Your actual projects with image carousels
const projects = [
  {
    id: 1,
    title: "Pomu",
    description:
      "Platform helping fashion brands find manufacturers. Participated in LvlUp Ventures, NYU startup bootcamp, and Innovention at Tandon Future Lab.",
    images: [pomu1, pomu2, pomu3],
    link: "https://pomu.io/",
    tags: ["Fashion Tech", "Manufacturing", "B2B Platform"],
    achievements: [
      { name: "LvlUp Ventures", link: "https://www.lvlup.vc/" },
      {
        name: "NYU Startup Bootcamp",
        link: "https://entrepreneur.nyu.edu/resource/bootcamps/",
      },
      {
        name: "Innovention",
        link: "https://engineering.nyu.edu/research-innovation/entrepreneurship/innovention",
      },
    ],
  },
  {
    id: 2,
    title: "StewardsAI",
    description:
      "Built a bus express route recommendation system as a developer. AI-powered transportation optimization focusing on intelligent route planning.",
    images: [stewards1, stewards2, stewards3, stewards4],
    link: "https://www.stewards.ai/",
    tags: ["AI", "Transportation", "Route Optimization", "Urban Planning"],
  },
  {
    id: 3,
    title: "Môme Choix",
    description:
      "Premier baby and kids clothing brand dedicated to high-quality products that combine comfort, sustainability, and style.",
    images: [momeChoix1, momeChoix2],
    link: "https://momechoix.vercel.app/",
    tags: ["Fashion", "E-commerce", "Sustainability", "Baby & Kids"],
  },
];

const ProjectCard = ({ project, className }) => {
  return (
    <div
      className={clsx(
        "group relative border-b border-white/10 pb-8 last:border-0",
        className
      )}
    >
      {/* Replace single image with carousel */}
      <ImageCarousel
        images={project.images}
        alt={project.title}
        className="aspect-[16/9] mb-5 rounded-2xl bg-white/5"
      />

      <div className="space-y-3">
        <h3 className="font-display text-2xl font-medium text-white">
          {project.title}
        </h3>

        <p className="text-sm leading-relaxed text-white/65">
          {project.description}
        </p>

        {/* Achievement badges for special projects */}
        {project.achievements && (
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/45">
              Achievements:
            </p>
            <div className="flex flex-wrap gap-1">
              {project.achievements.map((achievement) => (
                <a
                  key={achievement.name}
                  href={achievement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-[#FAC03D]/20 bg-[#FAC03D]/5 px-2.5 py-1 text-[10px] text-[#FAC03D] transition-colors hover:bg-[#FAC03D]/15"
                >
                  {achievement.name}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-white/5 px-2.5 py-1 text-[10px] text-white/55"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.link !== "#" && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#FAC03D] transition-colors hover:text-white"
          >
            View Project
            <svg
              className="ml-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

const ProjectList = ({ className }) => {
  return (
    <FadeIn className={clsx("min-w-0 self-start", className)}>
      <section aria-labelledby="updates-heading" className="rounded-[2rem] border-t border-white/10 bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent px-5 pt-6 sm:px-7 sm:pt-7">
        <div className="mb-7">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FAC03D]">Work in motion</p>
          <h2 id="updates-heading" className="font-display text-2xl font-medium text-white">Recent updates</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/55">Things I’ve been building, exploring, and putting into the world.</p>
        </div>
        <div tabIndex={0} role="region" aria-label="Recent updates" className="updates-scroll rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FAC03D] lg:max-h-[70vh] lg:overflow-y-auto">
          <div className="space-y-8 pb-12 lg:pr-3">
            {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        </div>
      </section>
    </FadeIn>
  );
};

export default ProjectList;
