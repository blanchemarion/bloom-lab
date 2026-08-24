import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import somaFigure from "@/assets/soma_figure.webp";

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="mt-16 border-t border-bloom-dark/10 pt-9 md:mt-20 md:pt-11">
    <h2 className="font-platypi text-2xl font-light tracking-tight text-bloom-dark md:text-3xl">{title}</h2>
    <div className="mt-6 space-y-6 text-[1.05rem] leading-[1.85] text-bloom-dark/80 md:text-lg">{children}</div>
  </section>
);

const Equation = ({ children }: { children: ReactNode }) => (
  <div className="my-8 overflow-x-auto border-y border-bloom-violet/15 bg-white/35 px-6 py-6 text-center font-platypi text-lg text-bloom-dark md:text-xl">
    {children}
  </div>
);

const Soma = () => (
  <main className="min-h-screen bg-background text-foreground">
    <header className="border-b border-bloom-dark/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/#emerged-work" className="group flex items-center gap-2 text-sm text-bloom-dark/65 transition-colors hover:text-bloom-violet">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Emerged Work
        </Link>
        <Link to="/main" className="font-platypi text-lg font-light text-bloom-dark">Bloom Lab</Link>
      </div>
    </header>

    <article className="pb-24 md:pb-32">
      <header className="mx-auto max-w-5xl px-6 pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-bloom-violet">
         <span>Research Project · 2025</span>
        </div>
        <h1 className="mt-7 max-w-4xl font-platypi text-4xl font-light leading-[1.08] tracking-[-0.025em] text-bloom-dark sm:text-5xl md:text-6xl">
          Soma: Mapping the Hidden Network Behind Personal Health
        </h1>
        <div className="mt-10 grid gap-2 border-l-2 border-bloom-violet/35 pl-5 text-sm leading-relaxed text-bloom-dark/65 sm:grid-cols-[7rem_1fr] sm:gap-5">
          <span className="font-medium uppercase tracking-[0.1em] text-bloom-dark/45">Authors</span>
          <p>Julia Oesterle, Nina Baumgartner, Isabella Müller-Vogt, Zaniyar Jahany</p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6">
        <section className="rounded-2xl bg-white/55 p-7 shadow-[0_12px_40px_rgba(28,39,58,0.035)] md:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-bloom-violet">Abstract</p>
          <p className="mt-5 font-platypi text-lg font-light leading-[1.75] text-bloom-dark md:text-xl">
            Soma models health as a dynamic network of interconnected physiological systems. By combining population-scale biomedical data with individual longitudinal measurements, it uses graph-based causal discovery and dynamical modeling to map physiological relationships, predict health trajectories, and simulate the potential effects of behavioral or clinical interventions. Preliminary experiments on synthetic medical data and real-world weather data support the feasibility of integrating network reconstruction, forecasting, and intervention simulation within a unified framework. Ultimately, Soma aims to translate fragmented health measurements into a personalized, evolving model of the human body.
          </p>
        </section>

        <Section title="Motivation">
          <p>Health is not directly observable. It arguably can be seen as a latent system-level property emerging from the interaction of different physiological subsystems: notably cardiovascular, metabolic, neurological, immune, behavioral, environmental. What we measure from the outside (heart rate, sleep quality, glucose, inflammation, physical activity, mood, medical history) are only partial readouts of this hidden state.</p>
          <p>The central challenge of health assessment is to reconstruct the dynamical system that generates them.</p>
          <p>Today, two complementary sources of information make this reconstruction increasingly plausible.</p>
          <ol className="space-y-5 [counter-reset:item]">
            <li className="grid grid-cols-[2rem_1fr] gap-3 before:font-platypi before:text-bloom-violet before:content-[counter(item)] [counter-increment:item]">At the population level, large biomedical and public-health datasets capture statistical relationships between physiology, lifestyle, environment, morbidity, and mortality across millions of individuals.</li>
            <li className="grid grid-cols-[2rem_1fr] gap-3 before:font-platypi before:text-bloom-violet before:content-[counter(item)] [counter-increment:item]">At the individual level, wearables, habit trackers, clinical records, and omics technologies make it possible to observe personal health trajectories with a high level of granularity.</li>
          </ol>
          <p>Soma’s thesis is that these two perspectives can be reconciled through graph theory.</p>
          <p>Population-scale data can be used to learn a general map of physiological dependencies, while individual data can be used to personalize this map into a dynamic model of a specific person.</p>
        </Section>

        <Section title="Proposed Framework">
          <p>Soma formalizes personalized health as a causal dynamical system. Let <i>x</i><sub>t</sub> ∈ ℝ<sup>p</sup> denote the vector of observed health variables at time <i>t</i>. The first objective is to learn a population-level graph <i>G</i> = (<i>V</i>, <i>E</i>), where each node <i>v</i><sub>i</sub> ∈ <i>V</i> is a measurable variable and each edge <i>e</i><sub>ij</sub> represents a dependency between physiological components. Starting from a complete undirected graph, Soma applies constraint-based causal discovery, such as the PC algorithm, to progressively remove edges between variables that become conditionally independent given subsets of the remaining variables. Under causal sufficiency, the causal Markov condition, and faithfulness, this procedure estimates a sparse equivalence class of directed acyclic graphs. This step does not prove causality, but provides a statistically grounded causal scaffold that is more tractable than exhaustively searching over the super-exponential space of possible graphs.</p>
          <p>The second step turns this static graph into a temporal model. Given the learned graph structure, a graph-constrained vector autoregressive model is fitted:</p>
          <Equation><i>x</i><sub>t+1</sub> = <i>c</i> + <i>A</i><sub>G</sub><i>x</i><sub>t</sub> + <i>ε</i><sub>t</sub></Equation>
          <p>or, more generally,</p>
          <Equation><i>x</i><sub>t</sub> = <i>c</i> + ∑<sub>ℓ=1</sub><sup>L</sup> <i>A</i><sub>ℓ,G</sub><i>x</i><sub>t−ℓ</sub> + <i>ε</i><sub>t</sub></Equation>
          <p>Here, the PC algorithm determines which entries of the matrices <i>A</i><sub>ℓ,G</sub> are allowed to be non-zero, while VAR estimates the magnitude and sign of these temporal dependencies. In other words, the graph specifies which physiological variables may influence one another, and VAR quantifies how strongly past states predict future states.</p>
          <p>Personalization is then achieved by updating this population-level dynamical model with individual longitudinal data (from wearables, clinical records…). Interventions can be introduced as external inputs:</p>
          <Equation><i>x</i><sub>t+1</sub> = <i>c</i> + <i>A</i><sub>G</sub><i>x</i><sub>t</sub> + <i>B u</i><sub>t</sub> + <i>ε</i><sub>t</sub></Equation>
          <p>where <i>u</i><sub>t</sub> encodes behavioral, clinical or environmental perturbations, and <i>B</i> represents their estimated effects on the system. This makes it possible to simulate counterfactual trajectories: how a person’s health state may evolve with or without a given intervention.</p>
        </Section>
      </div>

      <figure className="mx-auto mt-16 max-w-5xl px-6 md:mt-24">
        <div className="overflow-hidden rounded-2xl border border-bloom-dark/10 bg-white/45 p-3 shadow-[0_18px_55px_rgba(28,39,58,0.05)] md:p-5">
          <img src={somaFigure} alt="Soma graph-based personalized health modeling framework" className="h-auto w-full rounded-xl" />
        </div>
        <figcaption className="mx-auto mt-4 max-w-3xl text-xs leading-relaxed text-muted-foreground">Soma integrates physiological network reconstruction, temporal forecasting, and intervention simulation into a personalized model.</figcaption>
      </figure>

      <div className="mx-auto max-w-3xl px-6">
        <Section title="Preliminary Results">
          <p>As a preliminary proof of concept, the PC algorithm + VAR pipeline was tested to confirm that it allows to recover meaningful structure and dynamics in controlled multivariate time-series settings.</p>
          <p>First, on dummy medical time-series data generated under assumed linear dependencies, the model recovered a directed dependency graph between physiological variables and was able to predict an unseen trajectory, suggesting that the framework can capture structured temporal relationships when the underlying system is approximately linear.</p>
          <p>Second, the same pipeline was applied to real weather time-series data, using variables such as precipitation, minimum and maximum temperature, snowfall, and snow depth. The inferred graph recovered plausible dependencies between these variables, while the VAR component enabled short-term forecasting and counterfactual simulation. For example, a sustained increase in maximum temperature produced the expected downstream decrease in predicted snow depth compared with the baseline trajectory.</p>
          <p>These experiments demonstrate that the proposed architecture can integrate causal structure learning, temporal forecasting, and intervention simulation within a single graph-based dynamical framework.</p>
        </Section>

        <Section title="Implications and Future Directions">
          <p>Soma’s main implication is that personalization may not require learning a new health system from scratch for every user. Instead, a population-level physiological graph provides the general structure, while individual longitudinal data fine-tunes the user’s state, parameters, and response to interventions. This enables at least three concrete lenses into personal health: lifestyle pillars, showing which domains are most limiting; a digital twin, representing the user’s current position in health state space; and forecasts, simulating the effect of sequential interventions such as new habits, treatment changes, or environmental modifications. Future work should validate this framework on real longitudinal health datasets.</p>
        </Section>

        <footer className="mt-20 border-t border-bloom-dark/10 pt-8">
          <Link to="/#emerged-work" className="group inline-flex items-center gap-2 text-sm text-bloom-dark/65 transition-colors hover:text-bloom-violet">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Emerged Work
          </Link>
        </footer>
      </div>
    </article>
  </main>
);

export default Soma;
