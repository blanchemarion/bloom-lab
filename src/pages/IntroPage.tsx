import { type RefObject } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

const QUESTIONS = [
  { text: "Can cells dream?", left: 8, top: 15, size: 1 },
  { text: "What if DNA was a language?", left: 57, top: 11, size: 1.2 },
  { text: "Could empathy be engineered?", left: 71, top: 28, size: 1 },
  { text: "What does it mean to be alive?", left: 18, top: 36, size: 1.35 },
  { text: "Is consciousness chemical?", left: 48, top: 46, size: 1 },
  { text: "Can biology think?", left: 76, top: 56, size: 1.2 },
  { text: "What new forms of life could be emulated?", left: 5, top: 65, size: 1 },
  { text: "Can we decode how cells compute their own fate?", left: 39, top: 77, size: 1.05 },
  { text: "Is evolution an algorithm or an accident?", left: 61, top: 88, size: 1 },
  { text: "Could life reverse its own aging?", left: 13, top: 89, size: 1.15 },
  { text: "When does simulation become creation?", left: 67, top: 70, size: 1 },
  { text: "Are we the authors or the readers of life?", left: 29, top: 23, size: 1.25 },
];

// Integer arithmetic keeps this wider depth distribution stable across renders.
const DOTS = Array.from({ length: 74 }, (_, index) => {
  const depth = ((index * 47 + 19) % 101) / 100;
  return { left: (index * 37 + 11) % 97, top: (index * 61 + 7) % 96, size: 1.25 + depth * 5.25, depth };
});

const BACKGROUND_MOLECULES = [
  { left: 91, top: 18, size: 35, depth: 0.38, rotate: -24, opacity: 0.2, blur: 7 },
  { left: 58, top: 91, size: 28, depth: 0.24, rotate: 31, opacity: 0.14, blur: 10 },
  { left: 102, top: 75, size: 45, depth: 0.3, rotate: 12, opacity: 0.16, blur: 12 },
];

const FOCAL_POINT = { x: 72, y: 68 };
const FINAL_MOLECULE_SIZE = 86;
type ProgressProps = { progress: MotionValue<number>; reduceMotion: boolean };

const Question = ({ question, index, progress, reduceMotion }: ProgressProps & { question: (typeof QUESTIONS)[number]; index: number }) => {
  const depth = (question.size - 1) / 0.35;
  const exit = 0.34 + depth * 0.13;
  const projection = 1.5 + depth * 2.35;
  const x = useTransform(progress, [0.08, exit], [0, (question.left - FOCAL_POINT.x) * projection]);
  const y = useTransform(progress, [0.08, exit], [0, (question.top - FOCAL_POINT.y) * projection]);
  const scale = useTransform(progress, [0.08, exit], [1, reduceMotion ? 1 : 2.1 + depth * 2.7]);
  const opacity = useTransform(progress, [0, exit * 0.72, exit], [0.58 + depth * 0.37, 0.54 + depth * 0.36, 0]);
  const filter = useTransform(progress, [0.08, exit], ["blur(0px)", reduceMotion ? "blur(0px)" : `blur(${2.5 + depth * 7}px)`]);
  const drift = { x: [0, (index % 2 ? 1 : -1) * (8 + (index % 4) * 3), 0], y: [0, (index % 3 ? -1 : 1) * (7 + (index % 5) * 2), 0] };

  return (
    <motion.div className="absolute origin-center will-change-transform" style={{ left: `${question.left}%`, top: `${question.top}%`, x, y, scale, opacity, filter }}>
      <motion.p
        className="max-w-[46vw] whitespace-nowrap font-light tracking-wide"
        style={{ fontSize: `${question.size * 1.08}rem`, color: `hsl(var(--bloom-deep) / ${0.56 + depth * 0.4})` }}
        animate={reduceMotion ? undefined : drift}
        transition={reduceMotion ? undefined : { duration: 9 + (index % 5) * 1.7, repeat: Infinity, ease: "easeInOut" }}
      >{question.text}</motion.p>
    </motion.div>
  );
};

const Dot = ({ dot, progress, reduceMotion }: ProgressProps & { dot: (typeof DOTS)[number] }) => {
  const exit = 0.46 + dot.depth * 0.18;
  const projection = 1.2 + dot.depth * 3.8;
  const x = useTransform(progress, [0.1, exit], [0, (dot.left - FOCAL_POINT.x) * projection]);
  const y = useTransform(progress, [0.1, exit], [0, (dot.top - FOCAL_POINT.y) * projection]);
  const scale = useTransform(progress, [0.1, exit], [1, reduceMotion ? 1 : 2 + dot.depth * 5.5]);
  const opacity = useTransform(progress, [0, exit * 0.76, exit], [0.035 + dot.depth * 0.14, 0.03 + dot.depth * 0.12, 0]);
  const filter = useTransform(progress, [0.1, exit], [`blur(${3.1 - dot.depth * 1.45}px)`, reduceMotion ? "blur(0px)" : `blur(${2 + dot.depth * 7}px)`]);
  return <motion.span className="absolute rounded-full bg-bloom-sky will-change-transform" style={{ left: `${dot.left}%`, top: `${dot.top}%`, width: dot.size, height: dot.size, x, y, scale, opacity, filter }} />;
};

