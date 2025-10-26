import { useRef, useMemo } from "react";
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

  // Convergence point in SVG coords (visually under the hero card)
  const HUB_X = 500;
  const HUB_Y = 360;

  //
  // 1. DEFINE ~20 ORIGIN POINTS AROUND THE HUB
  //
  // We'll arrange them in rough rings in all quadrants so it really feels
  // like "streams from everywhere". These coordinates are hand-tuned-ish
  // but you can tweak them however you want.
  //
  // Rule of thumb:
  //  - above-left cluster: x < HUB_X-150, y < HUB_Y-120
  //  - above-right cluster: x > HUB_X+150, y < HUB_Y-120
  //  - side clusters: y ~ HUB_Y +/- 40, x far out
  //  - below clusters: y > HUB_Y+120
  //
  const sources = useMemo(
    () => [
      // upper left cloud
      { x: HUB_X - 260, y: HUB_Y - 200, color: "#00CFEA" },
      { x: HUB_X - 200, y: HUB_Y - 220, color: "#7050FF" },
      { x: HUB_X - 150, y: HUB_Y - 180, color: "#00CFEA" },
      { x: HUB_X - 300, y: HUB_Y - 140, color: "#7050FF" },
      { x: HUB_X - 220, y: HUB_Y - 120, color: "#7050FF" },

      // upper right cloud
      { x: HUB_X + 220, y: HUB_Y - 230, color: "#7050FF" },
      { x: HUB_X + 280, y: HUB_Y - 190, color: "#00CFEA" },
      { x: HUB_X + 180, y: HUB_Y - 170, color: "#7050FF" },
      { x: HUB_X + 300, y: HUB_Y - 130, color: "#00CFEA" },
      { x: HUB_X + 210, y: HUB_Y - 110, color: "#7050FF" },

      // lateral left band
      { x: HUB_X - 320, y: HUB_Y - 20, color: "#00CFEA" },
      { x: HUB_X - 340, y: HUB_Y + 30, color: "#7050FF" },
      { x: HUB_X - 260, y: HUB_Y + 10, color: "#00CFEA" },

      // lateral right band
      { x: HUB_X + 320, y: HUB_Y - 10, color: "#7050FF" },
      { x: HUB_X + 360, y: HUB_Y + 40, color: "#00CFEA" },
      { x: HUB_X + 260, y: HUB_Y + 20, color: "#7050FF" },

      // lower cluster
      { x: HUB_X - 200, y: HUB_Y + 200, color: "#00CFEA" },
      { x: HUB_X - 80,  y: HUB_Y + 240, color: "#7050FF" },
      { x: HUB_X + 90,  y: HUB_Y + 230, color: "#00CFEA" },
      { x: HUB_X + 210, y: HUB_Y + 190, color: "#7050FF" },
    ],
    [HUB_X, HUB_Y]
  );

  //
  // 2. GENERATE A NICE BEZIER PATH FOR EACH SOURCE
  //
  // We create a curved path from (sx, sy) to (HUB_X, HUB_Y).
  // We'll pick two control points that pull the line inward and "bow" it.
  //
  // Trick:
  // - midpoint toward hub (mx, my)
  // - compute a perpendicular nudge to create curvature
  //
  const paths = useMemo(() => {
    return sources.map((src, i) => {
      const sx = src.x;
      const sy = src.y;
      const tx = HUB_X;
      const ty = HUB_Y;

      // midpoint between source and hub
      const mx = (sx + tx) / 2;
      const my = (sy + ty) / 2;

      // direction vector from source to hub
      const dx = tx - sx;
      const dy = ty - sy;

      // length ~ how far apart they are
      const dist = Math.hypot(dx, dy) || 1;

      // normalized perpendicular vector
      // perpendicular of (dx, dy) is (-dy, dx)
      const px = (-dy / dist);
      const py = ( dx / dist);

      // how hard to bow. Farther sources get a bigger bend,
      // but it's also nice to alternate sign for variety.
      const bend = Math.min(60, dist * 0.2); // cap at 60px of sideways bow
      const sign = i % 2 === 0 ? 1 : -1;

      // control points:
      // c1 is closer to the source, nudged outward
      const c1x = (sx + mx) / 2 + px * bend * 0.6 * sign;
      const c1y = (sy + my) / 2 + py * bend * 0.6 * sign;

      // c2 is closer to the hub, nudged inward but less
      const c2x = (mx + tx) / 2 + px * bend * 0.2 * sign;
      const c2y = (my + ty) / 2 + py * bend * 0.2 * sign;

      // Build the cubic Bezier path string "M sx sy C c1x c1y, c2x c2y, tx ty"
      const d = `
        M ${sx} ${sy}
        C ${c1x} ${c1y},
          ${c2x} ${c2y},
          ${tx} ${ty}
      `;

      return {
        d,
        color: src.color,
        startX: sx,
        startY: sy,
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
        {/* Draw all source nodes */}
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

        {/* Draw all paths from sources to hub */}
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

        {/* Little interconnecting "braid" feelers between nearby sources,
           optional flavor to keep: we'll reuse branchReveal.
           We'll connect a few arbitrary neighboring sources so it feels
           like ideas mixing before hitting Bloom.
        */}
        {sources.slice(0, 5).map((src, i) => {
          if (i === 0) return null;
          const prev = sources[i - 1];
          return (
            <motion.path
              key={`braid-${i}`}
              d={`M ${prev.x} ${prev.y} C ${(prev.x + src.x) / 2} ${(prev.y + src.y) / 2}, ${(src.x + HUB_X) / 2} ${(src.y + HUB_Y) / 2}, ${HUB_X} ${HUB_Y}`}
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

        {/* HUB glow (sits exactly at hero card location) */}
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

      {/* HERO CARD anchored visually to HUB_X, HUB_Y.
         top:"40%" + translateY(-50%) ≈ HUB_Y=360 in our current 1000x800 viewBox,
         which is why the paths aim there.
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

          {/* Tagline: appears only once convergence is happening */}
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
