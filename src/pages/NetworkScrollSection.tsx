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
             - spaced wide (left / center / right)
             - near the top so they feel like they emerge from nav
        */}
        {[
          { x: 100, y: 100, color: "#00CFEA" },   // cyan
          { x: 500, y: 100, color: "#7050FF" },   // violet
          { x: 900, y: 100, color: "#00CFEA" },   // cyan again
        ].map((node, i) => (
          <circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={8}
            fill={node.color}
            style={{
              filter: `drop-shadow(0 0 8px ${node.color})`,
            }}
          />
        ))}

        {/*
          2. MAIN TRUNKS
             - each trunk now truly starts at its node
             - curves inward, hinting they’ll meet
        */}
        <motion.path
          d="M100 100 C120 180 200 260 320 340"
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
          d="M500 100 C500 200 500 280 500 360"
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
          d="M900 100 C880 180 800 260 680 340"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mainReveal,
          }}
        />

        {/*
          3. BRANCHES
             - small offshoots implying exploration / disciplines
             - they start from the trunks' lower segments
        */}
        <motion.path
          d="M320 340 C380 380 430 410 460 440"
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
          d="M500 360 C540 390 580 420 600 450"
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
          d="M680 340 C640 380 600 410 560 440"
          stroke="#00CFEA"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 6px #00CFEA)",
            pathLength: branchReveal,
          }}
        />

        {/*
          4. RECONVERGENCE
             - all flow inward toward a single locus around (500, 520-560)
             - each path is a valid cubic Bézier that lands near the hub
        */}
        <motion.path
          d="M460 440 C480 480 490 510 500 540"
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
          d="M600 450 C570 490 540 515 500 540"
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
          d="M560 440 C540 485 520 515 500 540"
          stroke="#FFFFFF"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px rgba(255,255,255,0.6))",
            pathLength: mergeReveal,
          }}
        />

        {/*
          5. FINAL HUB
             - sits at convergence point (~500, 540)
             - glows violet with cyan aura
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
      
      {/* Overlay tag / signature under hub */}
      <motion.div
      className="absolute left-1/2 text-center"
      style={{
        top: "90%", // appears below the hub
        transform: "translateX(-50%)",
        opacity: hubOpacity,
        }}
      >   
      {/* Replace text by image */}
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
