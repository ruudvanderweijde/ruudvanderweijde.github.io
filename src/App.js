import React, {useState} from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import CombinationsContainer from "./components/combinations/CombinationsContainer";
import Calculator from "./components/calculator/Calculator";

function App() {
  const [key, setKey] = useState('combinations');

  return (
    <Tabs id="tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
      <Tab eventKey="combinations" title="Combinations">
        <CombinationsContainer/>
      </Tab>
      <Tab eventKey="calculator" title="Calculator">
        <Calculator/>
      </Tab>
    </Tabs>
  );
}

export default App;
