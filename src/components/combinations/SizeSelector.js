import React from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import TextRow from "../util/TextRow";
import DividerRow from "../util/DividerRow";

function SizeSelector({size, updateSize, options}) {
  const sizes = Array.from(new Set([...options].map(item => item['size'])));

  const cols = sizes.map(x =>
    <Button
      key={x}
      variant="outline-primary"
      active={x === size}
      value={x}
      onClick={(e) => updateSize(x)}
    >
      {x}
    </Button>
  );

  return (
    <>
      <TextRow text="Size Selector:" />
      <Row className="text-center">
        <Col>
          <ButtonGroup>
            <Button variant="outline-primary" disabled={Math.min(...sizes) === size} onClick={(e) => updateSize(size-1)}>{'<'}</Button>
            {cols}
            <Button variant="outline-primary" disabled={Math.max(...sizes) === size} onClick={(e) => updateSize(size+1)}>{'>'}</Button>
          </ButtonGroup>
        </Col>
      </Row>
      <DividerRow/>
    </>
  );
}

export default SizeSelector;