import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContextProvider";
import { LightContext } from "../contexts/LightContextProvider";

/**
 * Home is a React component that renders the homepage of the website.
 * It fetches dynamic content from a JSON file and displays it in either English or German
 * based on the current language setting. The page also includes an image and a button
 * that links to the "releases" page.
 *
 * @component
 *
 * @example
 * // Usage:
 * <Home />
 *
 * @requires LanguageContext - Context providing the current language setting.
 * @requires LightContext - Context providing the current light/dark mode setting.
 * @requires fetch - Used to retrieve the dynamic content from the server (`/content/home.json`).
 * @requires config - Provides configuration data such as paths to images and text content.
 * @requires React Router's `Link` - Used for navigation to the "releases" page.
 * @requires Button - A Bootstrap button component used for linking to the releases page.
 */
const Home = () => {
  const { language } = useContext(LanguageContext);
  const { lightMode } = useContext(LightContext);
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    fetch(`${baseUrl}/content/home.json`)
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        setIsLoading(false);
      })
      .catch((exc) => {
        console.log(exc);
        setError("Failed to load content");
        setIsLoading(false);
      });
  }, [baseUrl]);

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
    <Container className="d-flex justify-content-center home">
      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Image
            src={`${baseUrl}/${content.imagePath}`}
            style={{
              height: "60vh",
              width: "100%",
              objectFit: "contain",
            }}
          />
        </Col>
        <Col
          style={{
            margin: "auto",
          }}
          xs={12}
          sm={6}
          md={6}
          lg={6}
        >
          <h1>{content.header}</h1>
          <br />
          <h3>
            {language == "de"
              ? content.text_german.map((con, idx) => <p key={idx}>{con}</p>)
              : content.text_english.map((con, idx) => <p key={idx}>{con}</p>)}
          </h3>
          <br />

          <Link to="/releases">
            <Button
              variant={lightMode ? "dark" : "light"}
              size="lg"
              style={{ padding: "2%" }}
            >
              {language === "de" ? "Mehr Informationen" : "More Information"}
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
