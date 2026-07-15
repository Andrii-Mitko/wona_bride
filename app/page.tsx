import About from "@/components/About/About";
import Contacts from "@/components/Contacts/Contacts";
import Dresses from "@/components/Dresses/Dresses";
import Faq from "@/components/Faq/Faq";
import Feedback from "@/components/Feedback/Feedback";

import Hero from "@/components/Hero/Hero";
import Popular from "@/components/Popular/Popular";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Dresses />
      <Popular />
      <Faq />
      <Feedback />
      <Contacts />
    </>
  );
}
