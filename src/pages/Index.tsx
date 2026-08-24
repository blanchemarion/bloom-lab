import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import Navbar from "@/components/Navbar";
import IntroPage from "./IntroPage";
import MainLanding from "./MainLanding";

const Index = () => {
  const introRef = useRef<HTMLElement>(null);
  const introCompleted = useRef(false);
  const clampTop = useRef(0);
  const scrollFrame = useRef(0);
  const { scrollYProgress } = useScroll({ target: introRef, offset: ["start start", "end end"] });

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

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
    const measure = () => { clampTop.current = getMoleculeScrollTop(); };
    const keepIntroBehind = () => {
      const moleculeScrollTop = clampTop.current;
      if (!introCompleted.current && window.scrollY >= moleculeScrollTop - 1) {
        introCompleted.current = true;
        return;
      }
      if (introCompleted.current && window.scrollY < moleculeScrollTop - 1 && !isClamping) {
        isClamping = true;
        window.scrollTo({ top: moleculeScrollTop, behavior: "auto" });
        requestAnimationFrame(() => { isClamping = false; });
      }
    };
    const onScroll = () => {
      if (scrollFrame.current) return;
      scrollFrame.current = requestAnimationFrame(() => {
        scrollFrame.current = 0;
        keepIntroBehind();
      });
    };
    const onResize = () => { measure(); onScroll(); };
    measure();
    const frame = requestAnimationFrame(keepIntroBehind);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scrollFrame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [getMoleculeScrollTop]);

  return (
    <main className="bg-background">
      <IntroPage sectionRef={introRef} onLogoClick={enterWebsite} scrollYProgress={scrollYProgress} />
      <Navbar introRef={introRef} scrollYProgress={scrollYProgress} />
      <MainLanding />
    </main>
  );
};

export default Index;
