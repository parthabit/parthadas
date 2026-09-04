import SEO from "../components/SEO";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import ProjectsSection from "../components/ProjectsSection";
import GithubSection from "../components/GithubSection";
import EducationSection from "../components/EducationSection";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <SEO path="/" />
      <Hero />
      <About />
      <Skills />
      <ProjectsSection />
      <GithubSection />
      <EducationSection />
      <Contact />
    </>
  );
}
