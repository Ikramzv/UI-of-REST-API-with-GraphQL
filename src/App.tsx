import React from "react";
import Clients from "./components/Clients";
import Header from './components/Header';
import Projects from "./components/Projects";

const App = () => {

  return (
    <>
      <Header />
      <div>
        <Clients />
        <Projects />
      </div>
    </>
  )
};

export default App;
