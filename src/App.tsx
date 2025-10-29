import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Index from "./pages/Index";
import BiologicalRelativity from "./pages/BiologicalRelativity";
import MainLanding from "./pages/MainLanding";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

import ScrollToTop from "@/components/ScrollTop";

const queryClient = new QueryClient();

/**
 * This component handles two things:
 * 1. Defines your routes (same as before)
 * 2. On first load, checks if GitHub Pages bounced us here with ?redirect=/some/path
 *    and if so, navigates there client-side so BrowserRouter can render the right page.
 * 3. Forces window scroll to top on every route change.
 */
function RouterWithRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get("redirect");

    if (redirectPath) {
      // navigate to the intended route and clean up the URL (no ?redirect=...)
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/projects/biological-relativity"
          element={<BiologicalRelativity />}
        />
        <Route path="/main" element={<MainLanding />} />
        <Route path="/projects/coming-soon" element={<ComingSoon />} />
        {/* all custom routes above the catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouterWithRedirect />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
