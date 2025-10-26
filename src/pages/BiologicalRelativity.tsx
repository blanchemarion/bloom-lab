import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import biologicalRelativityHero from "@/assets/biological-relativity-hero.png";

const BiologicalRelativity = () => {
  return (
    <div
      className="min-h-screen text-foreground"
      style={{ backgroundColor: "#121212" }}
    >
      {/* Navigation Back */}
      <header className="sticky top-0 z-50 w-full border-b border-[#1E1E1E] bg-black">
        <nav className="container mx-auto px-6 h-16 flex items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-white hover:text-bloom-cyan transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Hero Image */}
          <div className="w-full aspect-video rounded-lg overflow-hidden">
            <img
              src={biologicalRelativityHero}
              alt="Biological Relativity visualization"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title & Date */}
          <div className="space-y-2">
            <h1 className="text-hero bg-gradient-to-r from-bloom-cyan to-bloom-violet bg-clip-text text-transparent">
              Biological Relativity: Modeling Aging With Spacetime
            </h1>
            <p className="text-sm uppercase tracking-wide text-bloom-violet/70">
              2024
            </p>
          </div>

          {/* Content */}
          <div className="text-body-large space-y-6 text-white leading-relaxed">
            <p>
              Aging is usually described in ordinary time: you are 28, then 29, then 30. 
              But biology doesn't actually age in a straight line. On the inside, cells 
              accumulate molecular changes: damage to DNA, epigenetic alterations to gene 
              regulation, stress responses, repair attempts.
            </p>

            <p>
              These changes don't add up smoothly; they compound and self-amplify. Over time, 
              a kind of positive feedback loop emerges: molecular changes destabilize cellular 
              function, that instability causes more DNA damage, and that damage in turn pushes 
              more molecular dysregulation.
            </p>

            <p className="italic text-bloom-cyan">
              In other words: time may feel linear to you, but it is not linear to your cells.
            </p>

            <p>
              We explored a speculative framework we call <strong className="text-bloom-violet">biological relativity</strong>: 
              could we treat biological age the way physics treats time in general relativity? 
              In Einstein's view, time is not absolute; it stretches or compresses depending on 
              how fast you're moving or how much gravity you're experiencing. Our proposal is to 
              treat aging the same way — not as a universal clock, but as a local clock defined 
              by what a cell is actually experiencing.
            </p>

            <p>
              To do this, we first make a simplifying move. Aging is incredibly complex, but a 
              lot of modern work suggests that epigenetic modifications — changes to how genes 
              are expressed without altering the DNA sequence itself — are powerful predictors 
              of cellular age. These include things like DNA methylation, histone modifications, 
              microRNA regulation, etc. We treat that accumulation as a signal.
            </p>

            <p>
              In our model, we imagine that signal as a function <code className="text-bloom-cyan">EPI(t)</code> that 
              evolves over "time." We decompose it into two parts:
            </p>

            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                A baseline exponential accumulation of epigenetic changes, which ramps faster 
                as the cell does work and ages
              </li>
              <li>
                Plus an environmental modulation sitting on top, adding oscillations driven by 
                lived experience — stress, sleep, nutrition, light exposure, social context, etc.
              </li>
            </ul>

            <p>
              So instead of a smooth curve, you get a twitchy, pulsatile, unstable trajectory.
            </p>

            <p>
              Now here's the key move: instead of assuming your chronological age (calendar time) 
              is the correct time axis for that process, we define a new "proper time" for the 
              cell — a biological time, <code className="text-bloom-cyan">t′</code>. We frame 
              each biological process (for example, the rate of DNA methylation change) as if 
              it's moving through its own space, a manifold of possible states.
            </p>

            <p>
              This framework allows us to model how lived experience — what you eat, how you 
              sleep, your stress levels — doesn't just add linearly to your age. Instead, it 
              warps the local biological clock itself, making some cells age faster or slower 
              than others, even within the same body.
            </p>

            <p className="text-bloom-text-secondary text-sm pt-4 border-t border-bloom-violet/20">
              This work represents an exploratory approach to understanding biological aging 
              through the lens of physics, inviting new ways to think about time, biology, 
              and lived experience.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center text-sm border-t border-bloom-violet/40 text-muted-foreground">
        <p>© Bloom Lab</p>
      </footer>
    </div>
  );
};

export default BiologicalRelativity;
