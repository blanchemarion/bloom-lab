import Navbar from "@/components/Navbar";

const MainLanding = () => {
  return (
    <div
      className="min-h-screen font-sans animate-fade-in"
      style={{
        backgroundColor: "#121212", // black background
        color: "#FFFFFF", // default text color
      }}
    >
      {/* NAVBAR */}
      {/* You should update Navbar so that:
          - background is transparent over #121212
          - links are white by default (#FFFFFF)
          - hover on links -> color: #00CFEA (cyan)
          - "Join Us" button -> background #7050FF, hover #00CFEA
      */}
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
                color: "#00CFEA", // cyan accent block
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
          borderTop: "1px solid rgba(112,80,255,0.4)", // translucent violet line
        }}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <h2
            className="text-4xl md:text-5xl font-light tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #00CFEA 0%, #7050FF 100%)", // cyan -> violet gradient
            }}
          >
            About Bloom Lab
          </h2>

          <div
            className="space-y-4 text-[#BFBFBF] text-base md:text-lg leading-relaxed"
          >
            <p className="italic">Content coming soon...</p>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section
        id="schedule"
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
            Schedule / Upcoming Events
          </h2>

          <div className="space-y-4 text-[#BFBFBF] text-base md:text-lg leading-relaxed">
            <p className="italic">Events and schedule coming soon...</p>

            {/* Placeholder for future event cards */}
            {/* Example (keep for later):
            <div
              className="rounded-lg p-4 border transition-colors"
              style={{
                borderColor: "rgba(0,207,234,0.4)", // cyan border for cards
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
            */}
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
            Posts / Ideas / Notes
          </h2>

          <div className="space-y-4 text-[#BFBFBF] text-base md:text-lg leading-relaxed">
            <p className="italic">Posts and ideas coming soon...</p>

            {/* For later: cards with cyan titles, violet tags */}
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
            <p className="italic">Information on joining coming soon...</p>

            {/* future CTA button */}
            <button
              className="px-5 py-3 rounded-full text-sm font-medium transition-colors"
              style={{
                backgroundColor: "#7050FF", // violet default
                color: "#FFFFFF",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#00CFEA"; // cyan hover
                (e.currentTarget as HTMLButtonElement).style.color = "#121212"; // dark text on cyan
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#7050FF"; // back to violet
                (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
              }}
            >
              Request an invite
