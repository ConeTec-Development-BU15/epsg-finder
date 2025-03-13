import { ChangeEventHandler } from "react";
import { Col, Form, Row } from "react-bootstrap";

interface CoordinateInputProps {
  label: string;
  defaultValue?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

function CoordinateInput({label, defaultValue, onChange}: CoordinateInputProps) {
  return (
    <Form.Group as={Row} className="mb-3" controlId={label.toLowerCase()}>
      <Form.Label column lg={2} sm={4}>
        {label}
      </Form.Label>
      <Col lg={10} sm={8}>
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
