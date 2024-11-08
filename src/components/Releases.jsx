import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faRecordVinyl,
} from "@fortawesome/free-solid-svg-icons";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import PropTypes from "prop-types";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const conf = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("de-DE", conf).format(date);
};

const ReleaseCard = ({
  imgPath,
  imgAltText,
  name,
  releaseDate,
  labelUrl,
  labelName,
  streamingUrl,
  streamingName,
}) => {
  return (
    <Card className="m-3 release">
      <Card.Img variant="top" src={`/images/${imgPath}`} alt={imgAltText} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>RELEASE: {formatDate(releaseDate)}</Card.Text>
        <Stack gap={3} className="col-md-8 mx-auto">
          <Button variant="light" href={labelUrl} target="_blank">
            <FontAwesomeIcon icon={faRecordVinyl} />
            &ensp;{labelName}&ensp;
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </Button>
          <Button variant="light" href={streamingUrl} target="_blank">
            <FontAwesomeIcon icon={faSpotify} />
            &ensp;{streamingName}&ensp;
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};

ReleaseCard.propTypes = {
  streamingUrl: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  streamingName: PropTypes.string.isRequired,
  labelUrl: PropTypes.string.isRequired,
  imgPath: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  imgAltText: PropTypes.string.isRequired,
};

const Releases = () => {
  const [releases, setReleases] = useState(null);
  useEffect(() => {
    fetch("/content/releases.json")
      .then((res) => res.json())
      .then((data) => setReleases(data))
      .catch((exc) => console.log(exc));
  }, []);

  return (
    <div className="content">
      {releases ? (
        <>
          <h1>{releases.header}</h1>
          <Container className="d-flex flex-wrap justify-content-center my-5">
            {releases.data
              .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
              .map((con, key) => (
                <ReleaseCard
                  key={key}
                  imgPath={con.imgPath}
                  imgAltText={con.imgAltText}
                  name={con.name}
                  releaseDate={con.releaseDate}
                  labelUrl={con.labelUrl}
                  labelName={con.labelName}
                  streamingUrl={con.streamingUrl}
                  streamingName={con.streamingName}
                />
              ))}
          </Container>
        </>
      ) : (
        <h3>loading content...</h3>
      )}
    </div>
  );
};

export default Releases;
