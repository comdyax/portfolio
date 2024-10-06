import { LanguageContext } from "../contexts/LanguageContextProvider";
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
import { useEffect, useRef } from 'react';
import p5 from 'p5';

const Header = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const p5Logo = new p5(logo, canvasRef.current);
    return () => p5Logo.remove();
  }, []);

  const { language, handleSetLanguage } = useContext(LanguageContext);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const expand = "sm";

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
    <Navbar fixed="top" expand={expand} className="nav" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand className="nav-link" as={Link} to="/" style={{maxWidth: "5px", maxHeight: "40px"}}>
        <span ref={canvasRef} />
        </Navbar.Brand>
        <Navbar.Brand className="nav-link" as={Link} to="/">
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
            <Nav>
              <Nav.Link
                className="nav-link"
                as={Link}
                onClick={handleNavLinkClick}
                to="/"
              >
                Home
              </Nav.Link>
              <Nav.Link
                className="nav-link"
                as={Link}
                onClick={handleNavLinkClick}
                to="/releases"
              >
                Releases
              </Nav.Link>
              <Nav.Link
                className="nav-link"
                as={Link}
                onClick={handleNavLinkClick}
                to="/video"
              >
                Video
              </Nav.Link>
              <Nav.Link
                className="nav-link"
                as={Link}
                onClick={handleNavLinkClick}
                to="/tour"
              >
                Tour
              </Nav.Link>
              <Nav.Link
                className="nav-link"
                as={Link}
                onClick={handleNavLinkClick}
                to="/band"
              >
                Band
              </Nav.Link>
              <NavDropdown
                title={
                  <span className="dropdown_nav">
                    {language === "de" ? "Sprache" : "Language"}
                  </span>
                }
              >
                <NavDropdown.Item
                  className="dropdown_nav"
                  onClick={() => handleLanguageChange("de")}
                >
                  Deutsch
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  className="dropdown_nav"
                  onClick={() => handleLanguageChange("en")}
                >
                  English
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
