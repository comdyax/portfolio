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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const conf = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("de-DE", conf).format(date);
};

const ReleaseCard = ({ props }) => {
  return (
    <Card
      className="m-3"
      style={{
        maxWidth: "500px",
        width: "100%",
        backgroundColor: "rgb(15, 0, 0)",
        color: "rgb(240, 223, 199)",
      }}
    >
      <Card.Img
        variant="top"
        src={`/images/${props.imgPath}`}
        alt={props.imgAltText}
      />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>RELEASE: {formatDate(props.releaseDate)}</Card.Text>
        <Stack gap={3} className="col-md-6 mx-auto">
          <Button
            variant="primary"
            href={props.labelUrl}
            target="_blank"
            style={{ color: "rgb(240, 223, 199)" }}
          >
            <FontAwesomeIcon icon={faRecordVinyl} />
            &ensp;
            {props.labelName}
            &ensp;
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </Button>
          <Button
            variant="primary"
            href={props.streamingUrl}
            target="_blank"
            style={{ color: "rgb(240, 223, 199)" }}
          >
            <FontAwesomeIcon icon={faSpotify} />
            &ensp;
            {props.streamingName}
            &ensp;
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
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
            {releases.data.map((con, key) => (
              <ReleaseCard key={key} props={con} />
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
