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
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContextProvider";
import { LightContext } from "../contexts/LightContextProvider";

/**
 * Formats a date string into a human-readable format (DD.MM.YYYY) using German locale.
 * The function converts a given date string into a `Date` object and formats it
 * according to the German date format (e.g., "01.12.2023").
 *
 * @function
 *
 * @param {string} dateString - The date string to be formatted. The input should be in a valid date format (e.g., "2023-12-01").
 *
 * @returns {string} A string representing the formatted date in the "DD.MM.YYYY" format (e.g., "01.12.2023").
 *
 * @example
 * const formattedDate = formatDate("2023-12-01");
 * console.log(formattedDate); // Output: "01.12.2023"
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const conf = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("de-DE", conf).format(date);
};

/**
 * ReleaseCard is a React component that displays information about a single music release.
 * It shows the release's cover image, title, release date, label name with a link,
 * and streaming platform with a link to external sites.
 *
 * The component renders a card with the release's information and provides buttons for external links:
 * - A link to the label's website
 * - A link to a streaming platform (like Spotify)
 *
 * The component also supports light and dark modes, adjusting the button styles accordingly.
 *
 * @component
 *
 * @example
 * // Usage:
 * <ReleaseCard
 *   imgPath="release-image.jpg"
 *   imgAltText="Album cover"
 *   name="Album Name"
 *   releaseDate="2023-12-01"
 *   labelUrl="https://label.com"
 *   labelName="Label Name"
 *   streamingUrl="https://spotify.com"
 *   streamingName="Spotify"
 * />
 *
 * @param {string} imgPath - The path to the image for the release cover.
 * @param {string} imgAltText - The alt text for the release cover image.
 * @param {string} name - The name of the music release (e.g., album or single).
 * @param {string} releaseDate - The release date of the music (in YYYY-MM-DD format).
 * @param {string} labelUrl - The URL of the label's website.
 * @param {string} labelName - The name of the label.
 * @param {string} streamingUrl - The URL to the streaming platform.
 * @param {string} streamingName - The name of the streaming platform (e.g., Spotify).
 *
 * @returns {JSX.Element} A Bootstrap card containing the release's details and action buttons.
 */
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
  const { lightMode } = useContext(LightContext);
  return (
    <Card className="m-3 release">
      <Card.Img variant="top" src={`/images/${imgPath}`} alt={imgAltText} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>RELEASE: {formatDate(releaseDate)}</Card.Text>
        <Stack gap={3} className="col-md-8 mx-auto">
          <Button
            variant={lightMode ? "dark" : "light"}
            href={labelUrl}
            target="_blank"
          >
            <FontAwesomeIcon icon={faRecordVinyl} />
            &ensp;{labelName}&ensp;
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </Button>
          <Button
            variant={lightMode ? "dark" : "light"}
            href={streamingUrl}
            target="_blank"
          >
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

/**
 * Releases is a React component that displays a list of releases fetched from a JSON file.
 * It shows the releases' information in cards, sorted by release date.
 *
 * The component retrieves release data from a JSON file (`/content/releases.json`)
 * and displays the releases in a grid layout. The data is sorted by the most recent release date.
 * The component supports multi-language rendering based on the selected language (English or German).
 *
 * @component
 *
 * @example
 * // Usage:
 * <Releases />
 *
 * @returns {JSX.Element} The JSX that displays the releases' list, sorted by date,
 *                        in either German or English depending on the selected language.
 */
const Releases = () => {
  const { language } = useContext(LanguageContext);
  const [releases, setReleases] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL;
    fetch(`${baseUrl}/content/releases.json`)
      .then((res) => res.json())
      .then((data) => {
        setReleases(data);
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
      <h1>{language === "de" ? "VERÖFFENTLICHUNGEN" : "RELEASES"}</h1>
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
    </div>
  );
};

export default Releases;
