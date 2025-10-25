import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

interface IntroPageProps {
  onComplete: () => void;
}

const philosophicalQuestions = [
  { text: "Can cells dream?", delay: 0, animation: "animate-float" },
  { text: "What if DNA was a language?", delay: 2, animation: "animate-float-slow" },
  { text: "Could empathy be engineered?", delay: 4, animation: "animate-float-slower" },
  { text: "What does it mean to be alive?", delay: 1, animation: "animate-float" },
  { text: "Is consciousness chemical?", delay: 3, animation: "animate-float-slow" },
  { text: "Can biology think?", delay: 5, animation: "animate-float-slower" },
  { text: "What new forms of life could be emulated?", delay: 6, animation: "animate-float-slower" },
  { text: "Can we decode how cells compute their own fate?", delay: 7, animation: "animate-float" },
  { text: "Is evolution an algorithm or an accident?", delay: 8, animation: "animate-float-slower" },
  { text: "Could life reverse its own aging??", delay: 9, animation: "animate-float-slow" },
  { text: "When does simulation become creation?", delay: 10, animation: "animate-float" },
  { text: "Are we the authors or the readers of life?", delay: 11, animation: "animate-float-slow" },

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
      style={{ backgroundColor: "#FFFFE3" }}
      onClick={handleTransition}
    >
      {/* Floating Questions Background */}
      <div className="absolute inset-0 pointer-events-none">
        {philosophicalQuestions.map((q, index) => (
          <div
            key={index}
            className={`absolute text-philosophical font-light tracking-wide ${q.animation}`}
            style={{
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
            <p className="text-lg md:text-xl text-muted-foreground font-light">
              Where biology challenges ideas — and ideas reshape biology
            </p>
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
                className="w-full px-6 py-6 text-center text-lg bg-white border-2 border-border hover:border-accent focus:border-accent transition-colors rounded-full"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
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
