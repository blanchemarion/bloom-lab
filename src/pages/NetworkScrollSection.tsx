import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const NetworkScrollSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  // Track scroll progress through JUST this section (0 -> 1)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Animation phases
  const mainReveal = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const branchReveal = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const mergeReveal = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const hubOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative w-full"
      style={{
        height: "140vh", // more compact than 200vh
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
        {/* 1. TOP NODES (moved up & spaced out horizontally) */}
        {[200, 500, 800].map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={80}
            r={8}
            fill="#00CFEA"
            style={{ filter: "drop-shadow(0 0 8px #00CFEA)" }}
          />
        ))}

        {/* 2. MAIN DOWNWARD TRUNKS (shorter, start converging earlier) */}
        <motion.path
          d="M200 80 C200 160 260 260 360 360"
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
          d="M500 80 C500 180 500 280 500 400"
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
          d="M800 80 C800 160 740 260 640 360"
          stroke="#00CFEA"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px #00CFEA)",
            pathLength: mainReveal,
          }}
        />

        {/* 3. BRANCHES coming off trunks (also pulled up) */}
        <motion.path
          d="M360 360 C420 400 460 430 480 460"
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
          d="M500 400 C540 420 580 450 600 480"
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
          d="M640 360 C600 400 560 430 520 460"
          stroke="#00CFEA"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 6px #00CFEA)",
            pathLength: branchReveal,
          }}
        />

        {/* 4. RECONVERGENCE (lines meet sooner, around y~550) */}
        <motion.path
          d="M480 460 C490 500 500 530 500 560"
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
          d="M600 480 C560 520 530 540 500 560"
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
          d="M520 460 C510 500 505 530 500 560"
          stroke="#FFFFFF"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 8px rgba(255,255,255,0.6))",
            pathLength: mergeReveal,
          }}
        />

        {/* 5. FINAL HUB (moved way up) */}
        <motion.circle
          cx={500}
          cy={560}
          r={18}
          fill="#7050FF"
          style={{
            filter:
              "drop-shadow(0 0 12px rgba(112,80,255,0.8)) drop-shadow(0 0 30px rgba(0,207,234,0.4))",
            opacity: hubOpacity,
          }}
        />
      </svg>

      {/* Overlay text / micro-tagline under the hub */}
      <motion.div
        className="absolute left-1/2 text-center text-white text-sm tracking-wide"
        style={{
          top: "65%", // place it around hub
          transform: "translateX(-50%)",
          opacity: hubOpacity,
        }}
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
