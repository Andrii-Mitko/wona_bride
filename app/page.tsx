import About from "@/components/About/About";
import Dresses from "@/components/Dresses/Dresses";
import Faq from "@/components/Faq/Faq";
import Feedback from "@/components/Feedback/Feedback";

import Hero from "@/components/Hero/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <Dresses />
      <About />
      <Faq />
      <Feedback />
    </>
  );
}
