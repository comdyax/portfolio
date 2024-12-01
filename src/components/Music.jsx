import AudioVisualizer from "./AudioVisualizer";
import { useEffect, useState } from "react";

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
