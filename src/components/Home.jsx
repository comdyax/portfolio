import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContextProvider";

const Home = () => {
  const { language } = useContext(LanguageContext);
  const [content, setContent] = useState(null);
  useEffect(() => {
    fetch("/content/home.json")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((exc) => console.log(exc));
  }, []);
  return (
    <Container
      className="d-flex justify-content-center"
      style={{ margin: "auto", paddingTop: "5%", paddingBottom: "5%" }}
    >
      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Image
            src="/images/forever_home.png"
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
          {content ? (
            <>
              <h1>{content.header}</h1>
              <br />
              <h3>
                {language == "de"
                  ? content.text_german.map((con, idx) => (
                      <p key={idx}>{con}</p>
                    ))
                  : content.text_english.map((con, idx) => (
                      <p key={idx}>{con}</p>
                    ))}
              </h3>
              <br />

              <Link to="/releases">
                <Button variant="light" size="lg" style={{ padding: "2%" }}>
                  More Information
                </Button>
              </Link>
            </>
          ) : (
            <h3>loading content...</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
