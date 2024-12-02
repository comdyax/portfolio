import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * A component that automatically scrolls the page to the top whenever the route changes.
 * This component listens to changes in the current `pathname` (URL) and uses the `useEffect`
 * hook to scroll the window to the top (position `0,0`) each time the route changes.
 *
 * @component
 * @example
 * // Usage:
 * <TopScroller />
 *
 * @returns {null} This component does not render any UI; it only handles the scroll behavior.
 */
const TopScroller = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

export default TopScroller;
