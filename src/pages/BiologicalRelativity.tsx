import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import agingDiag from "@/assets/aging_diag.png";
import epiModif from "@/assets/epigenetic_modif.png";
import manifold from "@/assets/manifold.png";
import tableComp from "@/assets/tabel_comparison.png";


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
              Aging is usually described in ordinary time: you are 28, then 29, then 30. But biology doesn’t actually age in a straight line. 
              On the inside, cells accumulate molecular changes: damage to DNA, epigenetic alterations to gene regulation, stress responses, repair attempts. 
            </p>

            <div className="w-full aspect-video rounded-lg overflow-hidden">
              <img
                src={agingDiag}
                alt="Aging Visualization"
                className="w-full h-full object-cover"
              />
            </div>

            <p>
              These changes don’t add up smoothly; they compound and self-amplify. Over time, a kind of positive feedback loop emerges: 
              molecular changes destabilize cellular function, that instability causes more DNA damage, and that damage in turn 
              pushes more molecular dysregulation [1].
            </p>

            <p>
              In other words: time may feel linear to you, but it is not linear to your cells.
            </p>

            <p>
              We explored a speculative framework we call biological relativity [2]: could we treat biological age the way physics treats time in general 
              relativity? In Einstein’s view, time is not absolute; it stretches or compresses depending on how fast you’re moving or how much 
              gravity you’re experiencing. Our proposal is to treat aging the same way — not as a universal clock, but as a local clock defined by 
              what a cell is actually experiencing.
            </p>

            <p>
              To do this, we first make a simplifying move. Aging is incredibly complex, but a lot of modern work suggests that epigenetic modifications — 
              changes to how genes are expressed without altering the DNA sequence itself — are powerful predictors of cellular age. These include things 
              like DNA methylation, histone modifications, microRNA regulation, etc. We treat that accumulation as a signal.
            </p>

            <p>
              In our model, we imagine that signal as a function EPI(t) that evolves over “time.” We decompose it into two parts:
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

            <div className="w-full aspect-video rounded-lg overflow-hidden">
              <img
                src={epiModif}
                alt="Epigenetic Modifications Visualization"
                className="w-full h-full object-cover"
              />
            </div>

            <p>
              Now here’s the key move: instead of assuming your chronological age (calendar time) is the correct time axis for that process, 
              we define a new “proper time” for the cell — a biological time, t′. We frame each biological process 
              (for example, the rate of DNA methylation change) as if it’s moving through its own space, a manifold of possible states. 
              You can imagine the state of that process as a point traveling along a path in that space, speeding up or slowing down as the 
              process accelerates or relaxes.
            </p>

            <div className="w-full aspect-video rounded-lg overflow-hidden">
              <img
                src={manifold}
                alt="Manifold Visualization"
                className="w-full h-full object-cover"
              />
            </div>

            <p>
              In relativity, a moving clock runs differently than a stationary one. We borrow that: if a given cellular process is “moving fast” — 
              meaning the rate of change of something like methylation is very high — then its internal time t′ dilates relative to physical time t. 
              If that process is very stable, t′ contracts. Mathematically, we express this with an analogue of the Lorentz factor: the faster 
              the biological rate changes (its “velocity”), the more its experienced time diverges from normal time. The result is that each process 
              has its own biological clock, defined from inside the process instead of from outside the organism.
            </p>

            <div className="w-full aspect-video rounded-lg overflow-hidden">
              <img
                src={tableComp}
                alt="Comparison Table Visualization"
                className="w-full h-full object-cover"
              />
            </div>

            <p>
              That means your body may not have one global age, but many local — one per process, per tissue, maybe per organ. Different organs almost certainly 
              run different clocks. The skin, constantly exposed to UV and abrasion, will accumulate epigenetic disruptions differently than cardiac 
              tissue, which is under mechanical and metabolic stress but protected from direct environment. So the “speed” of aging in skin vs heart is 
              not the same, and therefore their internal times t′ are not the same. In our framework, you could theoretically compute a global biological 
              age by combining the “proper time” of many processes or organs, potentially weighting them the way thermodynamics would weight subsystems 
              inside a mostly closed system. 
            </p>

            <p>
              To test whether this is more than poetry, we propose a validation step: compare our predicted biological time with outputs from deep
               learning models that estimate biological age using DNA methylation patterns [3]. If our relativistic t′ lines up with those biological-age 
               predictors, that’s evidence that we’re not just renaming things — we’re measuring a real internal clock.
            </p>

            <p>
              Why do this at all? Because if biological age is really “experienced time,” not calendar time, then aging is not purely destiny. 
              It’s kinematics. If you can slow the local rate of damaging change — reduce the “velocity” of certain processes — you might literally 
              dilate biological time for that tissue. 
            </p>

            <p>
              That opens up two radical questions:
            </p>

            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                Could we target different organs differently, because they clearly don’t age on the same timeline? 
              </li>
              <li>
                If the mapping between physical time t and biological time t′ is reversible (mathematically bijective), could that imply that some 
                aspects of aging are, in principle, rewritable?
              </li>
            </ul>

            <p>
              Sources:
            </p>

            <p>
              [1] Soto-Palma C, Niedernhofer LJ, Faulk CD, Dong X. Epigenetics, DNA damage, and aging. J Clin Invest. 2022 Aug 15;132(16):e158446. doi: 10.1172/JCI158446. PMID: 35968782; PMCID: PMC9374376.
            </p>
            <p> 
              [2] Maestrini D, Abler D, Adhikarla V, Armenian S, Branciamore S, Carlesso N, Kuo YH, Marcucci G, Sahoo P, Rockne RC. Aging in a Relativistic Biological Space-Time. Front Cell Dev Biol. 2018 May 29;6:55. doi: 10.3389/fcell.2018.00055. PMID: 29896473; PMCID: PMC5986934.            
            </p>
            <p>
              [3] Prosz, A., Pipek, O., Börcsök, J. et al. Biologically informed deep learning for explainable epigenetic clocks. Sci Rep 14, 1306 (2024). https://doi.org/10.1038/s41598-023-50495-5            
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
