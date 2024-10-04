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

const Header = () => {
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
    <Navbar fixed="top" expand={expand} bg="dark">
      <Container fluid>
        <Navbar.Brand style={{color: "#f0dfc7"}} href="/">Perplexities on Mars</Navbar.Brand>
        <Navbar.Toggle onClick={handleShow} />
        <Navbar.Offcanvas
          show={showOffcanvas}
          onHide={handleClose}
          placement="end"
          data-bs-theme="dark"
        >
          <Offcanvas.Header closeButton style={{color: "#f0dfc7"}}>
            <Offcanvas.Title style={{color: "#f0dfc7"}}>Perplexities on Mars</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1">
              <Nav.Link style={{color: "#f0dfc7"}} as={Link} onClick={handleNavLinkClick} to="/">
                Home
              </Nav.Link>
              <Nav.Link style={{color: "#f0dfc7"}} as={Link} onClick={handleNavLinkClick} to="/releases">
                Releases
              </Nav.Link>
              <Nav.Link style={{color: "#f0dfc7"}} as={Link} onClick={handleNavLinkClick} to="/video">
                Video
              </Nav.Link>
              <Nav.Link style={{color: "#f0dfc7"}} as={Link} onClick={handleNavLinkClick} to="/tour">
                Tour
              </Nav.Link>
              <Nav.Link style={{color: "#f0dfc7"}} as={Link} onClick={handleNavLinkClick} to="/band">
                Band
              </Nav.Link>
              <NavDropdown style={{color: "#f0dfc7"}} title={language === "de" ? "Sprache" : "Language"}>
                <NavDropdown.Item onClick={() => handleLanguageChange("de")}>
                  Deutsch
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleLanguageChange("en")}>
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
