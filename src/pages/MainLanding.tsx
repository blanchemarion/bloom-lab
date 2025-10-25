import Navbar from "@/components/Navbar";

const MainLanding = () => {
  return (
    <div
      className="min-h-screen font-sans animate-fade-in"
      style={{
        backgroundColor: "#121212", // dark background
        color: "#FFFFFF", // default text color
      }}
    >
      {/* NAVBAR */}
      {/* Make sure Navbar renders links in white (#FFFFFF)
          and on hover uses cyan (#00CFEA) */}
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto space-y-10 text-center md:text-left">
          {/* Logo */}
          <img
            src="/logo_bloom.png"
            alt="Bloom Lab Logo"
            className="mx-auto md:mx-0 w-40 md:w-56 object-contain"
          />

          {/* Main copy */}
          <div className="text-base md:text-lg leading-relaxed space-y-6 text-[#EDEDED]">
            <p>
              The thinking lab for interdisciplinary research on biology's open questions
              Bloom Lab is an interdisciplinary research community exploring the
              boundaries of biology. We bring together physicists, chemists,
              engineers, and computational thinkers to study life as a system:
              how matter becomes mind, how cells make decisions, and what new
              forms of life could exist.
            </p>

            <p>
              Through talks, hackathons, and hands-on projects, we test bold
              ideas where biology meets physics, chemistry, and computation.
            </p>

            <p
              className="font-medium"
              style={{
                color: "#00CFEA", // cyan
              }}
            >
              We're not a department, we're a space for discovery.
              <br />
              Because life is bigger than any one discipline.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="container mx-auto px-6 py-20"
        style={{
          borderTop: "1px solid rgba(112,80,255,0.4)", // translucent violet
        }}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <h2
            className="text-4xl md:text-5xl font-light tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #00CFEA 0%, #7050FF 100%)", // cyan → violet
            }}
          >
            About Bloom Lab
          </h2>
          <div className="text-base md:text-lg leading-relaxed space-y-6 text-[#EDEDED]">
            <p>
              We’re Lucie and Blanche, fascinated by the intelligence and complexity of nature and driven to explore 
              how interdisciplinary science can decode biology and inspire new technologies. 
              We met during the Covid lockdown, collaborated on projects from EPFL courses to a startup, 
              and realized the joy of building ambitious ideas together. At Harvard and MIT, we developed our 
              first polymath project on aging and biological relativity, and back in Europe we founded Bloom Lab: 
              a community of thinkers where curiosity drives interdisciplinary discovery.
            </p>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section
        id="schedule"
        className="container mx-auto px-6 py-20"
        style={{
          borderTop: "1px solid rgba(112,80,255,0.4)", // violet line
        }}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <h2
            className="text-4xl md:text-5xl font-light tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #00CFEA 0%, #7050FF 100%)",
            }}
          >
            Schedule / Upcoming Events
          </h2>

          <div className="space-y-4 text-[#BFBFBF] text-base md:text-lg leading-relaxed">

            <div
              className="rounded-lg p-4 transition-colors"
              style={{
                border: "1px solid rgba(0,207,234,0.4)", // cyan border
                backgroundColor: "rgba(18,18,18,0.6)",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <span
                  className="text-sm font-medium"
                  style={{ color: "#00CFEA" }}
                >
                  Nov 12 — Hackathon: “Can cells compute?”
                </span>
                <span
                  className="text-xs uppercase tracking-wide"
                  style={{ color: "#7050FF" }}
                >
                  open to all disciplines
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section
        id="posts"
        className="container mx-auto px-6 py-20"
        style={{
          borderTop: "1px solid rgba(112,80,255,0.4)",
        }}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <h2
            className="text-4xl md:text-5xl font-light tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #00CFEA 0%, #7050FF 100%)",
            }}
          >
            Posts
          </h2>

          <div className="space-y-6 text-base md:text-lg leading-relaxed">

            {/* Post 1 */}
            <a
              href="https://open.substack.com/pub/bloomlab/p/what-is-bloom-lab?r=6c94au&utm_campaign=post&utm_medium=web"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg p-4 transition-colors"
              style={{
                border: "1px solid rgba(0,207,234,0.4)",          // cyan border default
                backgroundColor: "rgba(18,18,18,0.6)",            // translucent dark card
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.border =
                  "1px solid rgba(112,80,255,0.7)";               // violet on hover
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.border =
                  "1px solid rgba(0,207,234,0.4)";                // back to cyan
              }}
            >
              <div className="flex flex-col gap-2">
                <div
                  className="text-lg font-medium"
                  style={{ color: "#00CFEA" }}                     // cyan title
                >
                  What is Bloom Lab?
                </div>
                <div
                  className="text-sm leading-relaxed text-[#BFBFBF]"
                >
                  When people ask what we do at Bloom Lab, we usually start with a confession: we don’t always know… 
                  And that’s kind of the point! [...]
                </div>
                <div
                  className="text-xs uppercase tracking-wide font-medium"
                  style={{ color: "#7050FF" }}                     // violet "read" tag
                >
                  Read →
                </div>
              </div>
            </a>

            {/* Post 2 */}
            <a
              href="https://open.substack.com/pub/bloomlab/p/what-we-mean-when-we-say-life-is?r=6c94au&utm_campaign=post&utm_medium=web"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg p-4 transition-colors"
              style={{
                border: "1px solid rgba(0,207,234,0.4)",
                backgroundColor: "rgba(18,18,18,0.6)",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.border =
                  "1px solid rgba(112,80,255,0.7)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.border =
                  "1px solid rgba(0,207,234,0.4)";
              }}
            >
              <div className="flex flex-col gap-2">
                <div
                  className="text-lg font-medium"
                  style={{ color: "#00CFEA" }}
                >
                  What we mean when we say “life is biology”
                </div>
                <div
                  className="text-sm leading-relaxed text-[#BFBFBF]"
                >
                  As we embark on Bloom Lab and slowly shape our vision, I want to share the idea that drives us, our guiding statement. [...]
                </div>
                <div
                  className="text-xs uppercase tracking-wide font-medium"
                  style={{ color: "#7050FF" }}
                >
                  Read →
                </div>
              </div>
            </a>

          </div>
        </div>
      </section>


      {/* Join Us Section */}
      <section
        id="join-us"
        className="container mx-auto px-6 py-20"
        style={{
          borderTop: "1px solid rgba(112,80,255,0.4)",
        }}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <h2
            className="text-4xl md:text-5xl font-light tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #00CFEA 0%, #7050FF 100%)",
            }}
          >
            Join Us
          </h2>

          <div className="space-y-6 text-[#BFBFBF] text-base md:text-lg leading-relaxed">

            {/* CTA text */}
            <p
              className="font-medium"
              style={{
                color: "#00CFEA", // cyan accent for call to action
              }}
            >
              If you're into this, stay close.  
              Follow the work, show up to experiments, help shape what Bloom becomes.
            </p>

            {/* Social buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">

              {/* X / Twitter */}
              <a
                href="https://x.com/BloomLab_"
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  inline-block px-5 py-3 rounded-full text-sm font-medium text-center
                  transition-colors duration-200 text-white
                `}
                style={{
                  backgroundColor: "#7050FF", // violet default
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "#00CFEA"; // cyan hover
                  (e.currentTarget as HTMLAnchorElement).style.color = "#121212"; // dark text on cyan
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "#7050FF"; // back to violet
                  (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF";
                }}
              >
                Follow us on X
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/_bloom_lab/"
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  inline-block px-5 py-3 rounded-full text-sm font-medium text-center
                  transition-colors duration-200 text-white
                `}
                style={{
                  backgroundColor: "#7050FF",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "#00CFEA";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#121212";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "#7050FF";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF";
                }}
              >
                Instagram
              </a>

              {/* Substack */}
              <a
                href="https://substack.com/@bloomlab"
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  inline-block px-5 py-3 rounded-full text-sm font-medium text-center
                  transition-colors duration-200 text-white
                `}
                style={{
                  backgroundColor: "#7050FF",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "#00CFEA";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#121212";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "#7050FF";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF";
                }}
              >
                Substack
              </a>
            </div>
          </div>
        </div>
      </section>




      {/* Footer */}
      <footer
        className="container mx-auto px-6 py-8 text-center text-sm"
        style={{
          borderTop: "1px solid rgba(112,80,255,0.4)",
          color: "#6F6F6F",
        }}
      >
        <p>© Bloom Lab</p>
      </footer>
    </div>
  );
};

export default MainLanding;
