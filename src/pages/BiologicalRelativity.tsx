import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import agingDiag from "@/assets/aging_diag.webp";
import epiModif from "@/assets/epigenetic_modif.webp";
import manifold from "@/assets/manifold.webp";
import tableComp from "@/assets/table_comparison.webp";

const Figure = ({ src, alt, wide = false }: { src: string; alt: string; wide?: boolean }) => (
  <figure className={`my-12 ${wide ? "md:-mx-20" : "md:-mx-8"}`}>
    <div className="overflow-hidden rounded-2xl border border-bloom-dark/10 bg-white/45 p-3 shadow-[0_18px_55px_rgba(28,39,58,0.05)] md:p-5">
      <img src={src} alt={alt} className="h-auto w-full rounded-xl object-contain" />
    </div>
  </figure>
);

const ReadingBlock = ({ children }: { children: ReactNode }) => (
  <div className="space-y-6 text-[1.05rem] leading-[1.85] text-bloom-dark/80 md:text-lg">{children}</div>
);

const BiologicalRelativity = () => (
  <main className="min-h-screen bg-background text-foreground">
    <header className="border-b border-bloom-dark/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/#emerged-work" className="group flex items-center gap-2 text-sm text-bloom-dark/65 transition-colors hover:text-bloom-violet">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Emerged Work
        </Link>
        <Link to="/#molecule" aria-label="Return to the Bloom Lab molecule introduction" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bloom-deep">
          <picture><source srcSet={import.meta.env.BASE_URL + "logo_blue-96.webp"} type="image/webp" /><img src={import.meta.env.BASE_URL + "logo_blue.png"} width="7133" height="7174" decoding="async" alt="" className="h-8 w-8 object-contain md:h-9 md:w-9" /></picture>
        </Link>
      </div>
    </header>

    <article className="pb-24 md:pb-32">
      <header className="mx-auto max-w-5xl px-6 pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-bloom-violet">
          <span>Research Project · 2024</span>
        </div>
        <h1 className="mt-7 max-w-4xl font-platypi text-4xl font-light leading-[1.08] tracking-[-0.025em] text-bloom-dark sm:text-5xl md:text-6xl">
          Biological Relativity: Modeling Aging With Spacetime
        </h1>
        <div className="mt-10 grid gap-2 border-l-2 border-bloom-violet/35 pl-5 text-sm leading-relaxed text-bloom-dark/65 sm:grid-cols-[7rem_1fr] sm:gap-5">
          <span className="font-medium uppercase tracking-[0.1em] text-bloom-dark/45">Authors</span>
          <p>Lucie Vanhollebeke, Blanche Marion</p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6">
        <section className="rounded-2xl bg-white/55 p-7 shadow-[0_12px_40px_rgba(28,39,58,0.035)] md:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-bloom-violet">Abstract</p>
          <p className="mt-5 font-platypi text-lg font-light leading-[1.75] text-bloom-dark md:text-xl">
            Biological Relativity explores aging not as the uniform passage of chronological time, but as a collection of local biological clocks shaped by molecular change. Drawing an analogy with general relativity, the framework defines a process-specific “proper time” from the rate at which epigenetic states evolve under the influence of damage, repair, and environmental factors. These clocks could explain why different tissues and organs age at different rates and be combined into a systemic measure of biological age. By comparing this measure with deep-learning epigenetic clocks, the project aims to test whether relativistic biological time captures meaningful aging trajectories and could inform tissue-specific interventions.
          </p>
        </section>

        <section className="mt-16 border-t border-bloom-dark/10 pt-9 md:mt-20 md:pt-11">
          <ReadingBlock>
            <p>Aging is usually described in ordinary time: you are 28, then 29, then 30. But biology doesn’t actually age in a straight line. On the inside, cells accumulate molecular changes: damage to DNA, epigenetic alterations to gene regulation, stress responses, repair attempts.</p>

            <Figure src={agingDiag} alt="Aging Visualization" />

            <p>These changes don’t add up smoothly; they compound and self-amplify. Over time, a kind of positive feedback loop emerges: molecular changes destabilize cellular function, that instability causes more DNA damage, and that damage in turn pushes more molecular dysregulation [1].</p>
            <p>In other words: time may feel linear to you, but it is not linear to your cells.</p>
            <p>We explored a speculative framework we call biological relativity [2]: could we treat biological age the way physics treats time in general relativity? In Einstein’s view, time is not absolute; it stretches or compresses depending on how fast you’re moving or how much gravity you’re experiencing. Our proposal is to treat aging the same way — not as a universal clock, but as a local clock defined by what a cell is actually experiencing.</p>
            <p>To do this, we first make a simplifying move. Aging is incredibly complex, but a lot of modern work suggests that epigenetic modifications — changes to how genes are expressed without altering the DNA sequence itself — are powerful predictors of cellular age. These include things like DNA methylation, histone modifications, microRNA regulation, etc. We treat that accumulation as a signal.</p>
            <p>In our model, we imagine that signal as a function EPI(t) that evolves over “time.” We decompose it into two parts:</p>

            <ul className="space-y-4 border-l border-bloom-violet/25 pl-6">
              <li>A baseline exponential accumulation of epigenetic changes, which ramps faster as the cell does work and ages</li>
              <li>Plus an environmental modulation sitting on top, adding oscillations driven by lived experience — stress, sleep, nutrition, light exposure, social context, etc.</li>
            </ul>

            <p>So instead of a smooth curve, you get a twitchy, pulsatile, unstable trajectory.</p>

            <Figure src={epiModif} alt="Epigenetic Modifications Visualization" wide />

            <p>Now here’s the key move: instead of assuming your chronological age (calendar time) is the correct time axis for that process, we define a new “proper time” for the cell — a biological time, t′. We frame each biological process (for example, the rate of DNA methylation change) as if it’s moving through its own space, a manifold of possible states. You can imagine the state of that process as a point traveling along a path in that space, speeding up or slowing down as the process accelerates or relaxes.</p>

            <Figure src={manifold} alt="Manifold Visualization" />

            <p>In relativity, a moving clock runs differently than a stationary one. We borrow that: if a given cellular process is “moving fast” — meaning the rate of change of something like methylation is very high — then its internal time t′ dilates relative to physical time t. If that process is very stable, t′ contracts. Mathematically, we express this with an analogue of the Lorentz factor: the faster the biological rate changes (its “velocity”), the more its experienced time diverges from normal time. The result is that each process has its own biological clock, defined from inside the process instead of from outside the organism.</p>

            <Figure src={tableComp} alt="Comparison Table Visualization" wide />

            <p>That means your body may not have one global age, but many local — one per process, per tissue, maybe per organ. Different organs almost certainly run different clocks. The skin, constantly exposed to UV and abrasion, will accumulate epigenetic disruptions differently than cardiac tissue, which is under mechanical and metabolic stress but protected from direct environment. So the “speed” of aging in skin vs heart is not the same, and therefore their internal times t′ are not the same. In our framework, you could theoretically compute a global biological age by combining the “proper time” of many processes or organs, potentially weighting them the way thermodynamics would weight subsystems inside a mostly closed system.</p>
            <p>To test whether this is more than poetry, we propose a validation step: compare our predicted biological time with outputs from deep learning models that estimate biological age using DNA methylation patterns [3]. If our relativistic t′ lines up with those biological-age predictors, that’s evidence that we’re not just renaming things — we’re measuring a real internal clock.</p>
            <p>Why do this at all? Because if biological age is really “experienced time,” not calendar time, then aging is not purely destiny. It’s kinematics. If you can slow the local rate of damaging change — reduce the “velocity” of certain processes — you might literally dilate biological time for that tissue.</p>
            <p>That opens up two radical questions:</p>

            <ul className="space-y-4 border-l border-bloom-violet/25 pl-6">
              <li>Could we target different organs differently, because they clearly don’t age on the same timeline?</li>
              <li>If the mapping between physical time t and biological time t′ is reversible (mathematically bijective), could that imply that some aspects of aging are, in principle, rewritable?</li>
            </ul>
          </ReadingBlock>
        </section>

        <section className="mt-16 border-t border-bloom-dark/10 pt-9 md:mt-20 md:pt-11">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-bloom-violet"><strong>Sources:</strong></p>
          <div className="mt-6 space-y-5 text-sm leading-[1.75] text-bloom-dark/65">
            <p>[1] Soto-Palma C, Niedernhofer LJ, Faulk CD, Dong X. Epigenetics, DNA damage, and aging. J Clin Invest. 2022 Aug 15;132(16):e158446. doi: 10.1172/JCI158446. PMID: 35968782; PMCID: PMC9374376.</p>
            <p>[2] Maestrini D, Abler D, Adhikarla V, Armenian S, Branciamore S, Carlesso N, Kuo YH, Marcucci G, Sahoo P, Rockne RC. Aging in a Relativistic Biological Space-Time. Front Cell Dev Biol. 2018 May 29;6:55. doi: 10.3389/fcell.2018.00055. PMID: 29896473; PMCID: PMC5986934.</p>
            <p>[3] Prosz, A., Pipek, O., Börcsök, J. et al. Biologically informed deep learning for explainable epigenetic clocks. Sci Rep 14, 1306 (2024). https://doi.org/10.1038/s41598-023-50495-5</p>
          </div>
        </section>

        <footer className="mt-20 border-t border-bloom-dark/10 pt-8">
          <Link to="/#emerged-work" className="group inline-flex items-center gap-2 text-sm text-bloom-dark/65 transition-colors hover:text-bloom-violet">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Emerged Work
          </Link>
        </footer>
      </div>
    </article>
  </main>
);

export default BiologicalRelativity;
