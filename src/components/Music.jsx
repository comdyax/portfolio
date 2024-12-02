import AudioVisualizer from "./AudioVisualizer";
import { useEffect, useState } from "react";

/**
 * Music is a React component that fetches music data from a JSON file
 * (`/content/music.json`) and selects a random song from the list of filenames.
 * It then renders the `AudioVisualizer` component to visualize the selected audio.
 *
 * The component fetches music data on mount, selects a random song from the list of filenames,
 * and passes the selected audio URL to the `AudioVisualizer` component for playback and visualization.
 *
 * @component
 *
 * @example
 * // Usage:
 * <Music />
 *
 * @requires fetch - Used to retrieve the music data from the server (`/content/music.json`).
 * @requires AudioVisualizer - The component used to visualize and play the selected audio.
 */
const Music = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/content/music.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((exc) => console.log(exc));
  }, []);

  function selectSong(filenames) {
    return filenames[Math.floor(Math.random() * filenames.length)];
  }
  return (
    <>
      {data ? (
        <AudioVisualizer audioUrl={selectSong(data.filenames)} />
      ) : (
        <h3>loading content...</h3>
      )}
    </>
  );
};

export default Music;
