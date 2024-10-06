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
      className="links footer_components"
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
    <a className="links footer_components" href="#" onClick={openMailer}>
      info[a]perplexitiesonmars.de&ensp;
      <FontAwesomeIcon icon={faEnvelope} />
    </a>
  );
};

const ImprintPolicyWrapper = () => {
  const { language } = useContext(LanguageContext);
  return (
    <>
      <Link to="/imprint" className="links footer_components">
        {language === "de" ? "Impressum" : "Imprint"}
      </Link>
      <Link to="/privacy-policy" className="links footer_components">
        {language === "de" ? "Datenschutzerklärung" : "Privacy Policy"}
      </Link>
    </>
  );
};

const Copyright = () => {
  return (
    <div className="footer_components">
      &copy; {new Date().getFullYear()} Perplexities on Mars
    </div>
  );
};

const Footer = () => {
  const { language } = useContext(LanguageContext);
  return (
    <div className="footer">
      <Container fluid>
        <Row className="justify-content-center">
          <Col md="auto">
            <Copyright />
          </Col>
          <Col md="auto">
            <EmailDecoder />
          </Col>
          <Col md="auto">
            <EPK />
          </Col>
          <Col md="auto">
            <Link to="/privacy-policy" className="links footer_components">
              {language === "de" ? "Datenschutzerklärung" : "Privacy Policy"}
            </Link>
          </Col>
          <Col md="auto">
            <Link to="/imprint" className="links footer_components">
              {language === "de" ? "Impressum" : "Imprint"}
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
