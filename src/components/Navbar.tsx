import { useState, type RefObject } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";

const NAV_ITEMS = [
  { id: "emerged-work", label: "Emerged Work" },
  { id: "schedule", label: "Schedule" },
  { id: "posts", label: "Posts" },
  { id: "team", label: "Team" },
];

const MOLECULE_ZOOM_END = 0.78;

const Navbar = ({ introRef }: { introRef: RefObject<HTMLElement> }) => {
  const reduceMotion = useReducedMotion();
  const [isAvailable, setIsAvailable] = useState(false);
  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end end"],
  });
  const opacity = useTransform(scrollYProgress, [MOLECULE_ZOOM_END, 0.84], [0, 1]);
  const y = useTransform(scrollYProgress, [MOLECULE_ZOOM_END, 0.84], [-64, 0]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setIsAvailable(progress >= MOLECULE_ZOOM_END);
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
    window.scrollTo({
      top: introTop + scrollableDistance * MOLECULE_ZOOM_END,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <motion.header
      style={{ opacity, x: "-50%", y: reduceMotion ? 0 : y, pointerEvents: isAvailable ? "auto" : "none" }}
      aria-hidden={!isAvailable}
      className="fixed left-1/2 top-0 z-50 w-full bg-transparent"
    >
      <nav className="flex h-16 items-center gap-5 overflow-x-auto px-5 text-bloom-dark sm:gap-7 sm:px-8 md:h-20 md:gap-9 md:px-12" aria-label="Main navigation">
        <button
          type="button"
          onClick={scrollToMolecule}
          className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bloom-deep"
          aria-label="Return to the Bloom Lab molecule introduction"
        >
          <img
            src={`${import.meta.env.BASE_URL}logo_blue.png`}
            alt=""
            className="h-8 w-8 object-contain md:h-9 md:w-9"
          />
        </button>

        <div className="flex min-w-max items-center gap-5 sm:gap-7 md:gap-9">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className="shrink-0 text-xs font-normal tracking-wide text-bloom-dark transition-opacity hover:opacity-55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bloom-deep md:text-sm"
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
