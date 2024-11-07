import { LanguageContext } from "../contexts/LanguageContextProvider";
import { PlayContext } from "../contexts/PlayContextProvider";
import { useContext, useState } from "react";
import {
  Navbar,
  Offcanvas,
  Nav,
  NavDropdown,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { logo } from "../p5_drawings/logo";
import { useEffect, useRef } from "react";
import p5 from "p5";

const Header = () => {
  const { language, handleSetLanguage } = useContext(LanguageContext);
  const { display, fadeDuration, play } = useContext(PlayContext);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const expand = "md";
  const canvasRef = useRef(null);

  useEffect(() => {
    if (display) {
      const p5Logo = new p5(logo, canvasRef.current);
      return () => p5Logo.remove();
    }
  }, [display]);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);
  const handleNavLinkClick = () => {
    handleClose();
  };

  const handleLanguageChange = (lang) => {
    handleSetLanguage(lang);
    handleClose();
  };
  return (
    <>
      {display && (
        <Navbar
          fixed="top"
          expand={expand}
          className="nav"
          data-bs-theme="dark"
          style={{
            opacity: play ? 0 : 1,
            transition: `opacity ${fadeDuration}s ease`,
          }}
        >
          <Container fluid>
            <Navbar.Brand
              className="nav-link"
              as={Link}
              to={play ? "" : "/music"}
              style={{ maxWidth: "20px", maxHeight: "40px" }}
            >
              <span ref={canvasRef} />
            </Navbar.Brand>
            <Navbar.Brand className="nav-link" as={Link} to={play ? "" : "/"}>
              <b>Perplexities on Mars</b>
            </Navbar.Brand>
            <Navbar.Toggle onClick={handleShow} />
            <Navbar.Offcanvas
              show={showOffcanvas}
              onHide={handleClose}
              placement="end"
              data-bs-theme="dark"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title className="nav-link">
                  <b>Perplexities on Mars</b>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav
                  className="justify-content-end flex-grow-1 pe-3"
                  style={{ textAlign: "center" }}
                >
                  <Nav.Link
                    className="nav-link"
                    as={Link}
                    onClick={handleNavLinkClick}
                    to={play ? "" : "/"}
                  >
                    Home
                  </Nav.Link>
                  <Nav.Link
                    className="nav-link"
                    as={Link}
                    onClick={handleNavLinkClick}
                    to={play ? "" : "/music"}
                  >
                    Music
                  </Nav.Link>
                  <Nav.Link
                    className="nav-link"
                    as={Link}
                    onClick={handleNavLinkClick}
                    to={play ? "" : "/releases"}
                  >
                    Releases
                  </Nav.Link>
                  <Nav.Link
                    className="nav-link"
                    as={Link}
                    onClick={handleNavLinkClick}
                    to={play ? "" : "/video"}
                  >
                    Video
                  </Nav.Link>
                  <Nav.Link
                    className="nav-link"
                    as={Link}
                    onClick={handleNavLinkClick}
                    to={play ? "" : "/tour"}
                  >
                    Tour
                  </Nav.Link>
                  <Nav.Link
                    className="nav-link"
                    as={Link}
                    onClick={handleNavLinkClick}
                    to={play ? "" : "/band"}
                  >
                    Band
                  </Nav.Link>
                  <NavDropdown
                    align="end"
                    title={
                      <span className="dropdown_nav">
                        {language === "de" ? "Sprache" : "Language"}
                      </span>
                    }
                  >
                    <NavDropdown.Item
                      className="dropdown_nav"
                      onClick={play ? null : () => handleLanguageChange("de")}
                    >
                      Deutsch
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      className="dropdown_nav"
                      onClick={play ? null : () => handleLanguageChange("en")}
                    >
                      English
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default Header;
