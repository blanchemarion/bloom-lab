import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Figure1 from "@/assets/ReVamp1.webp";
import Figure2 from "@/assets/ReVamp2.webp";

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="mt-16 border-t border-bloom-dark/10 pt-9 md:mt-20 md:pt-11">
    <h2 className="font-platypi text-2xl font-light tracking-tight text-bloom-dark md:text-3xl">{title}</h2>
    <div className="mt-6 space-y-6 text-[1.05rem] leading-[1.85] text-bloom-dark/80 md:text-lg">{children}</div>
  </section>
);

const ResultFigure = ({ src, alt }: { src: string; alt: string }) => (
  <figure className="my-10 md:-mx-20">
    <div className="overflow-hidden rounded-2xl border border-bloom-dark/10 bg-white/45 p-3 shadow-[0_18px_55px_rgba(28,39,58,0.05)] md:p-5">
      <img src={src} alt={alt} className="h-auto w-full rounded-xl object-contain" />
    </div>
  </figure>
);

const ReVamp = () => (
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
          <span>Research Project · 2025</span>
        </div>
        <h1 className="mt-7 max-w-4xl font-platypi text-4xl font-light leading-[1.08] tracking-[-0.025em] text-bloom-dark sm:text-5xl md:text-6xl">ReVamp: Reading and Reversing Aging Through Blood</h1>
        <div className="mt-10 grid gap-2 border-l-2 border-bloom-violet/35 pl-5 text-sm leading-relaxed text-bloom-dark/65 sm:grid-cols-[7rem_1fr] sm:gap-5">
          <span className="font-medium uppercase tracking-[0.1em] text-bloom-dark/45">Authors</span>
          <p>Marcus Yong, Irina Khven, Mehmet Özgür Türkoglu, Aengun Mac Sweeney</p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6">
        <section className="rounded-2xl bg-white/55 p-7 shadow-[0_12px_40px_rgba(28,39,58,0.035)] md:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-bloom-violet">Abstract</p>
          <p className="mt-5 font-platypi text-lg font-light leading-[1.75] text-bloom-dark md:text-xl">ReVamp explores how blood cells could help diagnose and potentially reverse biological aging. Its proposed framework combines computer vision with personalized cellular interventions. First, a machine-learning model analyzes T-cell morphology to estimate molecular aging and identify disrupted regulatory pathways. These predictions then guide the selection of rejuvenation treatments applied to a patient’s own blood cells outside the body. After treatment, the same model assesses whether the cells have shifted toward a younger biological state. By connecting diagnosis, intervention, and evaluation, ReVamp aims to establish a personalized approach to blood-based rejuvenation, although its effectiveness and safety remain to be validated.</p>
        </section>

        <Section title="Motivation">
          <p>Despite the advancements made in healthcare over the last decades, which have led to a substantial rise in life expectancy, the increase in healthspan — the period of life free from age-related morbidities and disabilities — has not kept pace.</p>
          <p>One increasingly discussed reason is that most current interventions target isolated pathologies, by treating downstream manifestations of aging — cardiovascular disease, neurodegeneration, cancer, metabolic dysfunction, immune decline — as separate clinical entities, while often overlooking the fact that these conditions emerge from the same aging organism. A growing line of thought in geroscience acknowledges the systemic nature of aging and thus aims to intervene upstream of individual age-related diseases.</p>
          <p>Blood is a compelling entry point into this system: it is accessible through the veins, repeatedly sampleable, and contains autologous cells that circulate throughout the body. Among these, immune cells, such as T cells, are known to undergo age-associated remodeling. On one hand, changes in cellular morphology can be observed. On the other hand, changes in transcriptional state and gene regulatory network organization provide mechanistic information about the molecular programs altered with age. Together, these morphological and regulatory changes suggest that aged blood cells could serve both as readable biomarkers of systemic aging and as actionable substrates for therapeutic rejuvenation.</p>
        </Section>

        <Section title="Proposed Framework">
          <p>The multifaceted properties of blood motivate a platform designed to close the loop between diagnosis and treatment. ReVamp proposes to divide this platform into two modules.</p>
          <p>First, a diagnostic module would infer molecular or regulatory age from T-cell morphology. Recent advances in microscopy, imaging flow cytometry, and computer vision make this tractable. In practice, microscopy images of T cells could be used as input to a convolutional neural network. The network would be trained to learn a continuous mapping between image-derived cellular features and molecular aging state. This involves learning visual features related to cell size, shape, nuclear morphology, cytoplasmic texture, granularity, and nucleus-to-cytoplasm ratio. These morphological features could then be used to predict richer biological outputs, such as transcriptomic profiles, gene-module activities, or gene regulatory network configurations. The model would thus estimate how close cell sample lies to a young reference state. In turn, practitioners obtain a quantitative readout of cellular aging thanks to which they can identify which molecular programs appear most dysregulated.</p>
          
          <div className="mx-auto max-w-[400px]">
            <ResultFigure
              src={Figure1}
              alt="ReVamp diagnostic module for inferring molecular age from T-cell morphology"
            />
          </div>

          <p>Second, the treatment module would perform ex vivo autologous PBMC rejuvenation. In practice, blood would be extracted from an aged individual, peripheral blood mononuclear cells would be isolated, and these cells would be exposed for 24–48 hours to candidate rejuvenation cocktails. These cocktails would be selected or optimized based on the molecular profile inferred by the diagnostic module, targetting mechanisms affecting stress response pathways, protein folding stress, metabolic regulation, senescence-associated signaling, or transcriptor factor balance. After treatment, the diagnostic model would be reapplied to the same cells to quantify whether the intervention moved them toward a young-like state.</p>

          <div className="mx-auto max-w-[400px]">
            <ResultFigure
              src={Figure2}
              alt="ReVamp ex vivo autologous PBMC rejuvenation and evaluation module"
            />
          </div>
        </Section>

        <Section title="Implications and Future Directions">
          <p>Blood rejuvenation is increasingly motivated by biology with recent work on heterochronic parabiosis and plasma-transfer supporting the idea that blood can modulate aging phenotypes. The originality of this framework lies in making one version of blood rejuvenation technically operational, drawing on advancements in computer vision, and personalized therapies.</p>
          <p>Future work should validate the pipeline step by step. First, it will be necessary to show that T-cell or PBMC morphology contains enough information to predict molecular aging state, such as transcriptomic profiles, gene-module activity, or gene regulatory network configuration. Second, the model should be tested on whether it can detect induced rejuvenation, meaning that treated aged cells move toward a young-like state not only in image space, but also in molecular space. Finally, the safety and functional relevance of reinfusion would need to be established: rejuvenated cells should remain viable, non-transformed, non-exhausted, and immunologically competent, and it should be tested whether their reinfusion produces durable benefits beyond the blood compartment itself.</p>
        </Section>

        <footer className="mt-20 border-t border-bloom-dark/10 pt-8">
          <Link to="/#emerged-work" className="group inline-flex items-center gap-2 text-sm text-bloom-dark/65 transition-colors hover:text-bloom-violet"><ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Emerged Work</Link>
        </footer>
      </div>
    </article>
  </main>
);

export default ReVamp;
