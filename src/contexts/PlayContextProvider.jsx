import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const PlayContext = createContext();

export const PlayProvider = ({ children }) => {
  const [play, setPlay] = useState(false);
  const [display, setDisplay] = useState(true);
  const fadeDuration = 4;

  useEffect(() => {
    if (play) {
      const timer = setTimeout(() => {
        setDisplay(false);
      }, fadeDuration * 1000);
      return () => {
        clearTimeout(timer);
      };
    } else setDisplay(true)
  }, [play]);

  const handleSetPlay = (value) => {
    setPlay(value);
  };

  return (
    <PlayContext.Provider
      value={{ display, fadeDuration, play, handleSetPlay }}
    >
      {children}
    </PlayContext.Provider>
  );
};

PlayProvider.propTypes = {
  children: PropTypes.node.isRequired
}
