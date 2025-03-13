import { ChangeEventHandler } from "react";
import { Col, Form, Row } from "react-bootstrap";

interface CoordinateInputProps {
  label: string;
  defaultValue?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  lg?: number;
  xxl?: number;
}

function CoordinateInput({label, defaultValue, onChange, lg, xxl}: CoordinateInputProps) {
  return (
    <Form.Group as={Row} className="mb-3" controlId={label.toLowerCase()}>
      <Form.Label column xxl={xxl} lg={lg} sm={4}>
        {label}
      </Form.Label>
      <Col>
        <Form.Control {...{
          type: "text", 
          placeholder: label,
          autoComplete: "off",
          defaultValue,
          onChange,
        }} />
      </Col>
    </Form.Group>
  );
}


export default CoordinateInput;
