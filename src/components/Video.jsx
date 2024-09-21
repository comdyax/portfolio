const YouTubeIFrame = ({ videoId, title }) => {
  return (
    <iframe
      className="youtube-iframe"
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
};

const Video = () => {
  const id = "WgQbPnjNPIs?list=PL2MjpBOEjTlO1eLOLRtw3z_IzUyR449qk";
  const title = "Perplexities On Mars live at Unterfahrt"
  return (
    <div className="content">
      <YouTubeIFrame videoId={id} title={title} />
    </div>
  );
};

export default Video;
