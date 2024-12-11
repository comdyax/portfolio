import { Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContextProvider";
import { PlayContext } from "../contexts/PlayContextProvider";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import config from "../assets/config.json";
import PropTypes from "prop-types";

/**
 * EPK (Electronic Press Kit) is a React component that renders a download link
 * for an EPK PDF file. The displayed text and the file's language adapt based
 * on the current language context, and the link is disabled if playback is active.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.play - Indicates whether playback is active. If true, the download link is disabled.
 *
 * @example
 * // Usage:
 * <EPK play={false} />
 *
 * @requires LanguageContext - Context providing the current language setting.
 * @requires FontAwesomeIcon - Icon component for rendering the download icon.
 * @requires config.footer - Configuration object containing file names for the EPK in different languages.
 */
const EPK = ({ play }) => {
  const footerContent = config.footer;
  const { language } = useContext(LanguageContext);
  const baseUrl = import.meta.env.BASE_URL;
  const fileName =
    language === "de"
      ? footerContent.epkFilenameGerman
      : footerContent.epkFilenameEnglish;
  return (
    <a
      href={play ? null : `${baseUrl}/${fileName}.pdf`}
      download={play ? null : `${baseUrl}/${fileName}.pdf`}
      className="links footer_components"
    >
      {language === "de" ? "EPK.pdf herunterladen" : "EPK.pdf download"}
      &ensp;
      <FontAwesomeIcon icon={faDownload} />
    </a>
  );
};

EPK.propTypes = {
  play: PropTypes.bool.isRequired,
};

/**
 * EmailDecoder is a React component that displays an email link, which, when clicked,
 * decodes an encrypted email address and opens the user's default mail client.
 * The component disables functionality if playback is active.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.play - Indicates whether playback is active. If true, the email link is disabled.
 *
 * @example
 * // Usage:
 * <EmailDecoder play={false} />
 *
 * @requires LanguageContext - Context providing the current language setting.
 * @requires FontAwesomeIcon - Icon component for rendering the email icon.
 * @requires config.footer - Configuration object containing the encrypted and plain text email address.
 */
const EmailDecoder = ({ play }) => {
  const footerContent = config.footer;
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
    const email = decode(footerContent.mailEncrypted);
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
      {footerContent.mailPlain}&ensp;
      <FontAwesomeIcon icon={faEnvelope} />
    </a>
  );
};

EmailDecoder.propTypes = {
  play: PropTypes.bool.isRequired,
};

/**
 * Copyright is a React component that displays a copyright notice
 * including the current year and the configured name of the entity.
 *
 * @component
 *
 * @example
 * // Usage:
 * <Copyright />
 *
 * @requires config.name - Configuration object containing the name of the entity for the copyright notice.
 */
const Copyright = () => {
  return (
    <div className="footer_components">
      &copy; {new Date().getFullYear()} {config.name}
    </div>
  );
};

/**
 * Footer is a React component that displays the footer section of the page.
 * It includes copyright information, an email link, a downloadable EPK,
 * and links to the privacy policy and imprint pages. The footer's visibility
 * and opacity are dynamically controlled based on playback state.
 *
 * @component
 *
 * @example
 * // Usage:
 * <Footer />
 *
 * @requires PlayContext - Context providing playback state (`display`, `fadeDuration`, and `play`).
 * @requires LanguageContext - Context providing the current language setting.
 * @requires Copyright - Component for displaying the copyright notice.
 * @requires EmailDecoder - Component for rendering a mailto link with an encoded email address.
 * @requires EPK - Component for downloading the Electronic Press Kit.
 * @requires Link - React Router component for navigation to privacy policy and imprint pages.
 */
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
