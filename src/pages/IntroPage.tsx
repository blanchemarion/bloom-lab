import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

interface IntroPageProps {
  onComplete: () => void;
}

const philosophicalQuestions = [
  { text: "Can cells dream?", delay: 0, animation: "animate-float" },
  { text: "What if DNA was a language?", delay: 0, animation: "animate-float-slow" },
  { text: "Could empathy be engineered?", delay: 0, animation: "animate-float-slower" },
  { text: "What does it mean to be alive?", delay: 0, animation: "animate-float" },
  { text: "Is consciousness chemical?", delay: 0, animation: "animate-float-slow" },
  { text: "Can biology think?", delay: 0, animation: "animate-float-slower" },
  { text: "What new forms of life could be emulated?", delay: 0, animation: "animate-float-slower" },
  { text: "Can we decode how cells compute their own fate?", delay: 0, animation: "animate-float" },
  { text: "Is evolution an algorithm or an accident?", delay: 0, animation: "animate-float-slower" },
  { text: "Could life reverse its own aging??", delay: 0, animation: "animate-float-slow" },
  { text: "When does simulation become creation?", delay: 0, animation: "animate-float-slower" },
  { text: "Are we the authors or the readers of life?", delay: 0, animation: "animate-float" },
];

const IntroPage = ({ onComplete }: IntroPageProps) => {
  const [question, setQuestion] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTransition();
  };

  const handleTransition = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden cursor-pointer ${
        isExiting ? "animate-fade-out" : "animate-fade-in"
      }`}
      style={{ backgroundColor: "#121212" }}
      onClick={handleTransition}
    >
      {/* Floating Questions Background */}
      <div className="absolute inset-0 pointer-events-none">
        {philosophicalQuestions.map((q, index) => (
          <div
            key={index}
            className={`absolute font-light tracking-wide ${q.animation}`}
            style={{
              color: "#00CFEA", // cyan
              left: `${10 + (index * 15) % 80}%`,
              top: `${15 + (index * 20) % 70}%`,
              animationDelay: `${q.delay}s`,
              fontSize: `${1 + (index % 3) * 0.2}rem`,
            }}
          >
            {q.text}
          </div>
        ))}
      </div>

      {/* Central Input Area */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-2xl text-center space-y-8">
          <div className="space-y-4">
            <img
              src="/logo_bloom.png"
              alt="Bloom Lab Logo"
              className="mx-auto w-48 md:w-64 object-contain"
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
                  bg-white text-black
                  border-2
                  transition-colors
                  focus:outline-none
                `}
                style={{
                  borderColor: "#00CFEA", // cyan default
                }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = "#7050FF"; // violet on focus
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = "#00CFEA"; // back to cyan
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = "#7050FF"; // violet hover
                }}
                onMouseLeave={(e) => {
                  // only revert if not focused
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
                  p-2 rounded-full
                  transition-colors
                  flex items-center justify-center
                `}
                style={{
                  color: "#121212", // dark icon on default
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#7050FF"; // violet bg
                  (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF"; // white icon
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
    </div>
  );
};

export default IntroPage;
