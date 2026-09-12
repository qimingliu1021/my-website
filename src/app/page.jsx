import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import ProjectList from "@/components/ProjectList";
import Link from "next/link";

export default function Home() {
  const bgColor = "#8DA6D2";
  const fgColor = "#ffffff";
  return (
    <main style={{ backgroundColor: bgColor, color: fgColor }}>
      <Container className="mt-24 sm:mt-32 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column - Your intro text */}
          <FadeIn className="max-w-3xl">
            <h1
              className="font-display text-5xl font-medium tracking-tight [text-wrap:balance] sm:text-7xl"
              style={{ color: fgColor }}
            >
              A developer dreaming of being an artist
            </h1>
            <p className="mt-6 text-xl" style={{ color: fgColor }}>
              I am the developer of{" "}
              <Link
                href="https://naviya.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-opacity hover:opacity-80"
                style={{ color: fgColor }}
              >
Naviya
              </Link>
              , a travel planner that maps real local happenings to a trip itinerary. 
            </p>
            <p className="mt-6 text-xl" style={{ color: fgColor }}>
              I participated in 3 startup projects, Pomu - help fashion brands
              find manufactures, gotton into LvlUp Ventures and NYU startup
              bootcamp and Innovention at Tandon Future Lab. During the process
              working with fashion brands, I participated with photo shooting,
              marketing and website design. After Pomu, I worked as developer at
              stewardsAI, built a bus express route recommendation system.
            </p>
          </FadeIn>

          {/* Right column - Recent updates */}
          <ProjectList className="lg:sticky lg:top-24" />
        </div>
      </Container>
    </main>
  );
}
