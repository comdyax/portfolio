import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";

export const LightContext = createContext();

/**
 * The `LightProvider` component provides the current light/dark mode setting for the application and allows other
 * components to access and modify the mode. It detects the system's preferred color scheme (light or dark) on initial
 * load and stores the value. The mode can be toggled manually by using the provided function.
 *
 * This component uses the `LightContext` to make the current light mode state and a function to toggle the mode available
 * to child components.
 *
 * @component
 * @example
 * // Usage:
 * <LightProvider>
 *   <SomeComponent />
 * </LightProvider>
 *
 * @returns {JSX.Element} The `LightContext.Provider` wrapping the children components.
 */
export const LightProvider = ({ children }) => {
  const [lightMode, setLightMode] = useState(false);

  const detectMode = () => {
    const systemPreference = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;
    setLightMode(systemPreference);
  };
  useEffect(() => {
    detectMode();
  }, []);

  const handleSetLightMode = () => {
    setLightMode(!lightMode);
  };

  return (
    <LightContext.Provider value={{ lightMode, handleSetLightMode }}>
      {children}
    </LightContext.Provider>
  );
};

LightProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
