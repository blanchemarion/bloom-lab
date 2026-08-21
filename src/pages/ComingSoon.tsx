import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Back */}
      <header className="sticky top-0 z-50 w-full border-b border-bloom-sky/25 bg-white/75 backdrop-blur-xl">
        <nav className="container mx-auto px-6 h-16 flex items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-bloom-deep hover:text-bloom-violet transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </nav>
      </header>

      {/* Content */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-hero bg-gradient-to-r from-bloom-deep to-bloom-violet bg-clip-text text-transparent">
              Coming Soon
            </h1>
            <p className="text-body-large text-bloom-text-secondary">
              This project is still in the works. Check back soon for updates.
            </p>
          </div>

          <div className="pt-8">
            <Link
              to="/"
              className="inline-block px-6 py-3 rounded-full text-sm font-medium bg-bloom-deep text-white hover:bg-bloom-sky hover:text-bloom-dark transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Return Home
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center text-sm border-t border-bloom-sky/30 text-muted-foreground">
        <p>© Bloom Lab</p>
      </footer>
    </div>
  );
};

export default ComingSoon;
