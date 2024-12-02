import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const PlayContext = createContext();

/**
 * The `PlayProvider` component manages the play state (whether something is playing or not) and controls the display
 * visibility based on the `play` state. It also provides the `fadeDuration` for controlling the fade time when toggling
 * the play state.
 *
 * When the `play` state is set to `true`, a fade-out effect is triggered, and after a defined duration (`fadeDuration`),
 * the display state is set to `false`. If `play` is `false`, the display state is reset to `true`.
 *
 * This component uses the `PlayContext` to make the `play`, `display`, and `fadeDuration` values, as well as the function
 * to update the `play` state, available to child components.
 *
 * @component
 * @example
 * // Usage:
 * <PlayProvider>
 *   <SomeComponent />
 * </PlayProvider>
 *
 * @returns {JSX.Element} The `PlayContext.Provider` wrapping the children components.
 */
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
    } else setDisplay(true);
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
  children: PropTypes.node.isRequired,
};
