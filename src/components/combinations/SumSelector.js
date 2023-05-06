import React, {useEffect, useState} from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";

import TextRow from "../util/TextRow";
import DividerRow from "../util/DividerRow";

function SumSelector({size, sum, updateSum, options}) {
  const [sums, setSums] = useState([]);
  useEffect(() => {
    setSums(Array.from(new Set([...options].filter(item => item.size === size).map(item => item['sum']))));
  }, [options, size])

  useEffect(() => {
    // if the previous sum is not in the new list, pick the first one
    if (!sums.includes(sum)) { updateSum(sums[0]); }
  }, [sums, sum])

  return (
    <>
      <TextRow text="Total:" />
      <Row>
        {sums.map(s => (
          <Col key={s}>
            <Button style={{ width: "45px" }} className="mb-2" variant="outline-success" active={s === sum}
                    onClick={(e) => updateSum(s)}
            >
              {s}
            </Button>
          </Col>
        ))}
      </Row>
      <DividerRow/>
    </>
  );
}

export default SumSelector;