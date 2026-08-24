import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Figure1 from "@/assets/3bodies_1.webp";
import Figure2 from "@/assets/3bodies_2.webp";
import Figure3 from "@/assets/3bodies_3.webp";

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="mt-16 border-t border-bloom-dark/10 pt-9 md:mt-20 md:pt-11">
    <h2 className="font-platypi text-2xl font-light tracking-tight text-bloom-dark md:text-3xl">{title}</h2>
    <div className="mt-6 space-y-6 text-[1.05rem] leading-[1.85] text-bloom-dark/80 md:text-lg">{children}</div>
  </section>
);

const Equation = ({ children }: { children: ReactNode }) => (
  <div className="my-8 overflow-x-auto border-y border-bloom-violet/15 bg-white/35 px-6 py-6 text-center font-platypi text-lg text-bloom-dark md:text-xl">
    <div className="min-w-max">{children}</div>
  </div>
);

const ResultFigure = ({ src, alt }: { src: string; alt: string }) => (
  <figure className="my-10 md:-mx-20">
    <div className="overflow-hidden rounded-2xl border border-bloom-dark/10 bg-white/45 p-3 shadow-[0_18px_55px_rgba(28,39,58,0.05)] md:p-5">
      <img src={src} alt={alt} className="h-auto w-full rounded-xl object-contain" />
    </div>
  </figure>
);

