import { Col, Row, Tab, Tabs } from "react-bootstrap";
import CoordinateInput from "./CoordinateInput";
import { useAppContext } from "./AppContext";
import { ChangeEventHandler } from "react";


type EventHandler1 = (setValue: (val: number) => void) => ChangeEventHandler<HTMLInputElement>;

function IndividualInput() {
  const ctx = useAppContext();
  
  const eventHandler: EventHandler1 = (setValue) => {
    return (e) => setValue(Number.parseFloat(e.currentTarget.value));
  }
  
  return (
    <Row>
      <Col className="me-5">
      <h5>Local Reference Coordinates</h5>
        <CoordinateInput lg={2} label="Easting" onChange={eventHandler(ctx.setX)} />
        <CoordinateInput lg={2} label="Northing" onChange={eventHandler(ctx.setY)} />
      </Col>
      <Col>
        <h5>Global Reference Coordinates</h5>
        <CoordinateInput lg={2} label="Longitude" onChange={eventHandler(ctx.setLon)} />
        <CoordinateInput lg={2} label="Latitude" onChange={eventHandler(ctx.setLat)} />
      </Col>
    </Row>
  );
}

type EventHandler2 = (setValue1: (val: number) => void, setValue2: (val: number) => void) => ChangeEventHandler<HTMLInputElement>;

function PasteInput() {
  const { setX, setY, setLat, setLon } = useAppContext();
  
  const eventHandler: EventHandler2 = (setValue1, setValue2) => {
    return (e) => {
      const str = e.currentTarget.value;
      const [val1, val2] = str.split(',');
      setValue1(Number.parseFloat(val1));
      setValue2(Number.parseFloat(val2));
    };
  }
  
  return (
    <Row>
      <Col className="me-5">
      <h5>Local Reference Coordinates</h5>
        <CoordinateInput label="Easting, Northing" onChange={eventHandler(setX, setY)} />
      </Col>
      <Col>
        <h5>Global Reference Coordinates</h5>
        <CoordinateInput label="Latitude, Longitude" onChange={eventHandler(setLat, setLon)} />
      </Col>
    </Row>
  );
}

function Input() {
  return (
    <Tabs defaultActiveKey="2" id="uncontrolled-tab-example">
      <Tab eventKey="1" title="Individual Entry" className="border border-top-0 p-3">
        <IndividualInput />
      </Tab>
      <Tab eventKey="2" title="Comma Separated" className="border border-top-0 p-3">
        <PasteInput />
      </Tab>
    </Tabs>
  );
}

export default Input;
