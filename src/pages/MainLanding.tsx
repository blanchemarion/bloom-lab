const MainLanding = () => {
  return (
    <div className="min-h-screen bg-background text-[#FFFFE3] font-sans animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-16">
        <header className="text-center space-y-4 pt-20">
          <img
            src="/logo_bloom.png"
            alt="Bloom Lab Logo"
            className="mx-auto w-48 md:w-64 object-contain"
          />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            An interdisciplinary research community exploring the boundaries of biology,
            where science meets philosophy and curiosity blooms into discovery.
          </p>
        </header>

        <section className="grid md:grid-cols-3 gap-8 pt-12">
          <div className="space-y-4 text-center">
            <div className="text-4xl">🧬</div>
            <h3 className="text-2xl font-light">Research</h3>
            <p className="text-muted-foreground">
              Pushing the boundaries of biological understanding through interdisciplinary inquiry
            </p>
          </div>

          <div className="space-y-4 text-center">
            <div className="text-4xl">🤔</div>
            <h3 className="text-2xl font-light">Philosophy</h3>
            <p className="text-muted-foreground">
              Exploring profound questions at the intersection of life, consciousness, and existence
            </p>
          </div>

          <div className="space-y-4 text-center">
            <div className="text-4xl">🌱</div>
            <h3 className="text-2xl font-light">Community</h3>
            <p className="text-muted-foreground">
              A collaborative space for thinkers, researchers, and curious minds to connect
            </p>
          </div>
        </section>

        <div className="text-center pt-12">
          <p className="text-philosophical italic">
            "The beauty of a living thing is not the atoms that go into it, but the way those atoms are put together."
          </p>
          <p className="mt-2 text-sm text-muted-foreground">— Carl Sagan</p>
        </div>
      </div>
    </div>
  );
};

export default MainLanding;
