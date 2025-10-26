import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import NetworkScrollSection from "./NetworkScrollSection";
import bioRelHero from "@/assets/photo_bio_rel.jpg";

// Animation Variants
const heroVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      delay: custom * 0.15,
      ease: [0.32, 0.72, 0, 1] as any,
    },
  }),
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1] as any,
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
      ease: [0.4, 0, 0.2, 1] as any,
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
      className={className}
    >
      {children}
    </motion.section>
  );
};

const MainLanding = () => {
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [scheduleExpanded, setScheduleExpanded] = useState(false);

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });


  return (
    <div
      className="min-h-screen text-foreground"
      style={{ backgroundColor: "#121212" }}
    >
      <Navbar />

      {/* NEW: Scroll network hero */}
      <NetworkScrollSection />


      {/* About Section */}
      <AnimatedSection
        id="about"
        className="container mx-auto px-6 pt-10 pb-20 border-t border-bloom-violet/40"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Section Title */}
          <motion.h2
            variants={childVariant}
            className="text-section-header bg-gradient-to-r from-bloom-cyan to-bloom-violet bg-clip-text text-center text-transparent"
          >
            A Space for Curious Thinkers
          </motion.h2>

          {/* Main Copy (progressively revealed on scroll) */}
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-body-large space-y-6 text-white text-center leading-relaxed"
          >
            <motion.p variants={childVariant}>
              Some say life is <strong>physics</strong>.
              <br />
              Others, <strong>chemistry</strong> or <strong>computation</strong>.
              <br />
              We say <em>life is biology</em> — where all disciplines meet.
            </motion.p>

            <motion.p variants={childVariant}>
              At <strong className="text-bloom-violet">Bloom Lab</strong>, we see biology not as a collection of
              molecules or algorithms, but as a <strong>living system</strong> that{" "}
              <em>organizes, adapts,</em> and <em>learns.</em> We bring together{" "}
              <strong>scientists</strong>, <strong>engineers</strong>, and <strong>thinkers</strong> to explore how{" "}
              matter becomes mind, how cells compute, and
              what new forms of life could exist.
            </motion.p>

            <motion.p variants={childVariant}>
              Because life is the universe’s most successful interdisciplinary project,{" "}
              <strong className="text-bloom-violet">Bloom Lab</strong> isn’t a department — it’s a space where{" "}
              <em>imagination meets rigor.</em>
            </motion.p>

            <motion.p variants={childVariant}>
              Through <strong>talks</strong>, <strong>hackathons</strong>, and <strong>experiments</strong>, we let{" "}
              curiosity grow and <em>new laws of biology emerge</em>.
            </motion.p>
          </motion.div>

        </div>
      </AnimatedSection>

      {/* Schedule Section */}
      <AnimatedSection
        id="schedule"
        className="container mx-auto px-6 py-20 border-t border-bloom-violet/40"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.h2
            variants={childVariant}
            className="text-section-header bg-gradient-to-r from-bloom-cyan to-bloom-violet bg-clip-text text-transparent"
          >
            Upcoming Events
          </motion.h2>

          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-4"
          >
            {/* Event Card */}
            <motion.div
              variants={childVariant}
              whileHover={{
                y: -2,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              className="group rounded-lg p-4 border border-bloom-cyan/40 transition-all duration-200 hover:border-bloom-violet/70 hover:shadow-lg"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)", // translucent black (30%)
                backdropFilter: "blur(6px)", // keeps the “glass” effect
              }}
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <span className="text-sm font-medium text-bloom-cyan group-hover:text-bloom-violet transition-colors duration-200">
                  Dec 5-7 — Hackathon: Theme TBD
                </span>
                <span className="text-xs uppercase tracking-wide text-bloom-violet/70">
                  open to all disciplines
                </span>
              </div>
            </motion.div>

            {/* Expandable Additional Events */}
            <motion.div
              initial={false}
              animate={{
                height: scheduleExpanded ? "auto" : 0,
                opacity: scheduleExpanded ? 1 : 0,
              }}
              transition={{
                height: { duration: 0.5, ease: "easeInOut" },
                opacity: { duration: 0.4, ease: "easeOut" },
              }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-4">
                <div
                  className="rounded-lg p-4 border border-bloom-cyan/40 transition-all duration-200"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.3)", // same translucent black
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <span className="text-sm text-[#BFBFBF]">
                    More events coming soon...
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Toggle Button */}
            <motion.button
              onClick={() => setScheduleExpanded(!scheduleExpanded)}
              className="group flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-full transition-all duration-200 shadow-md"
              style={{
                backgroundColor: "#7050FF", // violet default
              }}
              whileHover={{ x: 3 }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#00CFEA"; // cyan on hover
                (e.currentTarget as HTMLButtonElement).style.color = "#121212"; // dark text on cyan
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#7050FF"; // back to violet
                (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF"; // white text again
              }}
              variants={childVariant}
            >
              {scheduleExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                  Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                  More Events
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Emerged Work Section */}
      <AnimatedSection
        id="emerged-work"
        className="container mx-auto px-6 py-20 border-t border-bloom-violet/40"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div variants={childVariant} className="space-y-2">
            <h2 className="text-section-header bg-gradient-to-r from-bloom-cyan to-bloom-violet bg-clip-text text-transparent">
              Emerged Work
            </h2>
            <p className="text-sm text-bloom-text-secondary text-white">
              Past projects and ideas that have emerged from Bloom Lab.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Project 1: Biological Relativity */}
            <motion.a
              href="/projects/biological-relativity"
              variants={childVariant}
              whileHover={{
                y: -4,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className="group block rounded-lg overflow-hidden border border-bloom-cyan/40 transition-all duration-200 hover:border-bloom-violet/70 hover:shadow-lg"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                backdropFilter: "blur(6px)",
              }}
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={bioRelHero}
                  alt="Biological Relativity project visualization"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-medium text-bloom-cyan group-hover:text-bloom-violet transition-colors duration-200">
                  Biological Relativity
                </h3>
                <p className="text-xs uppercase tracking-wide text-bloom-violet/70">
                  2024
                </p>
              </div>
            </motion.a>

            {/* Project 2: Coming Soon Placeholder */}
            <motion.a
              href="/projects/coming-soon"
              variants={childVariant}
              whileHover={{
                y: -4,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className="group block rounded-lg overflow-hidden border border-bloom-cyan/40 transition-all duration-200 hover:border-bloom-violet/70 hover:shadow-lg"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                backdropFilter: "blur(6px)",
              }}
            >
              <div className="aspect-video w-full flex items-center justify-center bg-gradient-to-br from-bloom-dark/50 to-bloom-violet/20">
                <span className="text-bloom-text-secondary text-sm font-light">
                  Next project
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-medium text-bloom-cyan group-hover:text-bloom-violet transition-colors duration-200">
                  Coming soon…
                </h3>
                <p className="text-xs uppercase tracking-wide text-bloom-violet/70">
                  TBD
                </p>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Posts Section */}
      <AnimatedSection
        id="posts"
        className="container mx-auto px-6 py-20 border-t border-bloom-violet/40"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.h2
            variants={childVariant}
            className="text-section-header bg-gradient-to-r from-bloom-cyan to-bloom-violet bg-clip-text text-transparent"
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

            {/* Post 1 */}
            <motion.a
              href="https://open.substack.com/pub/bloomlab/p/what-we-mean-when-we-say-life-is?r=6c94au&utm_campaign=post&utm_medium=web"
              target="_blank"
              rel="noopener noreferrer"
              variants={childVariant}
              whileHover={{
                scale: 1.02,
                y: -2,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className="block rounded-lg p-4 border border-bloom-cyan/40 transition-all duration-200 hover:border-bloom-violet/70 hover:shadow-lg"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)", // translucent black background
                backdropFilter: "blur(6px)",
              }}
            >
              <div className="flex flex-col gap-2">
                <div className="text-lg font-medium text-bloom-cyan">
                  What we mean when we say "life is biology"
                </div>
                <div className="text-sm leading-relaxed text-[#BFBFBF]">
                  As we embark on Bloom Lab and slowly shape our vision, I want
                  to share the idea that drives us, our guiding statement. [...]
                </div>
                <div className="text-xs uppercase tracking-wide font-medium text-bloom-violet">
                  Read →
                </div>
              </div>
            </motion.a>

            {/* Post 2 */}
            <motion.a
              href="https://open.substack.com/pub/bloomlab/p/what-is-bloom-lab?r=6c94au&utm_campaign=post&utm_medium=web"
              target="_blank"
              rel="noopener noreferrer"
              variants={childVariant}
              whileHover={{
                scale: 1.02,
                y: -2,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className="block rounded-lg p-4 border border-bloom-cyan/40 transition-all duration-200 hover:border-bloom-violet/70 hover:shadow-lg"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)", // translucent black background
                backdropFilter: "blur(6px)", // subtle glass effect
              }}
            >
              <div className="flex flex-col gap-2">
                <div className="text-lg font-medium text-bloom-cyan">
                  What is Bloom Lab?
                </div>
                <div className="text-sm leading-relaxed text-[#BFBFBF]">
                  When people ask what we do at Bloom Lab, we usually start with
                  a confession: we don’t always know… And that’s kind of the
                  point! [...]
                </div>
                <div className="text-xs uppercase tracking-wide font-medium text-bloom-violet">
                  Read →
                </div>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Join Us Section */}
      <AnimatedSection
        id="join-us"
        className="container mx-auto px-6 py-20 border-t border-bloom-violet/40"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.h2
            variants={childVariant}
            className="text-section-header bg-gradient-to-r from-bloom-cyan to-bloom-violet bg-clip-text text-transparent"
          >
            Join Us
          </motion.h2>

          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6"
          >
            <motion.p
              variants={childVariant}
              className="text-body-large font-medium text-white"
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
                className="inline-block px-5 py-3 rounded-full text-sm font-medium text-center bg-bloom-violet text-white hover:bg-bloom-cyan hover:text-bloom-dark transition-all duration-200 shadow-md hover:shadow-lg"
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
                className="inline-block px-5 py-3 rounded-full text-sm font-medium text-center bg-bloom-violet text-white hover:bg-bloom-cyan hover:text-bloom-dark transition-all duration-200 shadow-md hover:shadow-lg"
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
                className="inline-block px-5 py-3 rounded-full text-sm font-medium text-center bg-bloom-violet text-white hover:bg-bloom-cyan hover:text-bloom-dark transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Substack
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center text-sm border-t border-bloom-violet/40 text-muted-foreground">
        <p>© Bloom Lab</p>
      </footer>
    </div>
  );
};

export default MainLanding;