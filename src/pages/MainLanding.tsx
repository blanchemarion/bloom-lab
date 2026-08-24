import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import lucieBwPng from "@/assets/lucie_bw.webp";
import lucieColorPng from "@/assets/lucie_color.webp";
import blancheBwPng from "@/assets/blanche_bw.webp";
import blancheColorPng from "@/assets/blanche_color.webp";
import { ExternalLink } from "lucide-react";
import substackPosts from "@/data/substack-posts.json";
import biotechnoLogo from "@/assets/partners/biotechno.png";
import ethAiCenterLogo from "@/assets/partners/ethaicenter.png";
import ethSphLogo from "@/assets/partners/ethsph.png";
import goreRangeLogo from "@/assets/partners/gorerange.png";
import juvionLogo from "@/assets/partners/juvion.png";
import missionPossibleLogo from "@/assets/partners/missionpossible.png";
import moreLifeLogo from "@/assets/partners/morelife.png";
import redalpineLogo from "@/assets/partners/redalpine.png";
import spiralabsLogo from "@/assets/partners/spiralabs.png";
import stemCellsLogo from "@/assets/partners/stemcells.png";

const partners = [
  { name: "Biotechno", logo: biotechnoLogo },
  { name: "ETH AI Center", logo: ethAiCenterLogo },
  { name: "ETH SPH", logo: ethSphLogo },
  { name: "Gore Range Capital", logo: goreRangeLogo },
  { name: "Juvion", logo: juvionLogo },
  { name: "Mission Possible", logo: missionPossibleLogo },
  { name: "MoreLife", logo: moreLifeLogo },
  { name: "redalpine", logo: redalpineLogo },
  { name: "Spira Labs", logo: spiralabsLogo },
  { name: "Stem Cells", logo: stemCellsLogo },
];

const emergedProjects = [
  { name: "SeneReveal", headline: "Teaching AI to Outsmart Cellular Aging", disciplines: ["Machine Learning", "Longevity"], year: 2025, to: "/projects/senereveal" },
  { name: "ReVamp", headline: "Reading and Reversing Aging Through Blood", disciplines: ["Machine Learning", "Longevity"], year: 2025, to: "/projects/revamp" },
  { name: "3Bodies", headline: "Modeling Aging Across Interconnected Physiological Systems", disciplines: ["Dynamical Systems", "Longevity"], year: 2025, to: "/projects/3bodies" },
  { name: "Soma", headline: "Mapping the Hidden Networks Behind Personal Health", disciplines: ["Graph Theory", "Longevity"], year: 2025, to: "/projects/soma" },
  { name: "BioResilience", headline: "Measuring the Body’s Resilience in Real Time", disciplines: ["Dynamical Systems", "Longevity"], year: 2025, to: "/projects/coming-soon" },
  { name: "Biological Relativity", headline: "Modeling Aging With Spacetime", disciplines: ["Physics", "Longevity"], year: 2024, to: "/projects/biological-relativity" },
];

const disciplineStyles: Record<string, string> = {
  "Machine Learning": "bg-[#73E8FF]/35 text-bloom-dark",
  Longevity: "bg-[#2BA4E0]/20 text-bloom-dark",
  "Dynamical Systems": "bg-[#0E74D6]/20 text-bloom-dark",
  "Graph Theory": "bg-[#7050FF]/20 text-bloom-dark",
  Physics: "bg-[#7050FF]/30 text-bloom-dark",
};


const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const childVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

// Animated Section Component
const AnimatedSection = ({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
      className={"landing-section " + className}
    >
      {children}
    </motion.section>
  );
};

