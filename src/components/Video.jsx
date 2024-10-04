import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { CookieConsentContext } from "../contexts/CookieContextProvider";

function IFrameCard({ videoId, title }) {
  const { consentGiven } = useContext(CookieConsentContext);
  return (
    <Card
      className="m-3"
      style={{
        maxWidth: "600px",
        width: "100%",
        backgroundColor: "rgb(15, 0, 0)",
        color: "rgb(240, 223, 199)",
      }}
    >
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
        <>Something here if no cookies set.</>
      )}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Button
          variant="primary"
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          style={{ color: "rgb(240, 223, 199)" }}
        >
          YOUTUBE &ensp;
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </Button>
      </Card.Body>
    </Card>
  );
}

const Video = () => {
  const [videos, setVideos] = useState(null);
  useEffect(() => {
    fetch("/content/video.json")
      .then((res) => res.json())
      .then((text) => setVideos(text))
      .catch((exc) => console.log(exc));
  }, []);

  return (
    <div className="content">
      {videos ? (
        <>
          <h1>{videos.header}</h1>
          <Container className="d-flex flex-wrap justify-content-center my-5">
            {videos.data.map((con, key) => (
              <IFrameCard key={key} videoId={con.id} title={con.title} />
            ))}
          </Container>
        </>
      ) : (
        <h3>loading content...</h3>
      )}
    </div>
  );
};

export default Video;
