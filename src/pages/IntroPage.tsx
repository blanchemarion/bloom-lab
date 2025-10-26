import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

interface IntroPageProps {
  onComplete: () => void;
}

interface FloatingQuestion {
  text: string;
  sizeRem: number;
  attractStrength: number;
}

const QUESTIONS: FloatingQuestion[] = [
  { text: "Can cells dream?", sizeRem: 1, attractStrength: 0.03 },
  { text: "What if DNA was a language?", sizeRem: 1.2, attractStrength: 0.025 },
  { text: "Could empathy be engineered?", sizeRem: 1, attractStrength: 0.03 },
  { text: "What does it mean to be alive?", sizeRem: 1.4, attractStrength: 0.02 },
  { text: "Is consciousness chemical?", sizeRem: 1, attractStrength: 0.028 },
  { text: "Can biology think?", sizeRem: 1.2, attractStrength: 0.026 },
  { text: "What new forms of life could be emulated?", sizeRem: 1, attractStrength: 0.024 },
  { text: "Can we decode how cells compute their own fate?", sizeRem: 1.1, attractStrength: 0.03 },
  { text: "Is evolution an algorithm or an accident?", sizeRem: 1, attractStrength: 0.022 },
  { text: "Could life reverse its own aging?", sizeRem: 1.2, attractStrength: 0.028 },
  { text: "When does simulation become creation?", sizeRem: 1, attractStrength: 0.02 },
  { text: "Are we the authors or the readers of life?", sizeRem: 1.3, attractStrength: 0.024 },
];

const IntroPage = ({ onComplete }: IntroPageProps) => {
  // state
  const [question, setQuestion] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  // cursor position (for the swarm & aura)
  const cursorRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  // floating question positions
  const [positions, setPositions] = useState(() =>
    QUESTIONS.map((_, i) => ({
      x:
        window.innerWidth * 0.5 +
        Math.cos((i / QUESTIONS.length) * Math.PI * 2) * 400,
      y:
        window.innerHeight * 0.5 +
        Math.sin((i / QUESTIONS.length) * Math.PI * 2) * 250,
    }))
  );
  const posRef = useRef(positions);
  useEffect(() => {
    posRef.current = positions;
  }, [positions]);

  // orbit configs
  const orbitRef = useRef<
    { baseAngle: number; radius: number; radiusY: number }[]
  >(
    QUESTIONS.map((_, i) => {
      const baseAngle = (i / QUESTIONS.length) * Math.PI * 2;
      const radius = 120 + (i % 4) * 40; // tighter halo values you chose
      const radiusY = radius * 0.8;
      return { baseAngle, radius, radiusY };
    })
  );

  // track mouse
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    cursorRef.current.x = e.clientX;
    cursorRef.current.y = e.clientY;
  }, []);

  // swarm animation loop
  useEffect(() => {
    let frame: number;

    const tick = () => {
      const now = performance.now() * 0.001;
      const spinSpeed = 0.05;

      const next = posRef.current.map((p, i) => {
        const q = QUESTIONS[i];
        const orbit = orbitRef.current[i];

        const angle = orbit.baseAngle + now * spinSpeed;

        const offsetX = Math.cos(angle) * orbit.radius;
        const offsetY = Math.sin(angle) * orbit.radiusY;

        const targetX = cursorRef.current.x + offsetX;
        const targetY = cursorRef.current.y + offsetY;

        const dx = targetX - p.x;
        const dy = targetY - p.y;

        const follow = q.attractStrength;
        let newX = p.x + dx * follow;
        let newY = p.y + dy * follow;

        const jitterX = Math.sin(now * 2 + i * 1.37) * 0.4;
        const jitterY = Math.cos(now * 1.6 + i * 2.11) * 0.4;

        newX += jitterX;
        newY += jitterY;

        return { x: newX, y: newY };
      });

      setPositions(next);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // transition helper
  const handleTransition = () => {
    if (isExiting) return; // prevent double-trigger spam
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  // submit arrow / Enter key also completes intro
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTransition();
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${
        isExiting ? "animate-fade-out" : "animate-fade-in"
      }`}
      style={{
        backgroundColor: "#121212",
        cursor: "none",
      }}
      onClick={handleTransition}
      onMouseMove={handleMouseMove}
    >
      {/* Floating swarm */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {QUESTIONS.map((q, i) => (
          <div
            key={i}
            className="absolute font-light tracking-wide will-change-transform transition-colors duration-300"
            style={{
              color: "#00CFEA",
              left: 0,
              top: 0,
              transform: `translate(${positions[i].x}px, ${positions[i].y}px)`,
              fontSize: `${q.sizeRem}rem`,
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            {q.text}
          </div>
        ))}
      </div>

      {/* Center card / logo / input */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-2xl text-center space-y-8">
          <div className="space-y-4">
            <img
              src="/logo_bloom.png"
              alt="Bloom Lab Logo"
              className="mx-auto w-48 md:w-64 object-contain pointer-events-auto"
            />
          </div>

          <form onSubmit={handleSubmit} className="relative pointer-events-auto">
            <div className="relative group">
              <Input
                type="text"
                placeholder="What would you ask the universe, if it could answer?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className={`
                  w-full px-6 py-6 text-center text-lg rounded-full
                  bg-white text-black border-2
                  focus:outline-none transition-colors
                `}
                style={{
                  borderColor: "#00CFEA",
                }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = "#7050FF";
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = "#00CFEA";
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = "#7050FF";
                }}
                onMouseLeave={(e) => {
                  if (document.activeElement !== e.target) {
                    (e.target as HTMLInputElement).style.borderColor =
                      "#00CFEA";
                  }
                }}
              />

              <button
                type="submit"
                className={`
                  absolute right-4 top-1/2 -translate-y-1/2
                  p-2 rounded-full flex items-center justify-center
                  transition-colors
                `}
                style={{
                  color: "#121212",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#7050FF";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#121212";
                }}
                aria-label="Submit question"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* tiny hint text so users know they can click */}
          <div
            className="text-sm text-white/50 tracking-wide"
            style={{ fontFamily: "sans-serif" }}
          >
            click anywhere to enter
          </div>
        </div>
      </div>

      {/* cursor aura */}
      <div
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl opacity-40 mix-blend-screen"
        style={{
          left: cursorRef.current.x,
          top: cursorRef.current.y,
          width: "220px",
          height: "220px",
          background:
            "radial-gradient(circle at center, rgba(0,207,234,0.4) 0%, rgba(18,18,18,0) 70%)",
        }}
      />
    </div>
  );
};

export default IntroPage;
