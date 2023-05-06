import React, {useEffect, useState} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import DividerRow from "../util/DividerRow";

function Calculator() {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const operators = ['+', '-', 'C'];

  const [result, setResult] = useState('...');
  const [memory, setMemory] = useState([]);
  const [mathStack, setMathStack] = useState([]);
  useEffect(() => {
    const total = (stack) => {
      let sum = 0;
      let modifier = '+';
      while (stack.length) {
        const s = stack.shift();
        if (['+','-'].includes(s)) { modifier = s; continue; }
        if (modifier === '+') {
          sum += parseFloat(s);
        } else {
          sum -= parseFloat(s);
        }
      }
      return sum;
    };

    if (mathStack.length || memory.length) {
      setResult(mathStack.join(' ') + ' ' + memory.join('') + ' = ' + total([...mathStack, '0'+memory.join('')]));
    } else {
      setResult('...');
    }
  }, [mathStack, memory])

  const handleClick = id => {
    console.log('handle id:', id);
    if (['C'].includes(id)) {
      if (memory.length) {
        setMemory([]);
      } else if (mathStack.length) {
        setMathStack(stack => { stack.pop(); return [...stack]; });
      }
    } else if (['+', '-'].includes(id)) {
      if (memory.length) {
        setMathStack(stack => [...stack, memory.join('')]);
        setMemory([]);
      }
      setMathStack(stack => [...stack, id]);
    } else {
      setMemory(memory => [...memory, id]);
    }
  }

  return (
    <Container>
      <Row className="text-center mb-2"><Col>{result}</Col></Row>
      <DividerRow/>
      <Row className="text-center">
        {operators.map(i => (<Col key={i} xs={4}><Button variant="warning" style={{width: "100px", height: "100px"}} className="mb-2" size="lg" onClick={(e) => handleClick(i)}>{i}</Button></Col>))}
      </Row>
      <Row className="text-center">
        {numbers.map(i => (<Col key={i} xs={4}><Button style={{width: "100px", height: "100px"}} className="mb-2" size="lg" onClick={(e) => handleClick(i)}>{i}</Button></Col>))}
      </Row>
    </Container>
  );
}

export default Calculator;