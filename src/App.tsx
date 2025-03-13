import "bootswatch/dist/minty/bootstrap.min.css";

import { Col, Container, Row } from "react-bootstrap";
import CoordinateInput from "./CoordinateInput";
import findEPSG from "./findEPSG";
import Results from "./Results";
import { useState } from "react";


function App() {
  const [url, setURL] = useState("");
  
  const updateURL = () => {
    const newURL = findEPSG();
    if (newURL) {
      setURL(newURL);
    }
  }
  
  return (
    <div>
      <header className="bg-primary pt-5 pb-4">
        <Container >
          <h1 className="text-white">EPSG Code Finder</h1>
          <p className="lead text-white">A helper to find an EPSG code</p>
        </Container>
      </header>
      <Container className="mt-5">
        <h2 className="mb-4">Sample Coordinates</h2>
        <Row>
          <Col className="me-5">
            <CoordinateInput label="Easting" onChange={updateURL} />
            <CoordinateInput label="Northing" onChange={updateURL} />
          </Col>
          <Col>
            <CoordinateInput label="Longitude" onChange={updateURL} />
            <CoordinateInput label="Latitude" onChange={updateURL} />
          </Col>
        </Row>
        <h2 className="my-4">Results</h2>
        <Results url={url} />
        <div className="my-5 py-5" />
      </Container>
    </div>
  );
}

export default App
