import React, {useEffect, useState} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";

import './Calculator.css';

function Calculator() {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  const [total, setTotal] = useState(0);
  const [calculation, setCalculation] = useState('');
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
      setCalculation(mathStack.join('') + '' + memory.join(''));
      setTotal(total([...mathStack, '0'+memory.join('')]));
    } else {
      setCalculation('');
      setTotal(0);
    }
  }, [mathStack, memory])

  const onNumberPress = num => {
    setMemory(memory => [...memory, num]);
  }
  const onPlusMinusPress = key => {
    if (memory.length) {
      setMathStack(stack => [...stack, memory.join('')]);
      setMemory([]);
    } else if (['+','-'].includes(mathStack[mathStack.length-1])) {
      // if last item is an operator, drop the last item
      setMathStack(stack => { stack.pop(); return [...stack]; });
    }
    setMathStack(stack => [...stack, key]);
  }
  const onClearPress = () => {
    if (memory.length) {
      setMemory([]);
    } else if (mathStack.length) {
      setMathStack(stack => { stack.pop(); return [...stack]; });
    }
  }

  return (
    <Container>
      <Row className="text-center mb-4">
        <Col xs={6} style={{ margin: "auto"}}><div className="calculation">{calculation}</div></Col>
        <Col xs={2} style={{ margin: "auto"}}><div className="total">{total}</div></Col>
        <Col xs={4}>
          <Button variant="danger" size="lg" onClick={onClearPress}>C</Button>
        </Col>
      </Row>
      <Row className="text-center">
        {numbers.map(i => (<Col key={i} xs={4}><Button className="mb-2" size="lg" onClick={(e) => onNumberPress(i)}>{i}</Button></Col>))}
        <Col key="plus" xs={4}>
          <Button variant="warning" className="mb-2" size="lg" onClick={(e => onPlusMinusPress('+'))}>+</Button>
        </Col>
        <Col key="minus" xs={4}>
          <Button variant="warning" className="mb-2" size="lg" onClick={(e => onPlusMinusPress('-'))}>-</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Calculator;