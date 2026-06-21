import { Preloader } from "@/components/layout/Preloader";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { StagesFeature } from "@/components/sections/StagesFeature";
import { Formation } from "@/components/sections/Formation";
import { Projects } from "@/components/sections/Projects";
import { Gallery } from "@/components/sections/Gallery";
import { Timeline } from "@/components/sections/Timeline";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <StagesFeature />
      <Formation />
      <Projects />
      <Gallery />
      <Timeline />
      <Contact />
    </>
  );
}
