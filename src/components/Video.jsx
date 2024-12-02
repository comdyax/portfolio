import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useContext } from "react";
import { CookieConsentContext } from "../contexts/CookieContextProvider";
import { LanguageContext } from "../contexts/LanguageContextProvider";
import PropTypes from "prop-types";
import { LightContext } from "../contexts/LightContextProvider";

/**
 * The `IFrameCard` component renders an embedded YouTube video within an iframe.
 * It checks if the user has accepted cookies before displaying the video.
 * If cookies have not been accepted, it provides the user with an option to accept cookies or visit the video directly on YouTube.
 *
 * The component also displays a title for the video and a button that links directly to the YouTube video page.
 *
 * @component
 * @example
 * // Usage:
 * <IFrameCard videoId="abc123" title="Sample Video" />
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.videoId - The unique ID of the YouTube video to be embedded.
 * @param {string} props.title - The title of the YouTube video.
 *
 * @returns {JSX.Element} The JSX for rendering the YouTube video iframe, or a prompt to accept cookies.
 */
const IFrameCard = ({ videoId, title }) => {
  const { lightMode } = useContext(LightContext);
  const { consentGiven, handleAcceptCookies } =
    useContext(CookieConsentContext);
  const { language } = useContext(LanguageContext);

  return (
    <Card className="m-3 iframe">
      {consentGiven ? (
        <iframe
          className="youtube-iframe"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div style={{ minHeight: "200px", padding: "4%" }}>
          {language === "de" ? (
            <p style={{ padding: "4%" }}>
              Akzeptieren sie die Cookies, um Videos zu laden oder gehen Sie
              direkt zu Youtube durch klicken des Links.
            </p>
          ) : (
            <p style={{ padding: "4%" }}>
              To load the videos, you need to accept the cookies or go to
              youtube directly by clicking the link below.
            </p>
          )}
          <Button
            variant={lightMode ? "dark" : "light"}
            onClick={() => handleAcceptCookies(true)}
          >
            {language === "de" ? "cookies akzeptieren" : "accept cookies"}
          </Button>
        </div>
      )}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Button
          variant={lightMode ? "dark" : "light"}
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
        >
          <FontAwesomeIcon icon={faYoutube} />
          &ensp;YOUTUBE&ensp;
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </Button>
      </Card.Body>
    </Card>
  );
};

IFrameCard.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

/**
 * The `Video` component fetches a list of video data from a JSON file (`/content/video.json`)
 * and displays the videos in a grid layout. Each video is embedded inside an iframe.
 *
 * The component dynamically renders a header and a list of videos. It uses a child component (`IFrameCard`)
 * to display each video. Each video is represented by an ID and a title, which are passed as props to the child component.
 *
 * @component
 * @example
 * // Usage:
 * <Video />
 *
 * @returns {JSX.Element} The JSX for rendering the video list with embedded iframes.
 */
const Video = () => {
  const [videos, setVideos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/content/video.json")
      .then((res) => res.json())
      .then((text) => {
        setVideos(text);
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

  return (
    <div className="content">
      <h1>{videos.header}</h1>
      <Container className="d-flex flex-wrap justify-content-center my-5">
        {videos.data.map((con, key) => (
          <IFrameCard key={key} videoId={con.id} title={con.title} />
        ))}
      </Container>
    </div>
  );
};

export default Video;
