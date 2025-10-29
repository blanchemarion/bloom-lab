import { useRef, useMemo, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const NetworkIntroSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  // --- HUB POSITION IN SVG COORDS ---
  const HUB_X = 500;
  const HUB_Y = 360;


  // --- RADIAL SOURCE GENERATOR ---
  // We create N source nodes roughly in a ring around the hub.
  // Each gets:
  //   - angle spread across 360°
  //   - radius in [Rmin, Rmax] so some are closer, some far
  //   - alternating colors between cyan and violet
  const sources = useMemo(() => {
    const N = 28; // increase for denser bloom
    const Rmin = 180;
    const Rmax = 340;

    const arr: { x: number; y: number; color: string }[] = [];

    for (let i = 0; i < N; i++) {
      const baseAngle = (i / N) * Math.PI * 2; // even around circle
      const angleJitter = (Math.random() - 0.5) * 0.3; // ±0.15 rad ~ ±8.5°
      const a = baseAngle + angleJitter;

      const r =
        Rmin + (Rmax - Rmin) * (0.4 + 0.6 * Math.random());
      // bias toward farther-out so it feels big (0.4+0.6rand ~= [0.4,1])

      const sx = HUB_X + r * Math.cos(a);
      const sy = HUB_Y + r * Math.sin(a);

      const color = i % 2 === 0 ? "#00CFEA" : "#7050FF";

      arr.push({ x: sx, y: sy, color });
    }

    return arr;
  }, [HUB_X, HUB_Y]);


  // --- BUILD ALL CURVED PATHS THAT FLOW INTO HUB ---
  const paths = useMemo(() => {
    return sources.map((src, i) => {
      const sx = src.x;
      const sy = src.y;
      const tx = HUB_X;
      const ty = HUB_Y;

      // midpoint between source and hub
      const mx = (sx + tx) / 2;
      const my = (sy + ty) / 2;

      // direction + perp for curve shaping
      const dx = tx - sx;
      const dy = ty - sy;
      const dist = Math.hypot(dx, dy) || 1;

      const px = -dy / dist;
      const py = dx / dist;

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

  // -------------------------------------------------
  // ANIMATION CONTROLS
  // -------------------------------------------------

  // Controls for the network lines & hub glow
  const lineControls = useAnimation();

  // Controls for the hero text (logo + tagline)
  const heroControls = useAnimation();

  // Controls for hub pulse at the end
  const hubControls = useAnimation();

  // Variants for line drawing, with per-line stagger using `custom`
  const lineVariant = {
    hidden: { pathLength: 0 },
    draw: (i: number) => ({
      pathLength: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        delay: i * 0.06, // stagger
      },
    }),
  };

  // Small braided cross-talk lines (same idea)
  const braidVariant = {
    hidden: { pathLength: 0 },
    draw: (i: number) => ({
      pathLength: 1,
      transition: {
        duration: 1.0,
        ease: "easeInOut",
        delay: 0.3 + i * 0.08, // start them a bit later
      },
    }),
  };

  // choose a few neighbor pairs around the ring for "cross-talk"
  const braidPairs = useMemo(() => {
    const pairs: Array<[number, number]> = [];
    const Npairs = 8; // how many braids to draw

    for (let k = 0; k < Npairs; k++) {
      const i = Math.floor(Math.random() * sources.length);
      const j = (i + 1) % sources.length; // neighbor in the ring
      pairs.push([i, j]);
    }
    return pairs;
  }, [sources]);

  // Hub glow variant
  const hubVariant = {
    off: { opacity: 0, scale: 0.4 },
    on: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1.0, // hub starts glowing while lines are still drawing
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Hero text variant
  const heroVariant = {
    hidden: { opacity: 0, y: 20 },
    reveal: {
      opacity: 1,
      y: 0,
      transition: {
        // we will manually trigger this after lines are basically done
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // On mount:
  // 1. draw lines
  // 2. glow hub
  // 3. fade/slide in hero text
  useEffect(() => {
    // kick off line + hub animations in parallel
    lineControls.start("draw");
    hubControls.start("on");

    // after ~ total line draw (1.2s + last stagger ~ paths.length*0.06)
    const totalDelaySec = 1.2 + paths.length * 0.06 + 0.2;
    const timer = setTimeout(() => {
      heroControls.start("reveal");
    }, totalDelaySec * 1000);

    return () => clearTimeout(timer);
  }, [lineControls, heroControls, hubControls, paths.length]);

  return (
    <section
      ref={ref}
      className="relative w-full"
      style={{
        height: "95vh",
        backgroundColor: "#121212",
        overflow: "hidden",
      }}
    >
      {/* ---- BACKGROUND NETWORK SVG ---- */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.45 }}
      >
        {/* source nodes */}
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

        {/* converging rays */}
        {paths.map((p, i) => (
          <motion.path
            key={`path-${i}`}
            d={p.d}
            stroke={p.color}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            variants={lineVariant}
            initial="hidden"
            animate={lineControls}
            custom={i}
            style={{
              filter: `drop-shadow(0 0 8px ${p.color})`,
            }}
          />
        ))}

        {braidPairs.map(([i, j], idx) => {
          const A = sources[i];
          const B = sources[j];
          const braidColor = idx % 2 === 0 ? "#00CFEA" : "#7050FF";

          // curve from A -> midpoint between A & B -> hub
          const midX = (A.x + B.x) / 2;
          const midY = (A.y + B.y) / 2;

          const d = `
            M ${A.x} ${A.y}
            C ${ (A.x + midX) / 2 } ${ (A.y + midY) / 2 },
              ${ (midX + HUB_X) / 2 } ${ (midY + HUB_Y) / 2 },
              ${HUB_X} ${HUB_Y}
          `;

          return (
            <motion.path
              key={`braid-${idx}`}
              d={d}
              stroke={braidColor}
              strokeWidth={1.5}
              fill="none"
              strokeLinecap="round"
              variants={braidVariant}
              initial="hidden"
              animate={lineControls}
              custom={idx}
              style={{
                filter:
                  idx % 2 === 0
                    ? "drop-shadow(0 0 6px #00CFEA)"
                    : "drop-shadow(0 0 6px #7050FF)",
              }}
            />
          );
        })}

        {/* HUB GLOW PULSE */}
        <motion.circle
          cx={HUB_X}
          cy={HUB_Y}
          r={22}
          fill="#7050FF"
          variants={hubVariant}
          initial="off"
          animate={hubControls}
          style={{
            filter:
              "drop-shadow(0 0 18px rgba(112,80,255,0.8)) drop-shadow(0 0 36px rgba(0,207,234,0.4))",
          }}
        />
      </svg>

    
      {/* ---- HERO CONTENT ---- */}
      <div
        className="
          absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2
          pointer-events-none
          flex flex-col items-center text-center
        "
        style={{
          // wrapper stays locked to hub center
        }}
      >
        {/* soft radial glow (stays centered on hub) */}
        <div
          className="absolute -z-10 rounded-full blur-3xl"
          style={{
            width: "28rem",
            height: "28rem",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)", // <-- glow truly centered on hub
            background:
              "radial-gradient(circle at 50% 50%, rgba(112,80,255,0.35) 0%, rgba(0,207,234,0.15) 40%, rgba(0,0,0,0) 70%)",
            filter:
              "drop-shadow(0 0 40px rgba(112,80,255,0.5)) drop-shadow(0 0 80px rgba(0,207,234,0.3))",
          }}
        />

        {/* Logo + tagline block */}
        <motion.div
          variants={heroVariant}
          initial="hidden"
          animate={heroControls}
          className="flex flex-col items-center"
          style={{
            // THIS is the vertical nudge of just the text
            transform: "translateY(10rem)", // tune this value (e.g. 2rem, 3rem, 4rem)
          }}
        >
          {/* Bloom Lab logo wordmark */}
          {/*<img
            src="/bloom_written.png"
            alt="Bloom Lab"
            className="mx-auto w-64 md:w-80 object-contain"
            style={{
              filter:
                "drop-shadow(0 0 24px rgba(112,80,255,0.6)) drop-shadow(0 0 24px rgba(0,207,234,0.4))",
            }}
          />*/}

          {/* tagline */}
          <div
            className="text-white leading-snug font-light text-center"
            style={{
              fontSize: "1.5rem",
              marginTop: "0.05rem",
              textShadow:
                "0 0 16px rgba(0,0,0,0.6), 0 0 32px rgba(112,80,255,0.5)",
            }}
          >
            Bridging Disciplines. <br />
            Connecting People. <br />
            Decoding Life.
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default NetworkIntroSection;
