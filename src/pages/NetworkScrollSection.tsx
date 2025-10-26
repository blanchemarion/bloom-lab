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
        height: "160vh",
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
          seven seeds, aligned on y=100
        */}
        {[
          { x: 60,  y: 100, color: "#00CFEA" },   // cyan
          { x: 220, y: 100, color: "#7050FF" },   // violet
          { x: 380, y: 100, color: "#00CFEA" },   // cyan
          { x: 500, y: 100, color: "#7050FF" },   // violet (center)
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
          We've shortened how far they drop before they start interacting.
          Most trunks now resolve around y ~300-330 (instead of 350-380).
          This compresses the "fan out" band vertically.
        */}

        {/* trunk A: far left, inward arc -> ends ~300 */}
        <motion.path
          d="M60 100 C90 180 140 230 210 280 C220 290 230 300 240 305"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mainReveal,
          }}
        />

        {/* trunk B: S-curve -> ends ~310 */}
        <motion.path
          d="M220 100 C245 170 300 220 350 260 C380 285 400 300 420 310"
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mainReveal,
          }}
        />

        {/* trunk C: mostly vertical then flare -> ends ~320 */}
        <motion.path
          d="M380 100 C380 180 390 230 395 260 C405 290 420 305 440 320"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mainReveal,
          }}
        />

        {/* trunk G: center wobble -> ends ~320 */}
        <motion.path
          d="M500 100 C500 170 505 220 500 250 C495 280 495 300 500 320"
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mainReveal,
          }}
        />

        {/* trunk D: mirrored inward curve -> ends ~325 */}
        <motion.path
          d="M620 100 C610 180 600 230 590 260 C575 285 560 300 545 315"
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mainReveal,
          }}
        />

        {/* trunk E: wide lateral sweep -> ends ~310 */}
        <motion.path
          d="M780 100 C760 170 720 220 680 250 C640 280 610 295 580 310"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mainReveal,
          }}
        />

        {/* trunk F: far right arc -> ends ~330 */}
        <motion.path
          d="M940 100 C920 180 880 230 830 260 C780 295 700 320 640 330"
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
          These now sit higher (around 300-340 instead of 360-400),
          so exploration + convergence are closer together vertically.
        */}

        {/* offshoot from far left toward middle */}
        <motion.path
          d="M240 305 C280 325 320 340 360 350"
          stroke="#00CFEA"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 6px #00CFEA)",
            pathLength: branchReveal,
          }}
        />

        {/* offshoot from trunk B feeding inward */}
        <motion.path
          d="M420 310 C450 325 480 335 500 345"
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
          d="M440 320 C465 330 485 340 500 345"
          stroke="#00CFEA"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 6px #00CFEA)",
            pathLength: branchReveal,
          }}
        />

        {/* offshoot from trunk G (center) slightly right */}
        <motion.path
          d="M500 320 C515 330 530 340 545 350"
          stroke="#7050FF"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 6px #7050FF)",
            pathLength: branchReveal,
          }}
        />

        {/* offshoot from trunk D bending inward */}
        <motion.path
          d="M545 315 C540 330 520 340 500 345"
          stroke="#7050FF"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 6px #7050FF)",
            pathLength: branchReveal,
          }}
        />

        {/* offshoot from trunk E pulling down toward center */}
        <motion.path
          d="M580 310 C560 325 540 340 520 350"
          stroke="#00CFEA"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 6px #00CFEA)",
            pathLength: branchReveal,
          }}
        />

        {/* offshoot from trunk F, sweeping in from the right */}
        <motion.path
          d="M640 330 C600 340 560 350 520 360"
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
          Now we start the merge EARLIER in y:
          ~340-360 instead of 390-440.
          All land at (500,540).
        */}

        {/* from far-left cluster */}
        <motion.path
          d="M360 350 C400 390 450 460 500 540"
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
          d="M420 310 C450 360 480 430 500 540"
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
          d="M500 345 C500 400 500 470 500 540"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mergeReveal,
          }}
        />

        {/* from trunk G (center) */}
        <motion.path
          d="M545 350 C535 400 520 470 500 540"
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mergeReveal,
          }}
        />

        {/* from trunk D / mid-right */}
        <motion.path
          d="M545 315 C550 370 540 450 500 540"
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mergeReveal,
          }}
        />

        {/* from trunk E zone */}
        <motion.path
          d="M580 310 C570 360 550 440 500 540"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mergeReveal,
          }}
        />

        {/* from trunk F (far right) */}
        <motion.path
          d="M640 330 C610 380 560 460 500 540"
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mergeReveal,
          }}
        />

        {/* 5. FINAL HUB */}
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
          top: "80%",
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