const BackgroundMolecule = ({ molecule, progress }: { molecule: (typeof BACKGROUND_MOLECULES)[number]; progress: MotionValue<number> }) => {
  const opacity = useTransform(progress, [0.3, 0.58, 0.9], [0, molecule.opacity, molecule.opacity * 0.82]);
  const scale = useTransform(progress, [0.3, 0.9], [0.72, 1 + molecule.depth * 0.65]);
  const x = useTransform(progress, [0.3, 0.9], [0, (molecule.left - FOCAL_POINT.x) * molecule.depth * 0.45]);
  const y = useTransform(progress, [0.3, 0.9], [0, (molecule.top - FOCAL_POINT.y) * molecule.depth * 0.45]);
  const filter = useTransform(progress, [0.3, 0.9], [`blur(${molecule.blur}px)`, `blur(${Math.max(2.5, molecule.blur * 0.35)}px)`]);
  return <motion.img src={`${import.meta.env.BASE_URL}image_molecule.png`} alt="" draggable={false} aria-hidden="true" className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 select-none object-contain will-change-transform" style={{ left: `${molecule.left}%`, top: `${molecule.top}%`, width: `${molecule.size}vmin`, opacity, scale, x, y, rotate: molecule.rotate, filter }} />;
};

const IntroPage = ({ sectionRef }: { sectionRef: RefObject<HTMLElement> }) => {
  const reduceMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const logoOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.18], [1, reduceMotion ? 1 : 1.55]);
  const logoFilter = useTransform(scrollYProgress, [0, 0.18], ["blur(0px)", reduceMotion ? "blur(0px)" : "blur(3px)"]);
  const glyphSize = useTransform(scrollYProgress, [0, 0.2, 0.78], ["0.3vmin", "0.7vmin", `${FINAL_MOLECULE_SIZE}vmin`]);
  const glyphX = useTransform(scrollYProgress, [0, 0.78], ["22vw", "20vw"]);
  const glyphY = useTransform(scrollYProgress, [0, 0.78], ["18vh", "0vh"]);
  const textOpacity = useTransform(scrollYProgress, [0.58, 0.78], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.58, 0.82], [32, 0]);
  const promptOpacity = useTransform(scrollYProgress, [0, 0.12], [0.7, 0]);

  return (
    <section ref={sectionRef} className="relative h-[320vh] bg-background" aria-label="Bloom Lab introduction">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">{DOTS.map((dot, index) => <Dot key={index} dot={dot} progress={scrollYProgress} reduceMotion={reduceMotion} />)}</div>
        <div
          className="absolute inset-0 select-none"
          style={{
            WebkitMaskImage: "radial-gradient(ellipse clamp(7rem, 16vw, 14rem) clamp(4rem, 10vw, 9rem) at 50% 50%, transparent 68%, black 100%)",
            maskImage: "radial-gradient(ellipse clamp(7rem, 16vw, 14rem) clamp(4rem, 10vw, 9rem) at 50% 50%, transparent 68%, black 100%)",
          }}
          aria-hidden="true"
        >{QUESTIONS.map((question, index) => <Question key={question.text} question={question} index={index} progress={scrollYProgress} reduceMotion={reduceMotion} />)}</div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.img src={`${import.meta.env.BASE_URL}logo_bloom.png?v=20260821`} alt="Bloom Lab" className="w-40 object-contain will-change-transform md:w-60" style={{ opacity: logoOpacity, scale: logoScale, filter: logoFilter }} />
        </div>

        <div className="absolute inset-0" aria-hidden="true">{BACKGROUND_MOLECULES.map((molecule, index) => <BackgroundMolecule key={index} molecule={molecule} progress={scrollYProgress} />)}</div>

        <motion.div className="absolute left-1/2 top-1/2 z-10 will-change-transform" style={{ x: glyphX, y: glyphY, width: glyphSize, height: glyphSize }} aria-hidden="true">
          <img src={`${import.meta.env.BASE_URL}image_molecule.png`} alt="" draggable={false} className="h-full w-full -translate-x-1/2 -translate-y-1/2 select-none object-contain" />
        </motion.div>

        <div className="absolute left-[6%] right-[52%] top-1/2 z-20 -translate-y-1/2 text-left">
          <motion.div className="font-light" style={{ opacity: textOpacity, y: textY }}>
            <h1 className="font-platypi text-xl leading-tight text-foreground sm:text-2xl md:text-3xl lg:text-4xl">Because life is the universe’s most successful interdisciplinary project, <br /> we need to unite.</h1>
            <p className="mt-5 max-w-xl text-[0.7rem] leading-relaxed text-foreground/70 sm:text-sm md:mt-6 md:text-base lg:text-lg">We’re committed to scientific rigor while encouraging creativity, using theoretical frameworks to illuminate system-level processes in biology - from molecular networks to cognition. We think that biology is both a science of life and a language for understanding complexity itself.</p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default IntroPage;
