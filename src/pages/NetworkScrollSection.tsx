import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const NetworkScrollSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  // Scroll progress through just this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Timing curves
  const mainReveal   = useTransform(scrollYProgress, [0.0, 0.25], [0, 1]);
  const branchReveal = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  const mergeReveal  = useTransform(scrollYProgress, [0.35, 0.7], [0, 1]);

  // Tagline should appear earlier (start ~0.4, fully visible ~0.6 instead of 0.6→0.8)
  const taglineOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  // Convergence point in SVG coords
  const HUB_X = 500;
  const HUB_Y = 360;

  //
  // MORE SCATTER:
  // We push sources farther out radially from HUB_X/HUB_Y.
  // - Above clusters are higher (HUB_Y - 260, -300).
  // - Side clusters go ±400 px in x.
  // - Below clusters drop to HUB_Y + 300.
  //
  const sources = useMemo(
    () => [
      // upper left (further out & higher)
      { x: HUB_X - 380, y: HUB_Y - 300, color: "#00CFEA" },
      { x: HUB_X - 320, y: HUB_Y - 260, color: "#7050FF" },
      { x: HUB_X - 260, y: HUB_Y - 280, color: "#00CFEA" },
      { x: HUB_X - 420, y: HUB_Y - 220, color: "#7050FF" },
      { x: HUB_X - 300, y: HUB_Y - 200, color: "#7050FF" },

      // upper right (mirrored far out)
      { x: HUB_X + 360, y: HUB_Y - 320, color: "#7050FF" },
      { x: HUB_X + 430, y: HUB_Y - 270, color: "#00CFEA" },
      { x: HUB_X + 280, y: HUB_Y - 260, color: "#7050FF" },
      { x: HUB_X + 400, y: HUB_Y - 210, color: "#00CFEA" },
      { x: HUB_X + 300, y: HUB_Y - 190, color: "#7050FF" },

      // lateral left band (push x farther left)
      { x: HUB_X - 450, y: HUB_Y - 40,  color: "#00CFEA" },
      { x: HUB_X - 420, y: HUB_Y + 30,  color: "#7050FF" },
      { x: HUB_X - 360, y: HUB_Y + 10,  color: "#00CFEA" },

      // lateral right band (push x farther right)
      { x: HUB_X + 460, y: HUB_Y - 30,  color: "#7050FF" },
      { x: HUB_X + 430, y: HUB_Y + 40,  color: "#00CFEA" },
      { x: HUB_X + 360, y: HUB_Y + 20,  color: "#7050FF" },

      // lower cluster (drop them lower)
      { x: HUB_X - 300, y: HUB_Y + 320, color: "#00CFEA" },
      { x: HUB_X - 120, y: HUB_Y + 360, color: "#7050FF" },
      { x: HUB_X + 140, y: HUB_Y + 340, color: "#00CFEA" },
      { x: HUB_X + 280, y: HUB_Y + 300, color: "#7050FF" },
    ],
    [HUB_X, HUB_Y]
  );

  //
  // Generate Bezier paths for each source.
  //
  const paths = useMemo(() => {
    return sources.map((src, i) => {
      const sx = src.x;
      const sy = src.y;
      const tx = HUB_X;
      const ty = HUB_Y;

      // midpoint
      const mx = (sx + tx) / 2;
      const my = (sy + ty) / 2;

      // direction from source to hub
      const dx = tx - sx;
      const dy = ty - sy;
      const dist = Math.hypot(dx, dy) || 1;

      // perpendicular unit vector
      const px = -dy / dist;
      const py = dx / dist;

      // stronger bend for more distant sources; cap so it doesn't loop
      const bend = Math.min(80, dist * 0.25);
      const sign = i % 2 === 0 ? 1 : -1;

      const c1x = (sx + mx) / 2 + px * bend * 0.6 * sign;
      const c1y = (sy + my) / 2 + py * bend * 0.6 * sign;

      const c2x = (mx + tx) / 2 + px * bend * 0.25 * sign;
      const c2y = (my + ty) / 2 + py * bend * 0.25 * sign;

      const d = `
        M ${sx} ${sy}
        C ${c1x} ${c1y},
          ${c2x} ${c2y},
          ${tx} ${ty}
      `;

      return {
        d,
        color: src.color,
      };
    });
  }, [sources, HUB_X, HUB_Y]);

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
        {/* Scattered source nodes */}
        {sources.map((node, i) => (
          <circle
            key={`node-${i}`}
            cx={node.x}
            cy={node.y}
            r={6}
            fill={node.color}
            style={{
              filter: `drop-shadow(0 0 8px ${node.color})`,
            }}
          />
        ))}

        {/* Rays toward Bloom Lab */}
        {paths.map((p, i) => (
          <motion.path
            key={`path-${i}`}
            d={p.d}
            stroke={p.color}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 8px ${p.color})`,
              pathLength: mainReveal,
            }}
          />
        ))}

        {/* a few "braid" feelers for cross-talk */}
        {sources.slice(0, 6).map((src, i) => {
          if (i === 0) return null;
          const prev = sources[i - 1];
          return (
            <motion.path
              key={`braid-${i}`}
              d={`M ${prev.x} ${prev.y}
                 C ${(prev.x + src.x) / 2} ${(prev.y + src.y) / 2},
                   ${(src.x + HUB_X) / 2} ${(src.y + HUB_Y) / 2},
                   ${HUB_X} ${HUB_Y}`}
              stroke={i % 2 === 0 ? "#00CFEA" : "#7050FF"}
              strokeWidth={1.5}
              fill="none"
              strokeLinecap="round"
              style={{
                filter:
                  i % 2 === 0
                    ? "drop-shadow(0 0 6px #00CFEA)"
                    : "drop-shadow(0 0 6px #7050FF)",
                pathLength: branchReveal,
              }}
            />
          );
        })}

        {/* HUB glow at convergence (behind hero card) */}
        <motion.circle
          cx={HUB_X}
          cy={HUB_Y}
          r={20}
          fill="#7050FF"
          style={{
              filter:
                "drop-shadow(0 0 12px rgba(112,80,255,0.8)) drop-shadow(0 0 30px rgba(0,207,234,0.4))",
              opacity: mergeReveal,
          }}
        />
      </svg>

      {/* HERO CARD */}
      <div
        className="absolute left-1/2 flex flex-col items-center text-center"
        style={{
          top: "40%", // visually aligned to HUB_Y ≈ 360 in viewBox
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
          {/* Logo: always visible */}
          <img
            src="/bloom_written.png"
            alt="Bloom Lab"
            className="mx-auto w-64 md:w-80 object-contain"
            style={{
              filter:
                "drop-shadow(0 0 24px rgba(112,80,255,0.6)) drop-shadow(0 0 24px rgba(0,207,234,0.4))",
            }}
          />

          {/* Tagline: appears earlier and closer to the logo */}
          <motion.div
            className="text-white leading-snug font-light"
            style={{
              fontSize: "1.1rem",
              marginTop: "0.4rem",     // was mt-4 equivalent (~1rem). Now tighter.
              opacity: taglineOpacity, // fades sooner
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
