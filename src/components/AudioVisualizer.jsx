import { useEffect, useRef } from "react";
import p5 from "p5";
import { audioVisualizer } from "../p5_drawings/audioVisualizer";
import { audioVisualizer_v3 } from "../p5_drawings/audioVisualizer_v3";

import Button from "react-bootstrap/Button";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PlayContext } from "../contexts/PlayContextProvider";
import PropTypes from "prop-types";
import { LightContext } from "../contexts/LightContextProvider";

/**
 * PlayPauseButton is a React component that renders a button
 * to toggle the playback state of audio or video content. The button
 * displays a play or pause icon depending on the current state.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.handlePlay - Callback function to handle play/pause toggle.
 *
 * @example
 * // Usage:
 * <PlayPauseButton handlePlay={() => console.log('Play/Pause toggled')} />
 *
 * @requires LightContext - Context that provides the current light mode state.
 * @requires PlayContext - Context that provides playback state and display configurations.
 * @requires FontAwesomeIcon - Icon component for rendering play/pause icons.
 */
const PlayPauseButton = ({ handlePlay }) => {
  const { lightMode } = useContext(LightContext);
  const { display, fadeDuration, play } = useContext(PlayContext);
  return (
    <>
      {display && (
        <Button
          variant={lightMode ? "outline-dark large" : "outline-light large"}
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
  handlePlay: PropTypes.func.isRequired,
};

/**
 * AudioVisualizer is a React component that visualizes audio playback
 * using the p5.js library. It provides an interactive play/pause button
 * and a visual representation of the audio's frequency data.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.audioUrl - The URL of the audio file to be played and visualized.
 *
 * @example
 * // Usage:
 * <AudioVisualizer audioUrl="https://example.com/audio.mp3" />
 *
 * @requires PlayContext - Context that provides playback state and handlers.
 * @requires PlayPauseButton - Button component to toggle audio playback.
 */
const AudioVisualizer = ({ audioUrl }) => {
  const { display, play, handleSetPlay } = useContext(PlayContext);
  const visualizerRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const audioElementRef = useRef(null);

  function selectVisualizer() {
    switch (Math.floor(Math.random() * 2)) {
      case 0:
        return new p5(
          (p) => audioVisualizer(p, analyserRef.current),
          visualizerRef.current
        );
      default:
        return new p5(
          (p) => audioVisualizer_v3(p, analyserRef.current),
          visualizerRef.current
        );
    }
  }

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
      console.log("Audio has ended. Playback position reset to 0.");
      handleSetPlay(false);
    };

    audioElementRef.current.addEventListener("ended", handleAudioEnded);

    const visualizer = selectVisualizer();

    return () => {
      visualizer.remove();
      audioElementRef.current.pause();
      audioElementRef.current.src = "";
      audioElementRef.current.removeEventListener("ended", handleAudioEnded);
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
AudioVisualizer.propTypes = {
  audioUrl: PropTypes.string.isRequired,
};

export default AudioVisualizer;
