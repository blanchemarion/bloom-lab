import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "schedule", label: "Schedule" },
    { id: "posts", label: "Posts" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border"
    >
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo_bloom.png"
            alt="Bloom Lab Logo"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
              className="relative text-sm font-light text-foreground transition-colors duration-200"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {item.label}
              {hoveredItem === item.id && (
                <motion.div
                  layoutId="navbar-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
            </motion.button>
          ))}

          {/* CTA Button */}
          <Button
            onClick={() => scrollToSection("join-us")}
            variant="default"
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            Join Us
          </Button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
