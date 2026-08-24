import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import IntroPage from "./IntroPage";
import MainLanding from "./MainLanding";

const Index = () => {
  const introRef = useRef<HTMLElement>(null);
  const [introCompleted, setIntroCompleted] = useState(
    () => sessionStorage.getItem("bloom-intro-completed") === "true",
  );

  const getMoleculeScrollTop = useCallback(() => {
    const intro = introRef.current;
    if (!intro) return 0;

    const introTop = intro.getBoundingClientRect().top + window.scrollY;
    return introTop + (intro.scrollHeight - window.innerHeight) * 0.78;
  }, []);

  const enterWebsite = useCallback(() => {
    const moleculeScrollTop = getMoleculeScrollTop();
    window.scrollTo({ top: moleculeScrollTop, behavior: "smooth" });
  }, [getMoleculeScrollTop]);

  useEffect(() => {
    let isClamping = false;

    const keepIntroBehind = () => {
      const moleculeScrollTop = getMoleculeScrollTop();

      if (!introCompleted && window.scrollY >= moleculeScrollTop - 1) {
        sessionStorage.setItem("bloom-intro-completed", "true");
        setIntroCompleted(true);
        return;
      }

      if (introCompleted && window.scrollY < moleculeScrollTop - 1 && !isClamping) {
        isClamping = true;
        window.scrollTo({ top: moleculeScrollTop, behavior: "auto" });
        requestAnimationFrame(() => { isClamping = false; });
      }
    };

    const frame = requestAnimationFrame(keepIntroBehind);
    window.addEventListener("scroll", keepIntroBehind, { passive: true });
    window.addEventListener("resize", keepIntroBehind);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", keepIntroBehind);
      window.removeEventListener("resize", keepIntroBehind);
    };
  }, [getMoleculeScrollTop, introCompleted]);

  return (
    <main className="bg-background">
      <IntroPage sectionRef={introRef} onLogoClick={enterWebsite} />
      <Navbar introRef={introRef} />
      <MainLanding />
    </main>
  );
};

export default Index;
