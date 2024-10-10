import { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { audioVisualizer } from "../p5_drawings/audioVisualizer";
import Button from "react-bootstrap/Button";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const PauseButton = ({ handlePlay }) => {
  const [delButton, setDelButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
  const [playing, setPlaying] = useState(false);
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
    if (audioElementRef.current.paused) {
      audioElementRef.current.play();
      setPlaying(true);
    } else {
      audioElementRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      {!playing ? (
        <PlayButton handlePlay={handlePlay} />
      ) : (
        <PauseButton handlePlay={handlePlay} />
      )}
      <div onClick={playing ? handlePlay : null} style={{ zIndex: "2" }}>
        <div ref={visualizerRef} className="p5-canvas" />
      </div>
    </>
  );
};

export default AudioVisualizer;
