import "bootswatch/dist/minty/bootstrap.min.css";

import { Button, Col, Container, FormControl, Row } from "react-bootstrap";
import CoordinateInput from "./CoordinateInput";
import findEPSG from "./findEPSG";


function App() {
  return (
    <div>
      <header className="bg-primary pt-5 pb-4">
        <Container >
          <h1 className="text-white">EPSG Code Finder</h1>
          <p className="lead text-white">A helper to find an EPSG code</p>
        </Container>
      </header>
      <Container className="mt-5">
        <h2 className="mb-3">API Key</h2>
        <Row>
          <Col className="me-5 mb-5">
            <FormControl placeholder="MapTiler Cloud API Key" id="api-key" />
          </Col>
          <Col />
        </Row>
        <h2 className="mb-4">Sample Coordinates</h2>
        <Row>
          <Col className="me-5">
            <CoordinateInput label="Easting" defaultValue="2617235.9114041664" />
            <CoordinateInput label="Northing" defaultValue="267557.3730302777" />
          </Col>
          <Col>
            <CoordinateInput label="Longitude" defaultValue="-75.432628°" />
            <CoordinateInput label="Latitude" defaultValue="40.044438°" />
          </Col>
        </Row>
        <Button onClick={findEPSG}>Search</Button>
        <h2 className="my-4">Results</h2>
        <div id="results">
          No results.
        </div>
      </Container>
    </div>
  );
}

export default App
