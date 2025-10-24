import Navbar from "@/components/Navbar";

const MainLanding = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight">
            Bloom Lab
          </h1>
          <div className="text-lg md:text-xl leading-relaxed space-y-6">
            <p>
              Bloom Lab is an interdisciplinary research community exploring the boundaries of biology. 
              We bring together physicists, chemists, engineers, and computational thinkers to study life 
              as a system: how matter becomes mind, how cells make decisions, and what new forms of life could exist.
            </p>
            <p>
              Through talks, hackathons, and hands-on projects, we test bold ideas where biology meets 
              physics, chemistry, and computation.
            </p>
            <p className="font-medium">
              We're not a department, we're a space for discovery.
              <br />
              Because life is bigger than any one discipline.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-6 py-20 border-t border-border">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            About Bloom Lab
          </h2>
          <div className="text-muted-foreground space-y-4">
            {/* TODO: fill About content */}
            <p className="italic">Content coming soon...</p>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="container mx-auto px-6 py-20 border-t border-border">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            Schedule / Upcoming Events
          </h2>
          <div className="text-muted-foreground space-y-4">
            {/* TODO: add timeline or event list component */}
            <p className="italic">Events and schedule coming soon...</p>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section id="posts" className="container mx-auto px-6 py-20 border-t border-border">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            Posts / Ideas / Notes
          </h2>
          <div className="text-muted-foreground space-y-4">
            {/* TODO: add cards/articles for posts */}
            <p className="italic">Posts and ideas coming soon...</p>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section id="join-us" className="container mx-auto px-6 py-20 border-t border-border">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            Join Us
          </h2>
          <div className="text-muted-foreground space-y-4">
            {/* TODO: add blurb + button or form */}
            <p className="italic">Information on joining coming soon...</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-border">
        <p className="text-center text-sm text-muted-foreground">
          © Bloom Lab
        </p>
      </footer>
    </div>
  );
};

export default MainLanding;
