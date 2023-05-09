import React from 'react';

import TextRow from "../util/TextRow";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Combinations({filteredOptions, inactives, updateInactives}) {
  const handleClick = id => {
    if (inactives.has(id)) {
      updateInactives(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      })
    } else {
      updateInactives(prev => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
    }
  }
  const count = filteredOptions.filter(o => !inactives.has(o.value)).length;
  const text = `Combinations: (${count})`;
  return (
    <>
      <TextRow text={text} />
      <Row>
        {filteredOptions.map(option => (
          <Col key={option.value}>
            <Button key={option.value} className="mb-2" variant={inactives.has(option.value) ? "secondary" : "success"} onClick={(e) => handleClick(option.value)}>
              {option.value}
            </Button>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Combinations;