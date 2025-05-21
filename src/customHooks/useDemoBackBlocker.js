// src/hooks/useDemoBackBlocker.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * On any path under /demoHomePage, push a blank history state.
 * That way Back from /demoHomePage or /demoHomePage/:invoiceId
 * will always first hit the dummy "" entry.
 */
export default function useDemoBackBlocker() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/demoHomePage")) {
      // Insert a dummy “” entry immediately before the real one
      window.history.pushState(null, "", "");
    }
  }, [pathname]);
}
