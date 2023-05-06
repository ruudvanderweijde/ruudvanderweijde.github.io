import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function TextRow({text}) {
  return (
    <Row className="text-center mb-2"><Col>{text}</Col></Row>
  );
}

export default TextRow;