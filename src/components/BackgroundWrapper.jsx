
import { useEffect, useRef } from 'react';
import p5 from 'p5';
import PropTypes from 'prop-types';

const BackgroundWrapper = ({ canvas }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const p5Background = new p5(canvas, canvasRef.current);
    return () => p5Background.remove(); // Cleanup on unmount
  }, [canvas]);

  return <div ref={canvasRef} className="p5-canvas" />;
};

export default BackgroundWrapper;

BackgroundWrapper.propTypes = {
  canvas: PropTypes.func.isRequired
}
