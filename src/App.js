import React, {useEffect, useMemo, useState} from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

function Divider() {
  return (
    <Row><Col><hr className="mb-1"/></Col></Row>
  );
}

function Text({text}) {
  return (
    <Row className="text-center mb-2"><Col>{text}</Col></Row>
  );
}

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
      <Text text="Size Selector:" />
      <Row className="text-center">
        <Col>
          <ButtonGroup>
            <Button variant="outline-primary" disabled={Math.min(...sizes) === size} onClick={(e) => updateSize(size-1)}>{'<'}</Button>
            {cols}
            <Button variant="outline-primary" disabled={Math.max(...sizes) === size} onClick={(e) => updateSize(size+1)}>{'>'}</Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Divider/>
    </>
  );
}

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
      <Text text="Total:" />
      <Row>
        {sums.map(s => (
          <Col key={s}>
            <Button className="mb-2" variant="outline-success" active={s === sum}
              onClick={(e) => updateSum(s)}
            >
              {s}
            </Button>
          </Col>
        ))}
      </Row>
      <Divider/>
    </>
  );
}

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
      <Text text={text} />
      <Row>
        {filteredOptions.map(option => (
          <Col key={option.value}>
            <Button key={option.value} className="mb-2" variant={inactives.has(option.value) ? "secondary" : "success"} onClick={(e) => handleClick(option.value)}>
              {option.value}
            </Button>
          </Col>
        ))}
      </Row>
      <Divider/>
    </>
  );
}

function Main() {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setOptions(await (await fetch('/data/combinations.json')).json());
    }

    fetchData();
  }, []);

  const [size, setSize] = useState(3);
  const [sum, setSum] = useState(10);
  const [inactives, setInactives] = useState(new Set([]));
  useEffect(() => {
    // reset excluded when sum is changing
    setInactives(new Set());
  }, [sum])

  const filteredOptions = useMemo(() => {
    const filtered = Array.from(new Set([...options].filter(item => item.size === size && item.sum === sum)));
    return filtered.map(item => ({...item, active: true}));
  }, [options, size, sum, inactives])

  return (
    <Container>
      <SizeSelector size={size} updateSize={setSize} options={options} />
      <SumSelector size={size} sum={sum} updateSum={setSum} options={options} />
      <Combinations filteredOptions={filteredOptions} inactives={inactives} updateInactives={setInactives} />
    </Container>
  );
}

export default function App() {
  return <Main />;
}
