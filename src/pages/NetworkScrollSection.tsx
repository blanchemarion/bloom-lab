import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const NetworkScrollSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  // Scroll progress through just this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Timing of reveals
  const mainReveal   = useTransform(scrollYProgress, [0.0, 0.25], [0, 1]);
  const branchReveal = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  const mergeReveal  = useTransform(scrollYProgress, [0.35, 0.7], [0, 1]);
  const taglineOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

  // --- CRITICAL ALIGNMENT ---
  // We'll pick one canonical hub point in SVG coords.
  // We'll aim all paths into this point.
  // We'll also visually place the hero card centered on (HUB_X, HUB_Y)
  // so that "everything converges into Bloom Lab".
  //
  const HUB_X = 500;
  const HUB_Y = 360; // pulled a bit higher so it's more hero-like

  return (
    <section
      ref={ref}
      className="relative w-full"
      style={{
        height: "130vh",
        backgroundColor: "#121212",
        overflow: "hidden",
      }}
    >
      {/* NETWORK BACKGROUND */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        style={{
          opacity: 0.45,
        }}
      >
        {/*
          SCATTERED ORIGINS
          Each origin is now at its own (x,y). We'll draw a glowing circle
          at the start of each "discipline stream". They're intentionally
          not aligned on the same y anymore.
        */}
        {[
          { x: 120, y: 80,  color: "#00CFEA" },   // top-left high
          { x: 260, y: 140, color: "#7050FF" },   // mid-left
          { x: 380, y: 60,  color: "#00CFEA" },   // higher again
          { x: 540, y: 120, color: "#7050FF" },   // upper-mid
          { x: 700, y: 90,  color: "#7050FF" },   // high-right
          { x: 800, y: 180, color: "#00CFEA" },   // lower-right
          { x: 930, y: 110, color: "#7050FF" },   // far-right
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
          MAIN "TRUNK" PATHS
          These are the early, discipline-colored trajectories.
          Each one now starts from its own scatter source instead of y=100.

          The idea: each path uses a cubic Bezier that first travels
          downward / inward (exploration), then turns toward HUB_X/HUB_Y.
          We're keeping the Y span roughly ~80-260 before angling in, so
          the story still feels compressed vertically.
        */}

        {/* Path A: far left high -> curve in */}
        <motion.path
          d={`M120 80 
              C150 140 200 180 250 210 
              C300 240 360 270 ${HUB_X-80} ${HUB_Y-20}
              C${HUB_X-60} ${HUB_Y-10} ${HUB_X-40} ${HUB_Y-5} ${HUB_X} ${HUB_Y}`}
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mainReveal,
          }}
        />

        {/* Path B: mid-left lower start -> S curve in */}
        <motion.path
          d={`M260 140 
              C300 170 340 200 380 230 
              C420 255 450 275 ${HUB_X-40} ${HUB_Y-10}
              C${HUB_X-30} ${HUB_Y-5} ${HUB_X-15} ${HUB_Y-2} ${HUB_X} ${HUB_Y}`}
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mainReveal,
          }}
        />

        {/* Path C: higher-left start, more direct inward */}
        <motion.path
          d={`M380 60 
              C390 120 400 170 420 210
              C440 240 460 270 ${HUB_X-20} ${HUB_Y-5}
              C${HUB_X-10} ${HUB_Y-2} ${HUB_X-5} ${HUB_Y-1} ${HUB_X} ${HUB_Y}`}
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mainReveal,
          }}
        />

        {/* Path D: center-ish start */}
        <motion.path
          d={`M540 120 
              C540 170 535 210 530 240
              C520 270 515 300 ${HUB_X+10} ${HUB_Y-5}
              C${HUB_X+6} ${HUB_Y-2} ${HUB_X+3} ${HUB_Y-1} ${HUB_X} ${HUB_Y}`}
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mainReveal,
          }}
        />

        {/* Path E: high-right arc sweeping inward */}
        <motion.path
          d={`M700 90
              C680 140 650 180 610 210
              C580 235 560 260 ${HUB_X+40} ${HUB_Y-10}
              C${HUB_X+25} ${HUB_Y-5} ${HUB_X+12} ${HUB_Y-2} ${HUB_X} ${HUB_Y}`}
          stroke="#7050FF"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #7050FF)",
            pathLength: mainReveal,
          }}
        />

        {/* Path F: lower-right start that snakes up into hub */}
        <motion.path
          d={`M800 180
              C760 190 720 210 690 235
              C650 260 610 285 ${HUB_X+60} ${HUB_Y}
              C${HUB_X+40} ${HUB_Y} ${HUB_X+20} ${HUB_Y} ${HUB_X} ${HUB_Y}`}
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mainReveal,
          }}
        />

        {/* Path G: far-right start bending hard inward */}
        <motion.path
          d={`M930 110
              C880 140 830 170 790 200
              C740 235 680 270 ${HUB_X+80} ${HUB_Y+10}
              C${HUB_X+40} ${HUB_Y+5} ${HUB_X+20} ${HUB_Y+2} ${HUB_X} ${HUB_Y}`}
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
          SECONDARY BRANCH FEELERS
          These are little offshoots / braids that give the sense of
          "ideas interacting" before merge. We'll aim them into the hub too.
        */}

        <motion.path
          d={`M380 230
              C420 250 460 275 ${HUB_X-30} ${HUB_Y-15}
              C${HUB_X-20} ${HUB_Y-10} ${HUB_X-10} ${HUB_Y-5} ${HUB_X} ${HUB_Y}`}
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
          d={`M610 210
              C590 235 570 255 ${HUB_X+20} ${HUB_Y-10}
              C${HUB_X+10} ${HUB_Y-5} ${HUB_X+5} ${HUB_Y-2} ${HUB_X} ${HUB_Y}`}
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
          d={`M690 235
              C650 260 620 280 ${HUB_X+10} ${HUB_Y+5}
              C${HUB_X+5} ${HUB_Y+2} ${HUB_X+2} ${HUB_Y+1} ${HUB_X} ${HUB_Y}`}
          stroke="#00CFEA"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 6px #00CFEA)",
            pathLength: branchReveal,
          }}
        />

        {/* HUB glow at the convergence point */}
        <motion.circle
          cx={HUB_X}
          cy={HUB_Y}
          r={20}
          fill="#7050FF"
          style={{
            filter:
              "drop-shadow(0 0 12px rgba(112,80,255,0.8)) drop-shadow(0 0 30px rgba(0,207,234,0.4))",
            opacity: mergeReveal, // fades in with the merge timing
          }}
        />
      </svg>

      {/* HERO CARD: always shows Bloom Lab logo.
         Positioned so that visually the card is centered on HUB_X, HUB_Y.
         We'll approximate by pinning the card at top: 40% viewport height,
         which should align over y≈360 in the SVG framing.
      */}
      <div
        className="absolute left-1/2 flex flex-col items-center text-center"
        style={{
          top: "40%",
          transform: "translateX(-50%) translateY(-50%)",
          pointerEvents: "none",
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
            flex flex-col items-center
          "
        >
          {/* Logo: visible immediately */}
          <img
            src="/bloom_written.png"
            alt="Bloom Lab"
            className="mx-auto w-64 md:w-80 object-contain"
            style={{
              filter:
                "drop-shadow(0 0 24px rgba(112,80,255,0.6)) drop-shadow(0 0 24px rgba(0,207,234,0.4))",
            }}
          />

          {/* Tagline: fades in only once convergence is basically done */}
          <motion.div
            className="text-white mt-4 leading-snug font-light"
            style={{
              fontSize: "1.1rem",
              opacity: taglineOpacity,
            }}
          >
            where disciplines collide to reimagine life sciences.
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NetworkScrollSection;
