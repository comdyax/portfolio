import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="d-flex justify-content-center" style={{margin: "auto", paddingTop: "5%", paddingBottom: "5%"}}>
      <Row>
        <Col fluid xs={12} sm={6} md={6} lg={6}>
          <Image
            src="/images/forever_home.png"
            style={{
              height: "60vh",
              width: "100%",
              objectFit: "contain",
            }}
          />
        </Col>
        <Col
          fluid
          style={{
            margin: "auto",
          }}
          xs={12}
          sm={6}
          md={6}
          lg={6}
        >
          <h1>FOREVER HOME</h1>
          <br />
          <h3>The new Album coming soon on CD, Digital & Streaming</h3>
          <br />

          <Link to="/releases">
            <Button variant="light" size="lg" style={{ padding: "2%" }}>
              More Information
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