const MainLanding = () => {
  const [postsExpanded, setPostsExpanded] = useState(false);
  const visiblePosts = postsExpanded ? substackPosts : substackPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* About Section */}
      <AnimatedSection
        id="about"
        className="container mx-auto px-6 pt-8 pb-24 md:pt-12 md:pb-32"
      >
        <div className="max-w-4xl mx-auto space-y-14 md:space-y-20">
          <a href="#emerged-work" className="group flex items-start gap-6 md:gap-10">
            <svg aria-hidden="true" viewBox="0 0 48 48" className="mt-1 h-10 w-10 shrink-0 text-bloom-violet md:h-12 md:w-12">
              <circle cx="10" cy="24" r="4" fill="currentColor" />
              <circle cx="24" cy="24" r="4" fill="currentColor" />
              <circle cx="38" cy="24" r="4" fill="currentColor" />
            </svg>
            <div>
              <h2 className="font-platypi text-2xl font-light text-foreground transition-colors group-hover:text-bloom-violet md:text-3xl">Bridging Disciplines</h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
                We seed projects that combine ideas and methods from fields that rarely meet. <span aria-hidden="true">↗</span>
              </p>
            </div>
          </a>

          <a href="#schedule" className="group flex items-start gap-6 md:gap-10">
            <svg aria-hidden="true" viewBox="0 0 48 48" className="mt-1 h-10 w-10 shrink-0 text-bloom-violet md:h-12 md:w-12">
              <circle cx="9" cy="24" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M15 24h18" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="39" cy="24" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            <div>
              <h2 className="font-platypi text-2xl font-light text-foreground transition-colors group-hover:text-bloom-violet md:text-3xl">Connecting People</h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
                We host gatherings that bring researchers from different fields into the same room. <span aria-hidden="true">↗</span>
              </p>
            </div>
          </a>

          <a href="#posts" className="group flex items-start gap-6 md:gap-10">
            <svg aria-hidden="true" viewBox="0 0 48 48" className="mt-1 h-10 w-10 shrink-0 text-bloom-violet md:h-12 md:w-12">
              <circle cx="24" cy="24" r="12" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2.5 3.5" />
              <circle cx="24" cy="24" r="3" fill="currentColor" />
            </svg>
            <div>
              <h2 className="font-platypi text-2xl font-light text-foreground transition-colors group-hover:text-bloom-violet md:text-3xl">Decoding Life</h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
                We publish essays exploring the principles of living systems and what they reveal about complexity. <span aria-hidden="true">↗</span>
              </p>
            </div>
          </a>
        </div>
      </AnimatedSection>

      {/* Emerged Work Section */}
      <AnimatedSection id="emerged-work" className="py-16 md:py-20">
        <motion.h2
          variants={childVariant}
          className="mx-auto max-w-7xl px-6 font-platypi text-4xl font-light text-bloom-dark md:text-5xl"
        >
          Emerged Work
        </motion.h2>

        <div
          className="relative mx-4 mt-10 overflow-hidden rounded-3xl px-5 py-6 sm:mx-6 md:mt-14 md:px-7 md:py-8 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-9"
        >
          <div className="absolute -inset-5 scale-105 bg-cover bg-center blur-md" style={{ backgroundImage: `image-set(url("background-1280.webp") type("image/webp"), url("background.png") type("image/png"))` }} aria-hidden="true" />
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {emergedProjects.map((project) => (
              <motion.article
                key={project.name}
                variants={childVariant}
                className="group min-h-64 overflow-hidden rounded-2xl bg-white/90"
              >
                <Link
                  to={project.to}
                  className="flex h-full flex-col p-6 text-bloom-dark transition-colors hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-bloom-violet"
                >
                  <h3 className="font-platypi text-2xl font-light leading-tight md:text-3xl">
                    {project.name}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed md:text-base">
                    {project.headline} <span aria-hidden="true">↗</span>
                  </p>

                  <div className="mt-auto pt-8">
                    <div className="h-px bg-bloom-dark/15" />
                    <footer className="mt-5 flex items-end justify-between gap-4 text-sm">
                      <span>{project.year}</span>
                      <div className="flex flex-wrap justify-end gap-2">
                        {project.disciplines.map((discipline) => (
                          <span
                            key={discipline}
                            className={`rounded-full px-3 py-1.5 text-xs ${disciplineStyles[discipline]}`}
                          >
                            {discipline}
                          </span>
                        ))}
                      </div>
                    </footer>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Schedule Section */}
      <AnimatedSection id="schedule" className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div variants={staggerChildren} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
            <motion.div variants={childVariant} className="min-w-0">
              <h2 className="font-platypi text-3xl font-light text-bloom-dark md:text-4xl">Upcoming Events</h2>
              <div className="mt-8 flex min-h-80 flex-col justify-between overflow-hidden rounded-3xl border border-bloom-violet/10 bg-white/55 p-7 shadow-[0_16px_45px_rgba(28,39,58,0.045)] backdrop-blur-md md:p-9">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-bloom-violet/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-bloom-violet">Summit</span>
                  <time className="font-platypi text-3xl font-light text-bloom-violet/35">2027</time>
                </div>
                <div className="mt-16 max-w-lg">
                  <h3 className="font-platypi text-2xl font-light leading-snug text-bloom-dark md:text-3xl">The World in 2100: What Left the Lab</h3>
                  <div className="mt-6 flex items-center gap-4 border-t border-bloom-dark/10 pt-5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-bloom-violet/55" aria-hidden="true" />
                    <p className="text-sm leading-relaxed text-muted-foreground">Further information will be announced later.</p>
                  </div>
                </div>
              </div>
              {/* Add compact upcoming-event rows here as dates are confirmed. */}
            </motion.div>

            <motion.div variants={childVariant} className="min-w-0">
              <h2 className="font-platypi text-3xl font-light text-bloom-dark md:text-4xl">Past Events</h2>
              <div className="mt-8 overflow-hidden border-y border-bloom-dark/10">
                <a href="https://luma.com/2oqm0cr6" target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[5.5rem_1fr_auto] items-start gap-4 py-6 text-bloom-dark transition-colors hover:text-bloom-violet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-bloom-violet sm:grid-cols-[6.5rem_1fr_auto] md:grid-cols-[5.5rem_1fr_auto] lg:grid-cols-[6.5rem_1fr_auto]">
                  <time className="pt-1 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">Dec 5–7 2025</time>
                  <span className="font-platypi text-lg font-light leading-snug md:text-xl">Research Hackathon: Longevity x Intelligence</span>
                  <ArrowUpRight className="mt-1 h-4 w-4 text-bloom-dark/40 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bloom-violet" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Posts Section */}
      <AnimatedSection
        id="posts"
        className="py-16 md:py-20"
      >
        <div className="mx-auto max-w-7xl space-y-8 px-6">
          <motion.h2
            variants={childVariant}
            className="font-platypi text-4xl font-light text-bloom-dark md:text-5xl"
          >
            Posts
          </motion.h2>

          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6"
          >

            {visiblePosts.map((post) => (
              <motion.a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={childVariant}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                className="group block rounded-3xl bg-white/75 p-6 shadow-[0_12px_35px_rgba(28,39,58,0.06)] backdrop-blur-md transition-[box-shadow,background-color] duration-300 hover:bg-white/90 hover:shadow-[0_18px_45px_rgba(112,80,255,0.12)] md:p-8"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="max-w-4xl">
                    <div className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-bloom-violet/80">
                      {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(post.publishedAt))}
                    </div>
                    <h3 className="font-platypi text-xl font-light leading-snug text-bloom-dark transition-colors duration-300 group-hover:text-bloom-violet md:text-2xl">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {post.description}
                    </p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bloom-violet/10 text-bloom-violet transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-bloom-violet group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </motion.a>
            ))}

            {substackPosts.length > 3 && (
              <motion.button
                type="button"
                variants={childVariant}
                onClick={() => setPostsExpanded((expanded) => !expanded)}
                aria-expanded={postsExpanded}
                className="group mx-auto flex items-center gap-2 rounded-full bg-white/70 px-5 py-2.5 text-sm font-medium text-bloom-dark shadow-sm transition-colors hover:bg-white hover:text-bloom-violet"
              >
                {postsExpanded ? (
                  <><ChevronUp className="h-4 w-4" />Show fewer posts</>
                ) : (
                  <><ChevronDown className="h-4 w-4" />Show more posts</>
                )}
              </motion.button>
            )}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Partners banner */}
      <section className="overflow-hidden py-10 md:py-14" aria-label="Partners">
        <div className="partners-marquee flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12 md:gap-16 md:pr-16" aria-hidden={copy === 1}>
              {partners.map((partner) => (
                <img
                  key={partner.name}
                  src={partner.logo}
                  alt={copy === 0 ? partner.name : ""}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-32 shrink-0 object-contain sm:h-14 sm:w-40 md:h-16 md:w-44"
                />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Join Us and Team Section */}
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-16 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
      {/* Team Section */}
      <AnimatedSection
        id="team"
        className="order-2 py-0"
      >
        <div className="space-y-8">
          {/* Title */}
          <motion.h2
            variants={childVariant}
            className="font-platypi text-4xl font-light text-bloom-dark md:text-5xl"
          >
            Team
          </motion.h2>

          {/* People grid */}
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 gap-5 sm:gap-8"
          >
            {/* Lucie */}
            <motion.div
              variants={childVariant}
              className="group flex flex-col"
            >
              {/* Photo wrapper */}
              <div className="relative w-full max-w-[180px] mx-auto rounded-xl overflow-hidden">
                {/* BW base */}
                <img
                  src={lucieBwPng}
                  alt="Lucie Vanhollebeke"
                  width="500"
                  height="500"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Color overlay */}
                <img
                  src={lucieColorPng}
                  alt="Lucie Vanhollebeke (color)"
                  width="500"
                  height="500"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
                />

                {/* LinkedIn badge in corner */}
                <a
                  href="https://www.linkedin.com/in/lucie-vanhollebeke-b649b01b9/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 rounded-full bg-bloom-deep/85 hover:bg-bloom-violet border border-bloom-cyan/60 p-1.5 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                  >
                    <path d="M4.983 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001ZM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6v6.2h-4V16c0-1.5 0-3.5-2.2-3.5-2.2 0-2.6 1.6-2.6 3.4v5.1H9z" />
                  </svg>
                </a>
              </div>

              {/* Text block */}
              <div className="pb-6 pt-6 text-center">
                <div className="text-lg font-medium text-bloom-deep group-hover:text-bloom-violet transition-colors duration-200">
                  Lucie Vanhollebeke
                </div>
                <div className="text-sm text-foreground/85 font-light mt-1">
                  Bionanophotonics
                </div>
                <div className="text-[0.7rem] uppercase tracking-wide text-bloom-violet/70 leading-relaxed mt-2">
                  Harvard · ETH Zurich · EPFL
                </div>
              </div>
            </motion.div>

            {/* Blanche */}
            <motion.div
              variants={childVariant}
              className="group flex flex-col"
            >
              {/* Photo wrapper */}
              <div className="relative w-full max-w-[180px] mx-auto rounded-xl overflow-hidden">
                {/* BW base */}
                <img
                  src={blancheBwPng}
                  alt="Blanche Marion"
                  width="500"
                  height="500"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Color overlay */}
                <img
                  src={blancheColorPng}
                  alt="Blanche Marion (color)"
                  width="500"
                  height="500"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
                />

                {/* LinkedIn badge */}
                <a
                  href="https://www.linkedin.com/in/blanche-marion-03800020a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 rounded-full bg-bloom-deep/85 hover:bg-bloom-violet border border-bloom-cyan/60 p-1.5 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                  >
                    <path d="M4.983 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001ZM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6v6.2h-4V16c0-1.5 0-3.5-2.2-3.5-2.2 0-2.6 1.6-2.6 3.4v5.1H9z" />
                  </svg>
                </a>
              </div>

              {/* Text block */}
              <div className="pb-6 pt-6 text-center">
                <div className="text-lg font-medium text-bloom-deep group-hover:text-bloom-violet transition-colors duration-200">
                  Blanche Marion
                </div>
                <div className="text-sm text-foreground/85 font-light mt-1">
                  Computational Neuroscience
                </div>
                <div className="text-[0.7rem] uppercase tracking-wide text-bloom-violet/70 leading-relaxed mt-2">
                  Harvard · EPFL
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>


      {/* Join Us Section */}
      <AnimatedSection
        id="join-us"
        className="order-1 py-0"
      >
        <div className="space-y-8">
          <motion.h2
            variants={childVariant}
            className="font-platypi text-4xl font-light text-bloom-dark md:text-5xl"
          >
            Join us
          </motion.h2>

          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6 lg:pt-8"
          >
            <motion.p
              variants={childVariant}
              className="text-body-large font-medium text-foreground"
            >
              Stay close, follow the work, show up to
              experiments, help shape what Bloom Lab becomes.
            </motion.p>

            {/* Social Buttons */}
            <motion.div
              variants={childVariant}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              <motion.a
                href="https://x.com/BloomLab_"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
                className="inline-block rounded-full bg-[#73E8FF]/35 px-5 py-2.5 text-center text-sm font-medium text-bloom-dark transition-colors hover:bg-[#73E8FF]/55"
              >
                X
              </motion.a>

              <motion.a
                href="https://www.instagram.com/_bloom_lab/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
                className="inline-block rounded-full bg-[#2BA4E0]/20 px-5 py-2.5 text-center text-sm font-medium text-bloom-dark transition-colors hover:bg-[#2BA4E0]/35"
              >
                Instagram
              </motion.a>

              <motion.a
                href="https://substack.com/@bloomlab"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
                className="inline-block rounded-full bg-[#7050FF]/20 px-5 py-2.5 text-center text-sm font-medium text-bloom-dark transition-colors hover:bg-[#7050FF]/35"
              >
                Substack
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center text-sm text-muted-foreground">
        <p>© Bloom Lab</p>
      </footer>
    </div>
  );
};

export default MainLanding;
