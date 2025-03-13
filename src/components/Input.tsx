import { Col, Row } from "react-bootstrap";
import CoordinateInput from "./CoordinateInput";
import { useAppContext } from "./AppContext";
import { ChangeEventHandler } from "react";


type EventHandler = (setValue: (val: number) => void) => ChangeEventHandler<HTMLInputElement>;

function Input() {
  const ctx = useAppContext();
  
  const eventHandler: EventHandler = (setValue) => {
    return (e) => setValue(Number.parseFloat(e.currentTarget.value));
  }
  
  return (
    <Row>
      <Col className="me-5">
      <h5>Local Reference Coordinates</h5>
        <CoordinateInput label="Easting" onChange={eventHandler(ctx.setX)} />
        <CoordinateInput label="Northing" onChange={eventHandler(ctx.setY)} />
      </Col>
      <Col>
        <h5>Global Reference Coordinates</h5>
        <CoordinateInput label="Longitude" onChange={eventHandler(ctx.setLon)} />
        <CoordinateInput label="Latitude" onChange={eventHandler(ctx.setLat)} />
      </Col>
    </Row>
  );
}


export default Input;
