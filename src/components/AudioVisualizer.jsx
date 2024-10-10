import { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { audioVisualizer } from "../p5_drawings/audioVisualizer";
import Button from "react-bootstrap/Button";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PlayContext } from "../contexts/PlayContextProvider";

//const audioUrl = "/platte.wav";
const audioUrl = "/aeguin.wav";

const PlayButton = ({ handlePlay }) => {
  return (
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
      }}
    >
      &ensp;
      <FontAwesomeIcon icon={faPlay} />
      &ensp;
    </Button>
  );
};

const PauseButton = ({ handlePlay, fadeDuration }) => {
  const [delButton, setDelButton] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
    const timer = setTimeout(() => {
      setDelButton(true);
      setFade(false);
    }, fadeDuration * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [fadeDuration]);

  return (
    <>
      {!delButton && (
        <Button
          onClick={handlePlay}
          variant="outline-light large"
          size="lg"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "3",
            transition: `opacity ${fadeDuration}s ease`,
            opacity: fade ? 0 : 1,
          }}
        >
          &ensp;
          <FontAwesomeIcon icon={faPause} />
          &ensp;
        </Button>
      )}
    </>
  );
};

const AudioVisualizer = () => {
  const { display, fadeDuration, play, handleSetPlay } = useContext(PlayContext);
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

    const visualizer = new p5(
      (p) => audioVisualizer(p, analyserRef.current),
      visualizerRef.current
    );
    return () => {
      visualizer.remove();
      audioElementRef.current.pause();
      audioElementRef.current.src = "";
      source.disconnect();
      analyserRef.current.disconnect();
      audioContextRef.current.close();
    };
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
      {!play ? (
        <PlayButton handlePlay={handlePlay} />
      ) : (
        <PauseButton handlePlay={handlePlay} fadeDuration={fadeDuration} />
      )}
      <div onClick={!display && play ? handlePlay : null} style={{ zIndex: "2" }}>
        <div ref={visualizerRef} className="p5-canvas" />
      </div>
    </>
  );
};

export default AudioVisualizer;
