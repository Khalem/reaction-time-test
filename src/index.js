import React from 'react';
import ReactDOM from 'react-dom';

import "./main.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      gameStarted: false,
      startTime: null,
      endTime: null
    }
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);

    let myTimeout;
  }

  startGame() {
    let timer = Math.random() * (4000 - 1000) + 1000;
    this.myTimeout = setTimeout(() => {
      document.getElementById('bar').style.backgroundColor = 'var(--green)';

      let d = new Date();
      let time = d.getTime();

      this.setState({
        gameStarted: true,
        startTime: time
      });
    }, timer);

  }

  endGame() {
    if (this.state.gameStarted == false) {
      // Clear timeout so startGame code doesn't execute
      clearTimeout(this.myTimeout);
      this.setState({
        score: 'Clicked Too Early!'
      });
    } else {
      document.getElementById('bar').style.backgroundColor = 'var(--light-blue)';
      let d = new Date();
      let time = d.getTime();

      let score = time - this.state.startTime;
      this.setState({
        gameStarted: false,
        score: score
      });
    }
  }


  render() {
    return(
      <div>
        <h1>Reaction Time Speed Test</h1>
        <p>When the bar turns <span className='c-green'>green</span>, click on it</p>
        <h2>{this.state.gameStarted === false ? 'Get Ready..' : 'Go!'}</h2>
        <h2>{this.state.score}</h2>
        <div className='bar' id='bar' onClick={this.endGame}/>
        <button onClick={this.startGame}>Start</button>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
