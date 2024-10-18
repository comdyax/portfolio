import { useEffect, useRef } from "react";
import p5 from "p5";
// import { audioVisualizer } from "../p5_drawings/audioVisualizer";
// import { audioVisualizer_v2 } from "../p5_drawings/audioVisualizer_v2";
// import { audioVisualizer_v3 } from "../p5_drawings/audioVisualizer_v3";
// import { audioVisualizer_v5 } from "../p5_drawings/audioVisualizer_v5";
import { audioVisualizer_v4 } from "../p5_drawings/audioVisualizer_v4";

import Button from "react-bootstrap/Button";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PlayContext } from "../contexts/PlayContextProvider";
import PropTypes from "prop-types";

// const audioUrl = "/platte.wav";
const audioUrl = "/aeguin.wav";

const PlayPauseButton = ({ handlePlay }) => {
  const { display, fadeDuration, play } = useContext(PlayContext);
  return (
    <>
      {display && (
        <Button
          variant="outline-light large"
          size="lg"
          onClick={handlePlay}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "3",
            transition: `opacity ${fadeDuration}s ease`,
            opacity: play ? 0 : 1,
          }}
        >
          &ensp;
          {!play ? (
            <FontAwesomeIcon icon={faPlay} />
          ) : (
            <FontAwesomeIcon icon={faPause} />
          )}
          &ensp;
        </Button>
      )}
    </>
  );
};

PlayPauseButton.propTypes = {
  handlePlay: PropTypes.func.isRequired
}

const AudioVisualizer = () => {
  const { display, play, handleSetPlay } =
    useContext(PlayContext);
  const visualizerRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const audioElementRef = useRef(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();

    analyserRef.current = audioContextRef.current.createAnalyser();

    audioElementRef.current = new Audio(audioUrl);

    const source = audioContextRef.current.createMediaElementSource(
      audioElementRef.current
    );

    source.connect(analyserRef.current);
    analyserRef.current.connect(audioContextRef.current.destination);

    const handleAudioEnded = () => {
      audioElementRef.current.currentTime = 0; 
      console.log('Audio has ended. Playback position reset to 0.');
      handleSetPlay(false);
    };

    audioElementRef.current.addEventListener('ended', handleAudioEnded);

    const visualizer = new p5(
      (p) => audioVisualizer_v4(p, analyserRef.current),
      visualizerRef.current
    );
    return () => {
      visualizer.remove();
      audioElementRef.current.pause();
      audioElementRef.current.src = "";
      audioElementRef.current.removeEventListener('ended', handleAudioEnded);
      source.disconnect();
      analyserRef.current.disconnect();
      audioContextRef.current.close();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  const handlePlay = () => {
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
    if (audioElementRef.current.paused) {
      audioElementRef.current
        .play()
        .then(() => {
          handleSetPlay(true);
        })
        .catch((error) => {
          console.error("An error occured:", error);
        });
    } else {
      audioElementRef.current.pause();
      handleSetPlay(false);
    }
  };

  return (
    <>
      <PlayPauseButton handlePlay={handlePlay} />
      <div
        onClick={!display && play ? handlePlay : null}
        style={{ zIndex: "2" }}
      >
        <div ref={visualizerRef} className="p5-canvas" />
      </div>
    </>
  );
};

export default AudioVisualizer;


