import { Col, Form, Row } from "react-bootstrap";



function CoordinateInput({label, defaultValue}: {label: string, defaultValue?: string}) {
  return (
    <Form.Group as={Row} className="mb-3" controlId={label.toLowerCase()}>
      <Form.Label column lg={2} sm={4}>
        {label}
      </Form.Label>
      <Col lg={10} sm={8}>
        <Form.Control type="text" placeholder={label} autoComplete="off" defaultValue={defaultValue} />
      </Col>
    </Form.Group>
  );
}


export default CoordinateInput;
