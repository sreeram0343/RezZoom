import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { SocialProof } from "@/components/landing/SocialProof";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { Features } from "@/components/landing/Features";
import { DemoPreview } from "@/components/landing/DemoPreview";
import { TemplatesGallery } from "@/components/landing/TemplatesGallery";
import { ResumeExamples } from "@/components/landing/ResumeExamples";
import { Testimonials } from "@/components/landing/Testimonials";
import { FooterCTA } from "@/components/landing/FooterCTA";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <SocialProof />
        <ProblemSolution />
        <Features />
        <DemoPreview />
        <TemplatesGallery />
        <ResumeExamples />
        <Testimonials />
      </main>
      <FooterCTA />
    </div>
  );
}
