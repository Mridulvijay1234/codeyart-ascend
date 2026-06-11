import { createFileRoute } from "@tanstack/react-router";
import { useLenis } from "@/hooks/use-lenis";
import {
  Navbar, Hero, Stats, Services, AISection, CaseStudies,
  Industries, Process, Testimonials, TechStack, GlobalImpact,
  Contact, Footer,
} from "@/components/site/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zyvera — Transforming Businesses Through Technology" },
      { name: "description", content: "Zyvera builds software, websites, AI solutions, and digital growth systems for ambitious companies. A global technology and transformation studio." },
      { property: "og:title", content: "Zyvera — Build the Future" },
      { property: "og:description", content: "Web, software, AI, marketing, automation, branding. A billion-dollar-grade studio for the next generation of business." },
    ],
  }),
  component: Home,
});

function Home() {
  useLenis();
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <AISection />
      <CaseStudies />
      <Industries />
      <Process />
      <Testimonials />
      <TechStack />
      <GlobalImpact />
      <Contact />
      <Footer />
    </main>
  );
}
