import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";

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

      {/* Hero Section with Gradient Background */}
      <section
        ref={heroRef}
        className="relative container mx-auto px-6 py-20 md:py-32 overflow-hidden"
      >
        {/* Subtle Gradient Background */}
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, hsl(var(--bloom-cyan) / 0.1), transparent 50%), radial-gradient(circle at 70% 50%, hsl(var(--bloom-violet) / 0.08), transparent 50%)",
            animation: "gradient-shift 15s ease infinite",
            backgroundSize: "200% 200%",
          }}
        />

        <div className="max-w-4xl mx-auto space-y-10 text-center md:text-left">
          {/* Logo */}
          <motion.div
            custom={0}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            variants={heroVariants}
          >
            <img
              src="/logo_bloom.png"
              alt="Bloom Lab Logo"
              className="mx-auto md:mx-0 w-40 md:w-56 object-contain"
            />
          </motion.div>

          {/* Mission Statement - Staggered Paragraphs */}
          <motion.div
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="text-body-large space-y-6 text-white"
          >
            {/* Paragraph 1 */}
            <motion.p variants={heroVariants} custom={1}>
              Bloom Lab is an interdisciplinary research community exploring the
              boundaries of <em><strong>biology</strong></em>. We bring together{" "}
              <em><strong>physicists</strong></em>,{" "}
              <em><strong>chemists</strong></em>,{" "}
              <em><strong>engineers</strong></em>, and{" "}
              <em><strong>computational thinkers</strong></em> to study life as a system:
              how matter becomes <em><strong>mind</strong></em>, how cells make{" "}
              <em><strong>decisions</strong></em>, and what new forms of{" "}
              <em><strong>life</strong></em> could exist.
            </motion.p>

            {/* Paragraph 2 */}
            <motion.p variants={heroVariants} custom={2}>
              Through <em><strong>talks</strong></em>,{" "}
              <em><strong>hackathons</strong></em>, and{" "}
              <em><strong>hands-on projects</strong></em>, we test bold ideas where{" "}
              <em><strong>biology meets physics, chemistry, and computation</strong></em>.
            </motion.p>

            {/* Paragraph 3 (gradient text) */}
            <motion.p
              variants={heroVariants}
              custom={3}
              className="font-medium bg-gradient-to-r from-bloom-cyan to-bloom-violet bg-clip-text text-transparent"
            >
              We're not a <em><strong>department</strong></em>, we're a{" "}
              <em><strong>space for discovery</strong></em>.
              <br />
              Because <em><strong>life</strong></em> is bigger than any one{" "}
              <em><strong>discipline</strong></em>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AnimatedSection
        id="about"
        className="container mx-auto px-6 py-20 border-t border-bloom-violet/40"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.h2
            variants={childVariant}
            className="text-section-header bg-gradient-to-r from-bloom-cyan to-bloom-violet bg-clip-text text-transparent"
          >
            About Bloom Lab
          </motion.h2>

          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-body-large space-y-6 text-foreground/90"
          >
            <motion.p variants={childVariant}>
              We're Lucie and Blanche, fascinated by the intelligence and
              complexity of nature and driven to explore how interdisciplinary
              science can decode biology and inspire new technologies.
            </motion.p>

            {/* Expandable Content */}
            <motion.div
              initial={false}
              animate={{
                height: aboutExpanded ? "auto" : 0,
                opacity: aboutExpanded ? 1 : 0,
              }}
              transition={{
                height: { duration: 0.5, ease: "easeInOut" },
                opacity: { duration: 0.4, ease: "easeOut" },
              }}
              className="overflow-hidden"
            >
              <div className="space-y-6 pt-4">
                <p className="text-body-large text-foreground/90">
                  We met during the Covid lockdown, collaborated on projects
                  from EPFL courses to a startup, and realized the joy of
                  building ambitious ideas together.
                </p>
                <p className="text-body-large text-foreground/90">
                  At Harvard and MIT, we developed our first polymath project on
                  aging and biological relativity, and back in Europe we founded
                  Bloom Lab: a community of thinkers where curiosity drives
                  interdisciplinary discovery.
                </p>
              </div>
            </motion.div>

            {/* Toggle Button */}
            <motion.button
              onClick={() => setAboutExpanded(!aboutExpanded)}
              className="group flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-all duration-200"
              whileHover={{ x: 3 }}
              variants={childVariant}
            >
              {aboutExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                  Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                  More Info
                </>
              )}
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
              className="group rounded-lg p-4 border border-bloom-cyan/40 bg-background/60 backdrop-blur transition-all duration-200 hover:border-bloom-violet/70 hover:shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <span className="text-sm font-medium text-bloom-cyan group-hover:text-bloom-violet transition-colors duration-200">
                  Nov 12 — Hackathon: "Can cells compute?"
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
                <div className="rounded-lg p-4 border border-bloom-cyan/40 bg-background/60 backdrop-blur">
                  <span className="text-sm text-bloom-textSecondary">
                    More events coming soon...
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Toggle Button */}
            <motion.button
              onClick={() => setScheduleExpanded(!scheduleExpanded)}
              className="group flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-all duration-200"
              whileHover={{ x: 3 }}
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
              className="block rounded-lg p-4 border border-bloom-cyan/40 bg-background/60 backdrop-blur hover:border-bloom-violet/70 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex flex-col gap-2">
                <div className="text-lg font-medium text-bloom-cyan">
                  What is Bloom Lab?
                </div>
                <div className="text-sm leading-relaxed text-bloom-textSecondary">
                  When people ask what we do at Bloom Lab, we usually start with
                  a confession: we don't always know… And that's kind of the
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
              className="block rounded-lg p-4 border border-bloom-cyan/40 bg-background/60 backdrop-blur hover:border-bloom-violet/70 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex flex-col gap-2">
                <div className="text-lg font-medium text-bloom-cyan">
                  What we mean when we say "life is biology"
                </div>
                <div className="text-sm leading-relaxed text-bloom-textSecondary">
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
              className="text-body-large font-medium text-bloom-cyan"
            >
              If you're into this, stay close. Follow the work, show up to
              experiments, help shape what Bloom becomes.
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
                Follow us on X
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