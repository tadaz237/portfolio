import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Timeline } from "@/components/sections/timeline";
import { Projects } from "@/components/sections/projects";
import { Process } from "@/components/sections/process";
import { Stats } from "@/components/sections/stats";
import { Experience } from "@/components/sections/experience";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Timeline />
      <Projects />
      <Process />
      <Stats />
      <Experience />
      <Testimonials />
      <Contact />
    </>
  );
}
