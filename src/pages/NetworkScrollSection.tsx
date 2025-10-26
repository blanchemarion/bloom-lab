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
          6 seeds, all y = 100
          spaced across the width: far-left to far-right
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
          each trunk starts at its node's (x,100)
          then bends inward/downward toward the middle band (~y 320-360)
          these get revealed by mainReveal
        */}

        {/* leftmost */}
        <motion.path
          d="M60 100 C80 170 120 240 220 300"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mainReveal,
          }}
        />

        {/* slight-right */}
        <motion.path
          d="M220 100 C230 180 260 240 340 310"
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mainReveal,
          }}
        />

        {/* mid-left */}
        <motion.path
          d="M380 100 C380 190 400 260 440 330"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mainReveal,
          }}
        />

        {/* mid-right */}
        <motion.path
          d="M620 100 C610 190 590 260 560 330"
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mainReveal,
          }}
        />

        {/* slight-right */}
        <motion.path
          d="M780 100 C760 180 720 250 660 310"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mainReveal,
          }}
        />

        {/* rightmost */}
        <motion.path
          d="M940 100 C900 180 850 250 760 300"
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
          3. BRANCHES
          offshoots to imply exploration, lateral thinking
          still controlled by branchReveal
        */}

        {/* branches from left cluster flowing toward mid */}
        <motion.path
          d="M220 300 C270 330 320 360 360 390"
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
          d="M340 310 C380 340 410 365 440 390"
          stroke="#7050FF"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 6px #7050FF)",
            pathLength: branchReveal,
          }}
        />

        {/* branches from right cluster flowing toward mid */}
        <motion.path
          d="M560 330 C530 360 510 380 480 400"
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
          d="M660 310 C620 340 590 365 560 390"
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
          d="M760 300 C700 330 650 360 600 390"
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
          now everything flows into a single point near (500,540)
          each is a clean cubic curve that lands there
          revealed by mergeReveal
        */}

        {/* left flow feeding hub */}
        <motion.path
          d="M360 390 C400 430 440 480 500 540"
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
          d="M440 390 C460 430 480 480 500 540"
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mergeReveal,
          }}
        />

        {/* right flow feeding hub */}
        <motion.path
          d="M480 400 C490 440 495 490 500 540"
          stroke="#FFFFFF"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px rgba(255,255,255,0.6))",
            pathLength: mergeReveal,
          }}
        />
        <motion.path
          d="M560 390 C540 430 520 480 500 540"
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
          d="M600 390 C580 430 550 480 500 540"
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
          d="M560 390 C600 430 580 500 500 540"
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
          same hub position: y = 540
          we keep it violet with cyan halo
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
          top: "80%", // appears below the hub
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
