import React from 'react';
import { BrowserRouter as Router } from "react-router-dom"
import BodyApp from './components/body'

function App() {
  return (
      <Router>
        <BodyApp />
      </Router>
  );
}

export default App;
