import { Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContextProvider";
import { Link } from "react-router-dom";

const Footer = () => {
  const { language } = useContext(LanguageContext);
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={6}>
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Perplexities on Mars{" "}
            </p>
          </Col>
          <Col md={6} className="text-md-right">
            <Link to="/imprint" className="links">
              {language === "de" ? "Impressum" : "Imprint"}
            </Link>
            &emsp;
            <Link to="/privacy-policy" className="links">
              {language === "de" ? "Datenschutzerklärung" : "Privacy Policy"}
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
