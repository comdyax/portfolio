import { Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContextProvider";
import { Link } from "react-router-dom";

const EmailDecoder = () => {
  const { language } = useContext(LanguageContext);
  const decode = (encoded) => {
    return encoded.replace(/[a-zA-Z]/g, function (c) {
      return String.fromCharCode(
        (c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
      );
    });
  };

  const openMailer = (event) => {
    event.preventDefault();
    const email = decode("znvygb:vasb@crecyrkvgvrfbaznef.qr");
    window.location.href = `mailto:${email}`;
    event.currentTarget.textContent =
      language === "de" ? "E-Mail-Software öffnet sich" : "Mail-Software opens";
  };

  return (
    <a className="links" href="#" onClick={openMailer}>
      {language === "de" ? "E-Mail: bitte klicken" : "Mail: please click"}
    </a>
  );
};

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
            &emsp;
            <EmailDecoder />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
