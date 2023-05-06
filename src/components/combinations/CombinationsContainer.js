import React, {useEffect, useMemo, useState} from 'react';

import Container from "react-bootstrap/Container";

import SizeSelector from "./SizeSelector";
import SumSelector from "./SumSelector";
import Combinations from "./Combinations";

function CombinationsContainer() {
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

export default CombinationsContainer;