const Bodies = () => (
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
          3Bodies: Modeling Aging Across Interconnected Physiological Systems
        </h1>
        <div className="mt-10 grid gap-2 border-l-2 border-bloom-violet/35 pl-5 text-sm leading-relaxed text-bloom-dark/65 sm:grid-cols-[7rem_1fr] sm:gap-5">
          <span className="font-medium uppercase tracking-[0.1em] text-bloom-dark/45">Authors</span>
          <p>Julian Bär, Elisa Brosera, Lilian Laporte, Sacha Martinelle, Millie Sealana</p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6">
        <section className="rounded-2xl bg-white/55 p-7 shadow-[0_12px_40px_rgba(28,39,58,0.035)] md:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-bloom-violet">Abstract</p>
          <p className="mt-5 font-platypi text-lg font-light leading-[1.75] text-bloom-dark md:text-xl">
            3Bodies models aging as the interconnected decline of three physiological systems: cardiovascular, muscular, and neurocognitive. Each system is described by its current functional health and accumulated structural damage, with interactions allowing disruptions in one compartment to propagate across the others. Together, these dynamics reproduce key features of aging, including progressive decline, reduced resilience, and increasing vulnerability to acute shocks. Preliminary simulations show that different interventions—such as exercise, protective therapies, or targeted tissue replacement—can have distinct effects on healthspan and lifespan. Ultimately, the framework aims to support personalized forecasts of physiological decline and intervention outcomes.
          </p>
        </section>

        <Section title="Motivation">
          <p>Mathematically, a dynamical system can be described by a state vector <i>x</i>(<i>t</i>) evolving according to <span className="whitespace-nowrap"><i>ẋ</i> = <i>f</i>(<i>x</i>, <i>t</i>)</span>. When the components of <i>x</i> are coupled — that is, when <i>ẋ</i><sub>i</sub> depends not only on <i>x</i><sub>i</sub>, but also on other variables <i>x</i><sub>j</sub> — the system cannot be decomposed into independent parts. Its equilibria, or more generally its attractors, are collective properties of the full system: they are defined by the joint structure of the vector field, and in the simplest case by the collective null condition (<i>ẋ</i><sub>1</sub> = <i>ẋ</i><sub>2</sub> = … = <i>ẋ</i><sub>n</sub> = 0).</p>
          <p>With this in mind, and assuming that the body can be described as a set of interacting physiological compartments — including the brain, the muscles, and the heart — studying health by isolating each compartment becomes counterintuitive: cardiac function supports brain perfusion and physical capacity, while cognitive decline can in turn affect mobility, activity, and cardiovascular risk. Longitudinal data support this view, showing evidence for shared multisystem dysregulation and, in some domains, bidirectional coupling.</p>
          <p>One response to this complexity has been to compress multiple physiological measurements into a single global health or biological-age score. Such scores are useful because they summarize organism-level decline. However, when calculated through opaque predictive models, they remain limited if the goal is mechanistic understanding or intervention design. A more informative framework should therefore preserve the body’s compartmental structure while explicitly modeling the interactions between subsystems.</p>
        </Section>

        <Section title="Proposed Framework">
          <p>To this end, 3bodies proposes a minimal dynamical framework in which aging emerges from the coupled evolution of three physiological subsystems: cardiovascular, muscular, and neurocognitive. Each subsystem (<i>i</i> ∈ {`{cardio, musc, neuro}`}) is described by two state variables. The first is a fast variable, <i>X</i><sub>i</sub>(<i>t</i>) ∈ [0,1], representing the current functional health of the subsystem. The second is a slow variable, <i>D</i><sub>i</sub>(<i>t</i>) ≥ 0, representing accumulated structural damage. This distinction allows the model to separate short-term physiological performance from long-term degradation.</p>
          <p>The functional state of each subsystem evolves through three competing forces. First, function decays over time, and this decay is amplified by accumulated damage. Second, acute shocks <i>S</i><sub>i</sub>(<i>t</i>) transiently reduce function. Third, the subsystem can recover toward a damage-dependent ceiling <i>X</i><sub>max,i</sub>(<i>D</i><sub>i</sub>). Formally, the dynamics can be written as:</p>
          <Equation>
            <i>X</i><sub>i</sub>(<i>t</i> + Δ<i>t</i>) = <i>X</i><sub>i</sub>(<i>t</i>) − <i>δ</i><sub>i</sub>(<i>D</i><sub>i</sub>)<i>X</i><sub>i</sub>(<i>t</i>)Δ<i>t</i> − <i>S</i><sub>i</sub>(<i>t</i>) + <i>r</i><sub>i</sub>(<i>D</i><sub>i</sub>)(<i>X</i><sub>max,i</sub>(<i>D</i><sub>i</sub>) − <i>X</i><sub>i</sub>(<i>t</i>))Δ<i>t</i>
          </Equation>
          <p>Here, damage makes the system progressively less resilient: it increases the decay rate <i>δ</i><sub>i</sub>(<i>D</i><sub>i</sub>), decreases the recovery rate <i>r</i><sub>i</sub>(<i>D</i><sub>i</sub>), and lowers the maximal recoverable function <i>X</i><sub>max,i</sub>(<i>D</i><sub>i</sub>).</p>
          <p>A central feature of the framework is that shocks are not purely local. An acute perturbation to one subsystem can propagate to others through a coupling matrix <i>C</i>(<i>D</i>). This coupling increases with damage, allowing the system to capture the fact that decline is also the result of weaker containment:</p>
          <Equation>
            <i>S</i>(<i>t</i>) = <i>S</i><sup>local</sup>(<i>t</i>) + <i>C</i>(<i>D</i>)<i>S</i><sup>local</sup>(<i>t</i>), &nbsp; <i>C</i><sub>ij</sub>(<i>D</i>) = <i>C</i><sub>ij</sub><sup>base</sup>(1 + <i>γ</i><sub>coup</sub>(<i>D</i><sub>i</sub> + <i>D</i><sub>j</sub>)/2)
          </Equation>
          <p>Structural damage also evolves dynamically. Damage accumulates through chronic wear, proportional to the loss of function 1 − <i>X</i><sub>i</sub>(<i>t</i>), and through shock-induced scarring, proportional to <i>S</i><sub>i</sub>(<i>t</i>):</p>
          <Equation>
            <i>D</i><sub>i</sub>(<i>t</i> + Δ<i>t</i>) = <i>D</i><sub>i</sub>(<i>t</i>) + <i>α</i><sub>X</sub>(1 − <i>X</i><sub>i</sub>(<i>t</i>))Δ<i>t</i> + <i>β</i><sub>S</sub><i>S</i><sub>i</sub>(<i>t</i>)Δ<i>t</i>.
          </Equation>
          <p>This closes the feedback loop between function and damage. Low function accelerates damage accumulation; damage then accelerates future functional decay, weakens recovery, lowers the achievable functional ceiling, and increases cross-system shock propagation.</p>
          <p>Healthspan and lifespan are then defined as emergent readouts of the whole coupled system. Healthspan corresponds to the period during which the average functional state across subsystems remains above a functional threshold:</p>
          <Equation>⅓ ∑<sub>i</sub> <i>X</i><sub>i</sub>(<i>t</i>) &gt; <i>X</i><sub>functional</sub></Equation>
          <p>Death occurs when any subsystem falls below a critical viability threshold (<i>X</i><sub>i</sub>(<i>t</i>) &lt; <i>X</i><sub>death</sub>).</p>
        </Section>

        <div className="mx-auto max-w-[400px]">
          <ResultFigure
            src={Figure1}
            alt="Simulated functional health and structural damage trajectories"
          />
          <ResultFigure
            src={Figure2}
            alt="Simulated exercise and protective intervention outcomes"
          />
          <ResultFigure
            src={Figure3}
            alt="Simulated targeted subsystem replacement outcomes"
          />
        </div>

        <Section title="Implications and Future Directions">
          <p>At this stage, the framework should be understood as a conceptual simulator. Its value lies in showing that a small number of interacting physiological subsystems can reproduce qualitative signatures of aging: progressive decline, shock sensitivity, frailty coupling, and intervention-specific trajectories.</p>
          <p>The next step is to fit this dynamical structure to longitudinal cohort data. In this setting, a person would be represented by an estimated dynamical state: their subsystem-specific decline rates, damage distribution, resilience, coupling strength, and sensitivity to future shocks.</p>
          <p>This opens the possibility of simulating interventions before they are applied, comparing whether they act by slowing damage, improving recovery, reducing acute shock impact, or resetting specific compartments. Important limitations remain: the current subsystem set is minimal, coupling is simplified, and the chosen functional forms are only one possible implementation. Future work should therefore focus on parameter inference, model expansion, and validation against held-out longitudinal trajectories.</p>
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

export default Bodies;
