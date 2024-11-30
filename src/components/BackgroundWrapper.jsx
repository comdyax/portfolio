import { useContext, useEffect, useRef } from "react";
import p5 from "p5";
import PropTypes from "prop-types";
import { LightContext } from "../contexts/LightContextProvider";
import config from "../assets/config.json";

const BackgroundWrapper = ({ canvas }) => {
  const { lightMode } = useContext(LightContext);
  const canvasRef = useRef(null);

  function hexToRgb(hex) {
    hex = hex.replace(/^#/, "");
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("");
    }
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [r, g, b];
  }

  useEffect(() => {
    var backgroundColor = (0, 0, 0);
    var color = (255, 255, 255);
    if ("light" in config.style && "dark" in config.style) {
      if (lightMode) {
        backgroundColor = hexToRgb(config.style.light.backgroundColor);
        color = hexToRgb(config.style.light.textColor);
        console.log(color);
      } else {
        backgroundColor = hexToRgb(config.style.dark.backgroundColor);
        color = hexToRgb(config.style.dark.textColor);
      }
    }

    const p5Background = new p5(
      (p) => canvas(p, backgroundColor, color),
      canvasRef.current
    );
    return () => p5Background.remove(); // Cleanup on unmount
  }, [canvas, lightMode]);

  return <div ref={canvasRef} className="p5-canvas" />;
};

export default BackgroundWrapper;

BackgroundWrapper.propTypes = {
  canvas: PropTypes.func.isRequired,
};
