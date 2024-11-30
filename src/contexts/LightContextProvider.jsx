import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";

export const LightContext = createContext();

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
