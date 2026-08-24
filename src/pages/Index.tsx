import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";
import Navbar from "@/components/Navbar";
import IntroPage from "./IntroPage";
import MainLanding from "./MainLanding";

const Index = () => {
  const introRef = useRef<HTMLElement>(null);
  const introCompleted = useRef(false);
  const clampTop = useRef(0);
  const scrollFrame = useRef(0);
  const { scrollYProgress } = useScroll({ target: introRef, offset: ["start start", "end end"] });
  const visualProgress = useMotionValue(0);
  const moleculeVisualLocked = useRef(false);
  const [navRevealed, setNavRevealed] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress >= 0.78 && !moleculeVisualLocked.current) {
      moleculeVisualLocked.current = true;
      setNavRevealed(true);
    }
    visualProgress.set(moleculeVisualLocked.current ? 0.78 : progress);
  });

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
    let touchY = 0;
    const measure = () => { clampTop.current = getMoleculeScrollTop(); };
    const isAtMoleculeBoundary = () => introCompleted.current && window.scrollY <= clampTop.current + 2;
    const stopUpwardWheelAtBoundary = (event: WheelEvent) => {
      if (event.deltaY < 0 && isAtMoleculeBoundary()) event.preventDefault();
    };
    const rememberTouch = (event: TouchEvent) => { touchY = event.touches[0]?.clientY ?? 0; };
    const stopUpwardTouchAtBoundary = (event: TouchEvent) => {
      const nextTouchY = event.touches[0]?.clientY ?? touchY;
      if (nextTouchY > touchY && isAtMoleculeBoundary()) event.preventDefault();
      touchY = nextTouchY;
    };
    const stopUpwardKeyAtBoundary = (event: KeyboardEvent) => {
      if (["ArrowUp", "PageUp", "Home"].includes(event.key) && isAtMoleculeBoundary()) event.preventDefault();
    };
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
    window.addEventListener("wheel", stopUpwardWheelAtBoundary, { passive: false });
    window.addEventListener("touchstart", rememberTouch, { passive: true });
    window.addEventListener("touchmove", stopUpwardTouchAtBoundary, { passive: false });
    window.addEventListener("keydown", stopUpwardKeyAtBoundary);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scrollFrame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", stopUpwardWheelAtBoundary);
      window.removeEventListener("touchstart", rememberTouch);
      window.removeEventListener("touchmove", stopUpwardTouchAtBoundary);
      window.removeEventListener("keydown", stopUpwardKeyAtBoundary);
    };
  }, [getMoleculeScrollTop]);

  return (
    <main className="bg-background">
      <IntroPage sectionRef={introRef} onLogoClick={enterWebsite} scrollYProgress={visualProgress} />
      <Navbar introRef={introRef} isVisible={navRevealed} />
      <MainLanding />
    </main>
  );
};

export default Index;
