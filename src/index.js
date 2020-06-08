import React from 'react';
import ReactDOM from 'react-dom';

import "./main.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h1>Reaction Time Speed Test</h1>
        <p>When the bar turns <span className='c-green'>green</span>, click on it</p>
        <h2>Get ready...</h2>
        <div className='bar'/>
        <button>Start</button>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
