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
import config from "../assets/config.json";

const Header = () => {
  const menu = config.menu;
  const { language, handleSetLanguage } = useContext(LanguageContext);
  const { display, fadeDuration, play } = useContext(PlayContext);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const expand = "md";
  const canvasRef = useRef(null);

  useEffect(() => {
    if (display && menu.visualizer) {
      const p5Logo = new p5(logo, canvasRef.current);
      return () => p5Logo.remove();
    }
  }, [display, menu.visualizer]);

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
            {menu.visualizer && (
              <Navbar.Brand
                className="nav-link"
                as={Link}
                to={play ? "" : "/music"}
                style={{ maxWidth: "20px", maxHeight: "40px" }}
              >
                {console.log("hey there")}
                <span ref={canvasRef} />
              </Navbar.Brand>
            )}
            <Navbar.Brand className="nav-link" as={Link} to={play ? "" : "/"}>
              <b>{config.name}</b>
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
                  <b>{config.name}</b>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav
                  className="justify-content-end flex-grow-1 pe-3"
                  style={{ textAlign: "center" }}
                >
                  {menu.home && (
                    <Nav.Link
                      className="nav-link"
                      as={Link}
                      onClick={handleNavLinkClick}
                      to={play ? "" : "/"}
                    >
                      {language === "de" ? "Startseite" : "Home"}
                    </Nav.Link>
                  )}
                  {menu.releases && (
                    <Nav.Link
                      className="nav-link"
                      as={Link}
                      onClick={handleNavLinkClick}
                      to={play ? "" : "/releases"}
                    >
                      {language === "de" ? "Veröffentlichungen" : "Releases"}
                    </Nav.Link>
                  )}
                  {menu.pictures && (
                    <Nav.Link
                      className="nav-link"
                      as={Link}
                      onClick={handleNavLinkClick}
                      to={play ? "" : "/pictures"}
                    >
                      {language === "de" ? "Bilder" : "Pictures"}
                    </Nav.Link>
                  )}
                  {menu.video && (
                    <Nav.Link
                      className="nav-link"
                      as={Link}
                      onClick={handleNavLinkClick}
                      to={play ? "" : "/video"}
                    >
                      Video
                    </Nav.Link>
                  )}
                  {menu.tour && (
                    <Nav.Link
                      className="nav-link"
                      as={Link}
                      onClick={handleNavLinkClick}
                      to={play ? "" : "/tour"}
                    >
                      {language === "de" ? "Konzerte" : "Tour"}
                    </Nav.Link>
                  )}
                  {menu.about && (
                    <Nav.Link
                      className="nav-link"
                      as={Link}
                      onClick={handleNavLinkClick}
                      to={play ? "" : "/about"}
                    >
                      {language === "de" ? "Über" : "About"}
                    </Nav.Link>
                  )}
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
