import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import NetworkScrollSection from "./NetworkScrollSection";

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

    <div className="max-w-4xl mx-auto space-y-5">

    {/* Scroll hint
      <section
        ref={heroRef}
        className="relative flex items-center justify-center h-screen overflow-hidden bg-black"
      >
        <motion.div
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              "radial-gradient(circle at 30% 50%, rgba(0,207,234,0.15), transparent 60%), radial-gradient(circle at 70% 50%, rgba(112,80,255,0.15), transparent 60%)",
              "radial-gradient(circle at 40% 60%, rgba(0,207,234,0.25), transparent 70%), radial-gradient(circle at 60% 40%, rgba(112,80,255,0.25), transparent 70%)",
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                scale: Math.random() * 0.8 + 0.2,
              }}
              animate={{
                y: ["0%", "100%", "0%"],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.img
          src="/logo_bloom.png"
          alt="Bloom Lab Logo"
          className="z-10 w-56 md:w-72 opacity-90"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        <motion.div
          className="absolute bottom-10 text-white/70 text-sm"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          ↓ scroll to explore
        </motion.div>
      </section>
      */}


      {/* About Section */}
      <AnimatedSection
        id="about"
        className="container mx-auto px-6 py-20 border-t border-bloom-violet/40"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Section Title */}
          <motion.h2
            variants={childVariant}
            className="text-section-header bg-gradient-to-r from-bloom-cyan to-bloom-violet bg-clip-text text-transparent"
          >
            About Bloom Lab
          </motion.h2>

          {/* Main Copy (progressively revealed on scroll) */}
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-body-large space-y-6 text-white"
          >
            <motion.p variants={childVariant}>
              Bloom Lab is an interdisciplinary research community exploring the
              boundaries of biology. We bring together physicists, chemists,
              engineers, and computational thinkers to study life as a system:
              how matter becomes mind, how cells make decisions, and what new
              forms of life could exist.
            </motion.p>

            <motion.p variants={childVariant}>
              Through talks, hackathons, and hands-on projects, we test bold
              ideas where biology meets physics, chemistry, and computation.
            </motion.p>

            <motion.p variants={childVariant}>
              We're not a department, we're a space for discovery.
              <br />
              Because life is bigger than any one discipline.
            </motion.p>

            {/* CTA Button (violet, no expansion yet) */}
            <motion.button
              // no onClick logic for now
              className="group inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 text-white px-4 py-2 rounded-full shadow-md"
              style={{
                backgroundColor: "#7050FF", // violet
              }}
              whileHover={{ x: 3 }}
              variants={childVariant}
            >
              <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              More Info
            </motion.button>
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
            Schedule / Upcoming Events
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

            {/* Post 2 */}
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