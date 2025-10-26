import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const NetworkScrollSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  // Track scroll progress through JUST this section (0 -> 1)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Animation phases mapped to scroll
  const mainReveal   = useTransform(scrollYProgress, [0,   0.3], [0, 1]);
  const branchReveal = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const mergeReveal  = useTransform(scrollYProgress, [0.5, 1.0], [0, 1]);
  const hubOpacity   = useTransform(scrollYProgress, [0.7, 1.0], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative w-full"
      style={{
        height: "160vh", // storytelling scroll zone
        backgroundColor: "#121212",
        overflow: "hidden",
      }}
    >
      {/* SVG network */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
      >
        {/*
          1. TOP NODES
          six seeds, aligned on y=100
        */}
        {[
          { x: 60,  y: 100, color: "#00CFEA" },   // cyan
          { x: 220, y: 100, color: "#7050FF" },   // violet
          { x: 380, y: 100, color: "#00CFEA" },   // cyan
          { x: 620, y: 100, color: "#7050FF" },   // violet
          { x: 780, y: 100, color: "#00CFEA" },   // cyan
          { x: 940, y: 100, color: "#7050FF" },   // violet
        ].map((node, i) => (
          <circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={7}
            fill={node.color}
            style={{
              filter: `drop-shadow(0 0 8px ${node.color})`,
            }}
          />
        ))}

        {/*
          2. MAIN TRUNKS
          Each seed gets its own distinctive downstream trunk:
          - some bow inward gradually,
          - some dip and then sweep,
          - some pull horizontally first then drop.
          All trunks end in different "gather zones" so they feel unique.
        */}

        {/* trunk A: far left, long graceful inward arc */}
        <motion.path
          d="M60 100 C90 180 140 240 220 300"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mainReveal,
          }}
        />

        {/* trunk B: slight-right, steeper S-curve */}
        <motion.path
          d="M220 100 C240 170 300 230 360 280 C400 310 420 330 440 340"
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mainReveal,
          }}
        />

        {/* trunk C: mid-left, more vertical then flare */}
        <motion.path
          d="M380 100 C380 180 390 240 400 290 C410 330 430 350 460 370"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mainReveal,
          }}
        />

        {/* trunk D: mid-right, mirrored inward curve */}
        <motion.path
          d="M620 100 C610 180 600 240 590 290 C580 330 560 350 540 370"
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mainReveal,
          }}
        />

        {/* trunk E: slight-right, wide lateral sweep toward center */}
        <motion.path
          d="M780 100 C760 170 720 230 680 270 C640 310 610 330 580 350"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mainReveal,
          }}
        />

        {/* trunk F: far right, big outward bow then hook inward */}
        <motion.path
          d="M940 100 C920 180 880 240 830 280 C780 320 700 360 640 380"
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mainReveal,
          }}
        />

        {/*
          3. BRANCHES / OFFSHOOTS
          These suggest exploration. They don't all have to map 1:1 to trunks,
          they just need to imply lateral thinking. They fade in later.
        */}

        {/* offshoot from trunk A/B region */}
        <motion.path
          d="M220 300 C260 330 300 360 340 390"
          stroke="#00CFEA"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 6px #00CFEA)",
            pathLength: branchReveal,
          }}
        />
        {/* offshoot from trunk B into mid */}
        <motion.path
          d="M440 340 C470 360 500 385 520 400"
          stroke="#7050FF"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 6px #7050FF)",
            pathLength: branchReveal,
          }}
        />
        {/* offshoot from trunk C toward center */}
        <motion.path
          d="M460 370 C480 385 490 395 500 405"
          stroke="#00CFEA"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 6px #00CFEA)",
            pathLength: branchReveal,
          }}
        />
        {/* offshoot from trunk D inward */}
        <motion.path
          d="M540 370 C530 385 520 395 500 405"
          stroke="#7050FF"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 6px #7050FF)",
            pathLength: branchReveal,
          }}
        />
        {/* offshoot from trunk E pulling down */}
        <motion.path
          d="M580 350 C560 370 540 390 520 410"
          stroke="#00CFEA"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 6px #00CFEA)",
            pathLength: branchReveal,
          }}
        />
        {/* offshoot from trunk F curving inward */}
        <motion.path
          d="M640 380 C610 400 580 420 540 440"
          stroke="#7050FF"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 6px #7050FF)",
            pathLength: branchReveal,
          }}
        />

        {/*
          4. RECONVERGENCE
          Now: all six threads feed the SAME hub at (500,540).
          We draw 6 distinct converging curves.
          All of them land exactly at 500 540.
          Only cyan/violet.
        */}

        {/* from leftmost cluster */}
        <motion.path
          d="M340 390 C380 430 430 480 500 540"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mergeReveal,
          }}
        />

        {/* from trunk B region */}
        <motion.path
          d="M440 340 C460 380 480 450 500 540"
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mergeReveal,
          }}
        />

        {/* from trunk C / mid-left */}
        <motion.path
          d="M500 405 C500 460 500 500 500 540"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mergeReveal,
          }}
        />

        {/* from trunk D / mid-right */}
        <motion.path
          d="M500 405 C510 460 510 500 500 540"
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mergeReveal,
          }}
        />

        {/* from trunk E region */}
        <motion.path
          d="M520 410 C520 460 510 500 500 540"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mergeReveal,
          }}
        />

        {/* from trunk F region */}
        <motion.path
          d="M540 440 C540 480 520 510 500 540"
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mergeReveal,
          }}
        />

        {/*
          5. FINAL HUB
          Single merging point, glowing
        */}
        <motion.circle
          cx={500}
          cy={540}
          r={18}
          fill="#7050FF"
          style={{
            filter:
              "drop-shadow(0 0 12px rgba(112,80,255,0.8)) drop-shadow(0 0 30px rgba(0,207,234,0.4))",
            opacity: hubOpacity,
          }}
        />
      </svg>

      {/* Signature / wordmark */}
      <motion.div
        className="absolute left-1/2 text-center"
        style={{
          top: "80%", // sits below hub
          transform: "translateX(-50%)",
          opacity: hubOpacity,
        }}
      >
        <img
          src="/bloom_written.png"
          alt="Bloom Lab"
          className="mx-auto w-48 md:w-56 object-contain"
          style={{
            filter:
              "drop-shadow(0 0 20px rgba(112,80,255,0.5)) drop-shadow(0 0 20px rgba(0,207,234,0.3))",
          }}
        />
        <div className="text-[20px] text-white mt-2">
          where disciplines collide to reimagine life sciences.
        </div>
      </motion.div>
    </section>
  );
};

export default NetworkScrollSection;
