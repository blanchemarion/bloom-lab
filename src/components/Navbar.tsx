import { useState, type RefObject } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "schedule", label: "Schedule" },
  { id: "emerged-work", label: "Emerged Work" },
  { id: "team", label: "Team" },
  { id: "posts", label: "Posts" },
  { id: "join-us", label: "Join us", action: true },
];

const Navbar = ({ introRef }: { introRef: RefObject<HTMLElement> }) => {
  const reduceMotion = useReducedMotion();
  const [isAvailable, setIsAvailable] = useState(false);
  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end end"],
  });
  const opacity = useTransform(scrollYProgress, [0.88, 0.96], [0, 1]);
  const y = useTransform(scrollYProgress, [0.88, 0.96], [-88, 0]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setIsAvailable(progress > 0.88);
  });

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const scrollToMolecule = () => {
    const intro = introRef.current;
    if (!intro) return;

    const introTop = intro.getBoundingClientRect().top + window.scrollY;
    const scrollableDistance = intro.scrollHeight - window.innerHeight;
    const moleculeRevealProgress = 0.84;

    window.scrollTo({
      top: introTop + scrollableDistance * moleculeRevealProgress,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <motion.header
      style={{ opacity, x: "-50%", y: reduceMotion ? 0 : y, pointerEvents: isAvailable ? "auto" : "none" }}
      aria-hidden={!isAvailable}
      className="fixed left-1/2 top-3 z-50 w-[calc(100%-1.5rem)] max-w-7xl rounded-full border border-white/60 bg-white/35 shadow-[0_18px_60px_rgba(24,34,43,0.14),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-2xl backdrop-saturate-150 md:top-4 md:w-[calc(100%-3rem)]"
    >
      <nav className="flex h-14 items-center justify-between gap-2 px-3 md:h-16 md:px-5" aria-label="Main navigation">
        <button
          type="button"
          onClick={scrollToMolecule}
          className="shrink-0 rounded-full p-1 transition-colors hover:bg-bloom-cyan/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bloom-deep"
          aria-label="Return to the Bloom Lab molecule introduction"
        >
          <img
            src={`${import.meta.env.BASE_URL}logo_blue.png`}
            alt=""
            className="h-8 w-8 object-contain md:h-10 md:w-10"
          />
        </button>

        <div className="flex min-w-0 items-center gap-1 overflow-x-auto py-1 sm:gap-2 md:gap-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={
                item.action
                  ? "shrink-0 rounded-full bg-bloom-deep px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-bloom-sky hover:text-bloom-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bloom-violet md:px-5 md:text-sm"
                  : "shrink-0 rounded-full px-3 py-2 text-xs font-light text-foreground/75 transition-colors hover:bg-bloom-cyan/35 hover:text-bloom-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bloom-deep md:text-sm"
              }
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
