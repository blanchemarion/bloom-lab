import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  const isInitialRender = useRef(true);

  useLayoutEffect(() => {
    const isFirstRoute = isInitialRender.current;
    isInitialRender.current = false;

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    if (isFirstRoute && hash) {
      window.history.replaceState(window.history.state, "", `${pathname}${search}`);
      window.scrollTo({ top: 0, behavior: "auto" });

      const restoreFrame = requestAnimationFrame(() => {
        root.style.scrollBehavior = previousScrollBehavior;
      });

      return () => {
        cancelAnimationFrame(restoreFrame);
        root.style.scrollBehavior = previousScrollBehavior;
      };
    }

    let restoreFrame = 0;
    const jumpFrame = requestAnimationFrame(() => {
      const activeHash = window.location.hash;

      if (activeHash) {
        const target = document.getElementById(decodeURIComponent(activeHash.slice(1)));
        target?.scrollIntoView({ behavior: "auto", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }

      restoreFrame = requestAnimationFrame(() => {
        root.style.scrollBehavior = previousScrollBehavior;
      });
    });

    return () => {
      cancelAnimationFrame(jumpFrame);
      cancelAnimationFrame(restoreFrame);
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, [pathname, search, hash]);

  return null;
}
