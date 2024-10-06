import { Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContextProvider";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const EPK = () => {
  const { language } = useContext(LanguageContext);
  const fileName = language === "de" ? "epk_pom" : "epk_pom_english";
  return (
    <a
      href={`/${fileName}.pdf`}
      download={`${fileName}.pdf`}
      className="links"
      style={{ whiteSpace: "nowrap" }}
    >
      {language === "de" ? "EPK.pdf herunterladen" : "EPK.pdf download"}
      &ensp;
      <FontAwesomeIcon icon={faDownload} />
    </a>
  );
};

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
    <a
      className="links"
      href="#"
      onClick={openMailer}
      style={{ whiteSpace: "nowrap" }}
    >
      info[a]perplexitiesonmars.de&ensp;
      <FontAwesomeIcon icon={faEnvelope} />
    </a>
  );
};

const Footer = () => {
  const { language } = useContext(LanguageContext);
  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col md={3}>
            &copy; {new Date().getFullYear()} Perplexities on Mars{" "}
          </Col>
          <Col md={3}>
            <EmailDecoder />
          </Col>
          <Col md={3}>
            <EPK />
          </Col>
          <Col md={3}>
            <Link
              to="/imprint"
              className="links"
              style={{ whiteSpace: "nowrap" }}
            >
              {language === "de" ? "Impressum" : "Imprint"}
            </Link>
            &emsp;
            <Link
              to="/privacy-policy"
              className="links"
              style={{ whiteSpace: "nowrap" }}
            >
              {language === "de" ? "Datenschutzerklärung" : "Privacy Policy"}
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
