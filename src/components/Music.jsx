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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL;
    fetch(`${baseUrl}/content/music.json`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((exc) => {
        console.log(exc);
        setError("Failed to load content");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="text-content">
        <h3>loading content...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-content">
        <h3>{error}</h3>
      </div>
    );
  }

  function selectSong(filenames) {
    return filenames[Math.floor(Math.random() * filenames.length)];
  }
  return <AudioVisualizer audioUrl={selectSong(data.filenames)} />;
};

export default Music;
