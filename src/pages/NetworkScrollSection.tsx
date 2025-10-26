import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const NetworkScrollSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  // Scroll progress through this section only
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  //
  // PHASE TIMING (compressed)
  //
  // We accelerate the reveal curves so everything resolves sooner.
  // - main trunks: 0   -> 0.25
  // - branches:   0.15-> 0.45
  // - merge:      0.35-> 0.7
  // - hub/logo:   0.45-> 1.0
  //
  const mainReveal   = useTransform(scrollYProgress, [0.0, 0.25], [0, 1]);
  const branchReveal = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  const mergeReveal  = useTransform(scrollYProgress, [0.35, 0.7], [0, 1]);
  const hubOpacity   = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);

  // Also bring the hero (logo + tagline) in earlier (starts near 0.3)
  const heroOpacity  = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative w-full"
      style={{
        // shorter hero section: less scroll before convergence finishes
        height: "110vh",
        backgroundColor: "#121212",
        overflow: "hidden",
      }}
    >
      {/* SVG NETWORK BACKGROUND */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
      >
        {/*
          TOP NODES (unchanged horizontally, same glow)
          y stays ~100 to keep that "origin row"
        */}
        {[
          { x: 60,  y: 100, color: "#00CFEA" },
          { x: 220, y: 100, color: "#7050FF" },
          { x: 380, y: 100, color: "#00CFEA" },
          { x: 500, y: 100, color: "#7050FF" },
          { x: 620, y: 100, color: "#7050FF" },
          { x: 780, y: 100, color: "#00CFEA" },
          { x: 940, y: 100, color: "#7050FF" },
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
          MAIN TRUNKS
          We pull everything UP. Before, trunks ended ~300-330,
          branches ~340-360, merge down to 540.
          Now:
          - trunks settle ~240-260
          - branches ~280-300
          - merge hub is ~380 (not 540)
          So visually: diverge+recombine happens in half the vertical distance.
        */}

        {/* trunk A */}
        <motion.path
          d="M60 100 C90 160 140 200 210 230 C220 240 230 250 240 255"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mainReveal,
          }}
        />

        {/* trunk B */}
        <motion.path
          d="M220 100 C245 155 300 195 350 220 C380 235 400 245 420 255"
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mainReveal,
          }}
        />

        {/* trunk C */}
        <motion.path
          d="M380 100 C380 160 390 195 395 215 C405 235 420 245 440 255"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mainReveal,
          }}
        />

        {/* trunk G (center) */}
        <motion.path
          d="M500 100 C500 155 505 195 500 215 C495 235 495 250 500 260"
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mainReveal,
          }}
        />

        {/* trunk D */}
        <motion.path
          d="M620 100 C610 160 600 195 590 215 C575 235 560 245 545 255"
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mainReveal,
          }}
        />

        {/* trunk E */}
        <motion.path
          d="M780 100 C760 155 720 195 680 215 C640 235 610 245 580 255"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mainReveal,
          }}
        />

        {/* trunk F */}
        <motion.path
          d="M940 100 C920 160 880 200 830 225 C780 245 700 260 640 265"
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
          BRANCHES / OFFSHOOTS
          Shifted upward (~260-300).
        */}

        <motion.path
          d="M240 255 C280 270 320 285 360 295"
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
          d="M420 255 C450 270 480 280 500 290"
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
          d="M440 255 C465 270 485 280 500 290"
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
          d="M500 260 C515 270 530 280 545 295"
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
          d="M545 255 C540 270 520 280 500 290"
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
          d="M580 255 C560 270 540 285 520 295"
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
          d="M640 265 C600 280 560 295 520 305"
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
          RECONVERGENCE
          All meet at (500,380) instead of (500,540).
          Much tighter vertical story.
        */}

        <motion.path
          d="M360 295 C400 320 450 350 500 380"
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
          d="M420 255 C450 290 480 330 500 380"
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
          d="M500 290 C500 320 500 350 500 380"
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
          d="M545 295 C535 320 520 350 500 380"
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
          d="M545 255 C550 300 540 340 500 380"
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
          d="M580 255 C570 300 550 340 500 380"
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
          d="M640 265 C610 305 560 340 500 380"
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mergeReveal,
          }}
        />

        {/* HUB (now higher on screen) */}
        <motion.circle
          cx={500}
          cy={380}
          r={20}
          fill="#7050FF"
          style={{
            filter:
              "drop-shadow(0 0 12px rgba(112,80,255,0.8)) drop-shadow(0 0 30px rgba(0,207,234,0.4))",
            opacity: hubOpacity,
          }}
        />
      </svg>

      {/* HERO CONTENT: logo + line.
         We bring this up to ~40% viewport height, make it bigger,
         AND give it a dark glass backdrop so the network feels present
         but doesn't visually fight the text.
      */}
      <motion.div
        className="absolute left-1/2 flex flex-col items-center text-center"
        style={{
          top: "40%",
          transform: "translateX(-50%) translateY(-50%)",
          opacity: heroOpacity,
        }}
      >
        <div
          className="
            px-6 py-6 rounded-2xl
            bg-[rgba(18,18,18,0.6)]
            backdrop-blur-md
            border border-[rgba(112,80,255,0.4)]
            shadow-[0_0_40px_rgba(112,80,255,0.5),0_0_80px_rgba(0,207,234,0.3)]
            max-w-[90vw]
          "
        >
          <img
            src="/bloom_written.png"
            alt="Bloom Lab"
            className="mx-auto w-64 md:w-80 object-contain"
            style={{
              filter:
                "drop-shadow(0 0 24px rgba(112,80,255,0.6)) drop-shadow(0 0 24px rgba(0,207,234,0.4))",
            }}
          />
          <div
            className="text-white mt-4 leading-snug font-light"
            style={{
              fontSize: "1.1rem", // ~text-xl
            }}
          >
            where disciplines collide to reimagine life sciences.
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default NetworkScrollSection;
