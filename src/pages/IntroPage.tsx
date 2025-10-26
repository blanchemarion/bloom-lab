import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

interface IntroPageProps {
  onComplete: () => void;
}

interface FloatingQuestion {
  text: string;
  baseX: number; // %
  baseY: number; // %
  sizeRem: number;
  attractStrength: number;
  orbitOffsetX: number;
  orbitOffsetY: number;
}

const QUESTIONS: FloatingQuestion[] = [
  {
    text: "Can cells dream?",
    baseX: 12,
    baseY: 20,
    sizeRem: 1,
    attractStrength: 0.025,
    orbitOffsetX: -80,
    orbitOffsetY: -40,
  },
  {
    text: "What if DNA was a language?",
    baseX: 35,
    baseY: 10,
    sizeRem: 1.2,
    attractStrength: 0.02,
    orbitOffsetX: 60,
    orbitOffsetY: -20,
  },
  {
    text: "Could empathy be engineered?",
    baseX: 70,
    baseY: 18,
    sizeRem: 1,
    attractStrength: 0.03,
    orbitOffsetX: -40,
    orbitOffsetY: 40,
  },
  {
    text: "What does it mean to be alive?",
    baseX: 20,
    baseY: 60,
    sizeRem: 1.4,
    attractStrength: 0.018,
    orbitOffsetX: 100,
    orbitOffsetY: -60,
  },
  {
    text: "Is consciousness chemical?",
    baseX: 60,
    baseY: 65,
    sizeRem: 1,
    attractStrength: 0.022,
    orbitOffsetX: -120,
    orbitOffsetY: 20,
  },
  {
    text: "Can biology think?",
    baseX: 80,
    baseY: 40,
    sizeRem: 1.2,
    attractStrength: 0.026,
    orbitOffsetX: 40,
    orbitOffsetY: 80,
  },
  {
    text: "What new forms of life could be emulated?",
    baseX: 45,
    baseY: 80,
    sizeRem: 1,
    attractStrength: 0.02,
    orbitOffsetX: -60,
    orbitOffsetY: -80,
  },
  {
    text: "Can we decode how cells compute their own fate?",
    baseX: 10,
    baseY: 40,
    sizeRem: 1.1,
    attractStrength: 0.028,
    orbitOffsetX: 80,
    orbitOffsetY: 0,
  },
  {
    text: "Is evolution an algorithm or an accident?",
    baseX: 30,
    baseY: 30,
    sizeRem: 1,
    attractStrength: 0.02,
    orbitOffsetX: -30,
    orbitOffsetY: 90,
  },
  {
    text: "Could life reverse its own aging?",
    baseX: 75,
    baseY: 75,
    sizeRem: 1.2,
    attractStrength: 0.03,
    orbitOffsetX: 20,
    orbitOffsetY: -90,
  },
  {
    text: "When does simulation become creation?",
    baseX: 55,
    baseY: 50,
    sizeRem: 1,
    attractStrength: 0.018,
    orbitOffsetX: -100,
    orbitOffsetY: 60,
  },
  {
    text: "Are we the authors or the readers of life?",
    baseX: 85,
    baseY: 55,
    sizeRem: 1.3,
    attractStrength: 0.02,
    orbitOffsetX: 100,
    orbitOffsetY: -40,
  },
];

const IntroPage = ({ onComplete }: IntroPageProps) => {
  // form / exit
  const [question, setQuestion] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  // cursor tracking (in px)
  const cursorRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // question positions (in px)
  // we'll init them based on baseX/baseY %
  const [positions, setPositions] = useState(
    () =>
      QUESTIONS.map((q) => ({
        x: (q.baseX / 100) * window.innerWidth,
        y: (q.baseY / 100) * window.innerHeight,
      })) // array of {x,y}
  );

  // refs so RAF loop can mutate smoothly without causing rerender on every frame
  const posRef = useRef(positions);

  useEffect(() => {
    posRef.current = positions;
  }, [positions]);

  // mouse move handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    cursorRef.current.x = e.clientX;
    cursorRef.current.y = e.clientY;
  }, []);

  // animation loop
  useEffect(() => {
    let frame: number;

    const tick = () => {
      const next = posRef.current.map((p, i) => {
        const q = QUESTIONS[i];

        // target for this question = cursor + its orbitOffset (so they don't stack)
        const targetX = cursorRef.current.x + q.orbitOffsetX;
        const targetY = cursorRef.current.y + q.orbitOffsetY;

        // gently move current position toward target
        const dx = targetX - p.x;
        const dy = targetY - p.y;

        const newX = p.x + dx * q.attractStrength;
        const newY = p.y + dy * q.attractStrength;

        // add a tiny ambient float (sin/cos jitter)
        const t = performance.now() * 0.001;
        const jitterX = Math.sin(t + i) * 0.3;
        const jitterY = Math.cos(t * 0.8 + i * 2.17) * 0.3;

        return {
          x: newX + jitterX,
          y: newY + jitterY,
        };
      });

      // commit batched positions ~60fps max
      setPositions(next);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // exit transition logic
  const handleTransition = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTransition();
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${
        isExiting ? "animate-fade-out" : "animate-fade-in"
      }`}
      style={{ backgroundColor: "#121212", cursor: "none" }}
      onClick={handleTransition}
      onMouseMove={handleMouseMove}
    >
      {/* Floating Questions Layer */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {QUESTIONS.map((q, i) => (
          <div
            key={i}
            className="absolute font-light tracking-wide transition-colors duration-300 will-change-transform"
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

      {/* Central Input Area */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div
          className="w-full max-w-2xl text-center space-y-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-4">
            <img
              src="/logo_bloom.png"
              alt="Bloom Lab Logo"
              className="mx-auto w-48 md:w-64 object-contain pointer-events-auto"
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
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
                    (e.target as HTMLInputElement).style.borderColor = "#00CFEA";
                  }
                }}
              />

              {/* Submit button / arrow */}
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
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#7050FF";
                  (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "#121212";
                }}
                aria-label="Submit question"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Optional: fake cursor glow so people aren't "cursor: none" blind */}
      <div
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl opacity-40 mix-blend-screen"
        style={{
          left: cursorRef.current.x,
          top: cursorRef.current.y,
          width: "180px",
          height: "180px",
          background:
            "radial-gradient(circle at center, rgba(0,207,234,0.4) 0%, rgba(18,18,18,0) 70%)",
        }}
      />
    </div>
  );
};

export default IntroPage;
