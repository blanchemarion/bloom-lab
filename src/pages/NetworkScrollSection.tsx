import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";


const NetworkScrollSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  // Track scroll progress through JUST this section (0 -> 1)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Each branch can map to a different slice of progress
  const mainReveal = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const branchReveal = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const mergeReveal = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  // Glow opacity for the final hub
  const hubOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative w-full"
      style={{
        height: "200vh", // taller than viewport to allow scroll narrative
        backgroundColor: "#121212",
        overflow: "hidden",
      }}
    >

      {/* SVG network */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 2000"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* 1. TOP NODES */}
        {[300, 500, 700].map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={150}
            r={8}
            fill="#00CFEA"
            style={{ filter: "drop-shadow(0 0 8px #00CFEA)" }}
          />
        ))}

        {/* 2. MAIN DOWNWARD TRUNKS (3 lines going down) */}
        <motion.path
          d="M300 150 C300 300 320 500 350 700"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mainReveal,
          }}
        />
        <motion.path
          d="M500 150 C500 320 480 600 500 800"
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mainReveal,
          }}
        />
        <motion.path
          d="M700 150 C700 300 680 520 650 720"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mainReveal,
          }}
        />

        {/* 3. BRANCHES coming off the trunks */}
        <motion.path
          d="M350 700 C400 750 450 780 480 820"
          stroke="#00CFEA"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 6px #00CFEA)",
            pathLength: branchReveal,
          }}
        />
        <motion.path
          d="M500 800 C540 820 580 860 620 900"
          stroke="#7050FF"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 6px #7050FF)",
            pathLength: branchReveal,
          }}
        />
        <motion.path
          d="M650 720 C600 780 560 820 520 880"
          stroke="#00CFEA"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 6px #00CFEA)",
            pathLength: branchReveal,
          }}
        />

        {/* 4. RECONVERGENCE (all flowing into one hub) */}
        <motion.path
          d="M480 820 C500 900 510 980 500 1100"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mergeReveal,
          }}
        />
        <motion.path
          d="M620 900 C580 980 540 1040 500 1100"
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mergeReveal,
          }}
        />
        <motion.path
          d="M520 880 C510 960 505 1030 500 1100"
          stroke="#FFFFFF"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px rgba(255,255,255,0.6))",
            pathLength: mergeReveal,
          }}
        />

        {/* 5. FINAL HUB */}
        <motion.circle
          cx={500}
          cy={1100}
          r={18}
          fill="#7050FF"
          style={{
            filter:
              "drop-shadow(0 0 12px rgba(112,80,255,0.8)) drop-shadow(0 0 30px rgba(0,207,234,0.4))",
            opacity: hubOpacity,
          }}
        />
      </svg>

      {/* Optional overlay text or logo at the bottom of section */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center text-white text-sm tracking-wide"
        style={{ opacity: hubOpacity }}
      >
        BLOOM LAB
        <div className="text-[10px] text-white/60">
          where every disciplines collide to reimagine life sciences
        </div>
      </motion.div>
    </section>
  );
};

export default NetworkScrollSection;
