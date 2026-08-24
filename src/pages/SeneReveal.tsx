import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Figure1 from "@/assets/SeneReveal1.webp";
import Figure2 from "@/assets/SeneReveal2.webp";
import Figure3 from "@/assets/SeneReveal3.webp";

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

const SeneReveal = () => (
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
        <h1 className="mt-7 max-w-4xl font-platypi text-4xl font-light leading-[1.08] tracking-[-0.025em] text-bloom-dark sm:text-5xl md:text-6xl">SeneReveal: Teaching AI to Outsmart Cellular Aging</h1>
        <div className="mt-10 grid gap-2 border-l-2 border-bloom-violet/35 pl-5 text-sm leading-relaxed text-bloom-dark/65 sm:grid-cols-[7rem_1fr] sm:gap-5">
          <span className="font-medium uppercase tracking-[0.1em] text-bloom-dark/45">Authors</span>
          <p>Juan-Carlos Álvarez, Matteo Cozzi, Minerva Snellman, Stefano Rosà</p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6">
        <section className="rounded-2xl bg-white/55 p-7 shadow-[0_12px_40px_rgba(28,39,58,0.035)] md:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-bloom-violet">Abstract</p>
          <p className="mt-5 font-platypi text-lg font-light leading-[1.75] text-bloom-dark md:text-xl">SeneReveal uses reinforcement learning to identify interventions that could make aging cells easier to eliminate. Senescent cells accumulate in tissues over time, driving inflammation and age-related dysfunction, but their diverse molecular identities make them difficult to target uniformly. By modeling transitions between these identities, SeneReveal learns which gene-level perturbations may steer resistant cells toward more vulnerable states. Preliminary simulations show that the model develops non-random intervention strategies, identifying EDN1 activation as a recurrent candidate. Ultimately, the framework aims to guide experimental strategies that first reprogram senescent cells into susceptible states and then eliminate them using targeted senolytic therapies.</p>
        </section>

        <Section title="Motivation">
          <p>Senescent cells have entered a state in which they no longer divide, but they also do not necessarily die. In principle, this is protective, by preventing damaged or stressed cells from proliferating further. But with age, some of these cells resist apoptosis, escape efficient immune clearance, and gradually accumulate in tissues.</p>
          <p>This persistence is harmful because they secrete molecules that can disrupt tissue structure, fuel chronic inflammation, and contribute to age-related dysfunction, collectively known as the senescence-associated secretory phenotype (SASP). This is why clearing senescent cells, or making them easier for the immune system to eliminate, has become an attractive therapeutic strategy in aging biology.</p>
          <p>However, senescence is not one uniform state, but a heterogeneous landscape of molecular identities. SenCID, a machine-learning model designed to identify senescent cells from transcriptomic data, describes six distinct Senescence Identities (SIDs), corresponding to different molecular states, each with its own gene-expression fingerprint. Importantly, some senescent cells are known transition between different SIDs depending on time, tissue context, stress, or perturbation.</p>
          <p>This heterogeneity creates both a challenge and an opportunity. The challenge is that a therapy effective against one senescent-cell state may fail against another. The opportunity is that some states may expose specific vulnerabilities. In particular, one senescence identity, SID5, appears to be sensitive to BCL2 inhibition. Since BCL2 is involved in protecting cells from apoptosis, inhibiting it can make SID5-like senescent cells undergo programmed cell death.</p>
          <p>SeneReveal builds on this idea. If SID5 can be eliminated through BCL2 inhibition, then perhaps other resistant senescent-cell states can either be made vulnerable directly or steered toward a SID5-like state before being cleared. The therapeutic logic is therefore two-step: first, identify interventions that push resistant senescent cells into a vulnerable identity; second, eliminate them using a senolytic drug, such as a BCL2 inhibitor.</p>
          <p>The bottleneck is that there are many senescent-cell states, many possible gene targets, and many possible interventions. Testing every modulator manually is slow, expensive, and experimentally impractical.</p>
        </Section>

        <Section title="Proposed Framework">

          <div className="mx-auto max-w-[450px]">
            <ResultFigure
              src={Figure1}
              alt="SeneReveal reinforcement-learning framework"
            />
          </div>

          <p>SeneReveal addresses this bottleneck with a computational recommendation engine. The goal is to learn which interventions are most likely to move senescent cells toward therapeutically useful states.</p>
          <p>The framework can be described as a reinforcement-learning problem. An agent observes the current senescent-cell state, applies an intervention, receives feedback, and updates its strategy. The state space is the senescence identity landscape:</p>
          <Equation><i>s</i><sub>t</sub> ∈ {`{SID1, SID2, …, SID6}`}</Equation>
          <p>The action space consists of gene-level perturbations. Each action can be written as:</p>
          <Equation><i>a</i><sub>t</sub> = (gene, direction), &nbsp; direction ∈ {`{ON, OFF}`}</Equation>
          <p>The action space consists of gene-level perturbations. Each action can be written as:</p>
          <p>For example, the agent may choose: <i>a</i><sub>t</sub> = (EDN1, ON). After the intervention, the cell population transitions to a new state: <i>s</i><sub>t</sub> <span className="mx-2">⟶<sup className="ml-[-1.1rem] align-super text-xs"><i>a</i><sub>t</sub></sup></span> <i>s</i><sub>t+1</sub>.</p>
          <p>The reward function encodes the biological objective. If the goal is to push resistant senescent cells toward a vulnerable SID5-like state, the reward can be defined as:</p>
          <Equation>
            <div className="grid grid-cols-[auto_auto_1fr] gap-x-4 gap-y-2 text-left">
              <span rowSpan={3} className="self-center text-3xl"><i>r</i><sub>t</sub> = &#123;</span>
              <span>+1</span><span>if <i>s</i><sub>t+1</sub> = SID5</span>
              <span className="col-start-2"><i>α</i></span><span>if <i>s</i><sub>t+1</sub> moves closer to SID5</span>
              <span className="col-start-2">0 or −1</span><span>otherwise</span>
            </div>
          </Equation>
          <p>The agent then learns a policy, <i>π</i>(<i>a</i>|<i>s</i>) which maps each senescent-cell state to the intervention most likely to maximize future reward. In a Q-learning formulation, this means estimating:</p>
          <Equation><i>Q</i>(<i>s</i>, <i>a</i>) = 𝔼[future reward | <i>s</i><sub>t</sub> = <i>s</i>, <i>a</i><sub>t</sub> = <i>a</i>]</Equation>
          <p>and selecting the action with the highest expected value.</p>
          <p>The final output is therefore a ranked list of gene ON/OFF interventions to test experimentally as part of senolytic strategies.</p>
        </Section>

        <Section title="Results">
          <ResultFigure src={Figure2} alt="Frequency of interventions selected by the reinforcement-learning agent" />
          <p>Proof-of-concept results suggest that the RL agent is able to learn non-random intervention strategies. Across 3351 interventions, one action dominates the recommendation landscape: <strong className="font-medium text-bloom-dark">EDN1 ON</strong>, selected 958 times. This indicates that the agent identifies EDN1 activation as a particularly strong candidate for reaching the target SID. However, this result could also indicate policy collapse, where the model over-relies on one action because of the structure of the simulated environment or reward function.</p>
          <ResultFigure src={Figure3} alt="SeneReveal training reward, loss, and gradient dynamics" />
          <p>Training dynamics further support that the agent learns over time. The moving-average reward remains low during early episodes, then increases sharply around episode 220–250, suggesting that the agent discovers a more effective strategy and begins to outperform random exploration. The loss curve shows an early instability, followed by generally low loss, with a second spike around episode 200. This spike may correspond to exploration of a new region of the intervention landscape (aligned with the training progress plot), initially costly but later rewarding. Importantly, the loss does not diverge, and the gradient-health monitor shows gradients remaining below the exploding threshold and above the vanishing threshold, suggesting stable optimization.</p>
          <p>Finally, early episodes (before episode 200) often terminate in non-target states such as SID4, SID5, or SID6. Later, more episodes converge to the target SID1, although many still end in SID4. Thus, the learned policy improves but remains imperfect.</p>
        </Section>

        <Section title="Implications and Future Directions">
          <p>Overall, this work provides a proof of concept that reinforcement learning can learn gene ON/OFF intervention policies to move cells between senescence identities. An agent develops a non-random intervention preference, with <strong className="font-medium text-bloom-dark">EDN1 ON</strong> selected in nearly 30% of cases, suggesting that it identifies structured strategies rather than exploring randomly. However, the current results do not yet show that these transitions make senescent cells vulnerable to immune clearance or BCL2 inhibition. Future work should train the model on more biologically relevant targets, such as transitions toward SID5, and extend the state representation from discrete SIDs to full gene-expression profiles.</p>
        </Section>

        <footer className="mt-20 border-t border-bloom-dark/10 pt-8">
          <Link to="/#emerged-work" className="group inline-flex items-center gap-2 text-sm text-bloom-dark/65 transition-colors hover:text-bloom-violet"><ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Emerged Work</Link>
        </footer>
      </div>
    </article>
  </main>
);

export default SeneReveal;
