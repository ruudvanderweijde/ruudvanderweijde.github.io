import React, {useEffect, useState} from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import CombinationsContainer from "./components/combinations/CombinationsContainer";
import Calculator from "./components/calculator/Calculator";

import "./App.css";

const tab = {
  LocalStorageName: 'tab-index',
  Combinations: "Combinations",
  Calculator: "Calculator",
};

function App() {
  const [tabIndex, setTabIndex] = useState("");
  useEffect(() => {
    let item = localStorage.getItem(tab.LocalStorageName);
    if (!item) { item = tab.Combinations; }
    setTabIndex(item);
  }, []);
  useEffect(() => { localStorage.setItem(tab.LocalStorageName, tabIndex); }, [tabIndex]);

  return (
    <Tabs fill id="tabs" activeKey={tabIndex} onSelect={(k) => setTabIndex(k)} className="mb-3 mt-2">
      <Tab eventKey={tab.Combinations} title={tab.Combinations}>
        <CombinationsContainer/>
      </Tab>
      <Tab eventKey={tab.Calculator} title={tab.Calculator}>
        <Calculator/>
      </Tab>
    </Tabs>
  );
}

export default App;
