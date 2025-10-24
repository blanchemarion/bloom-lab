import { Button } from "@/components/ui/button";

const Navbar = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-xl font-light tracking-tight">
          BLOOM LAB
        </div>
        
        <div className="flex items-center gap-8">
          <button
            onClick={() => scrollToSection("about")}
            className="text-sm font-light hover:text-accent transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("schedule")}
            className="text-sm font-light hover:text-accent transition-colors"
          >
            Schedule
          </button>
          <button
            onClick={() => scrollToSection("posts")}
            className="text-sm font-light hover:text-accent transition-colors"
          >
            Posts
          </button>
          <Button
            onClick={() => scrollToSection("join-us")}
            variant="default"
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Join Us
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
