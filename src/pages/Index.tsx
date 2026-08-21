import { useRef } from "react";
import Navbar from "@/components/Navbar";
import IntroPage from "./IntroPage";
import MainLanding from "./MainLanding";

const Index = () => {
  const introRef = useRef<HTMLElement>(null);

  return (
    <main className="bg-background">
      <IntroPage sectionRef={introRef} />
      <Navbar introRef={introRef} />
      <MainLanding />
    </main>
  );
};

export default Index;
