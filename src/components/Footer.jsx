import { Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContextProvider";
import { PlayContext } from "../contexts/PlayContextProvider";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const EPK = ({ play }) => {
  const { language } = useContext(LanguageContext);
  const fileName = language === "de" ? "epk_pom" : "epk_pom_english";
  return (
    <a
      href={play ? null : `/${fileName}.pdf`}
      download={play ? null : `${fileName}.pdf`}
      className="links footer_components"
    >
      {language === "de" ? "EPK.pdf herunterladen" : "EPK.pdf download"}
      &ensp;
      <FontAwesomeIcon icon={faDownload} />
    </a>
  );
};

const EmailDecoder = ({ play }) => {
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
      className="links footer_components"
      href={play ? null : "#"}
      onClick={play ? null : openMailer}
    >
      info[a]perplexitiesonmars.de&ensp;
      <FontAwesomeIcon icon={faEnvelope} />
    </a>
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
  const { display, fadeDuration, play } = useContext(PlayContext);
  const { language } = useContext(LanguageContext);

  return (
    <>
      {display && (
        <div
          className="footer"
          style={{
            opacity: play ? 0 : 1,
            transition: `opacity ${fadeDuration}s ease`,
          }}
        >
          <Container fluid>
            <Row className="justify-content-center">
              <Col md="auto">
                <Copyright />
              </Col>
              <Col md="auto">
                <EmailDecoder play={play} />
              </Col>
              <Col md="auto">
                <EPK play={play} />
              </Col>
              <Col md="auto">
                <Link
                  to={play ? null : "/privacy-policy"}
                  className="links footer_components"
                >
                  {language === "de"
                    ? "Datenschutzerklärung"
                    : "Privacy Policy"}
                </Link>
              </Col>
              <Col md="auto">
                <Link
                  to={play ? null : "/imprint"}
                  className="links footer_components"
                >
                  {language === "de" ? "Impressum" : "Imprint"}
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default Footer;
