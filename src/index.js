import React from 'react';
import ReactDOM from 'react-dom';
import "./main.css";

let myStorage = window.localStorage;

if (!localStorage.getItem('highscore')) {
  localStorage.setItem('highscore', null);
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      gameStarted: false,
      startClicked: false,
      startTime: null,
      error: false
    }
    // Bind event handlers
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);

    let myTimeout;
  }

  startGame() {
    // Only run if start hasn't been clicked before to avoid multiple timeouts occuring at the same time
    if (this.state.startClicked === false) {
      // Reset error
      this.setState({
        error: false,
        startClicked: true,
      });

      // Create a random amount of time - used so users can't get used to a pattern and it's truly reaction based
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

  }

  endGame() {
    /*
    Created state: startClicked so that the error only pops up if a user has actually started the game. Where as before it would come up if a user clicked on the bar
    before they clicked start
    */
    if (this.state.gameStarted === false && this.state.startClicked === true) {
      // Clear timeout so startGame code doesn't execute
      clearTimeout(this.myTimeout);
      this.setState({
        error: true,
        score: 0,
        startClicked: false
      });
    } else if (this.state.gameStarted === true && this.state.startClicked === true) {
      let d = new Date();
      let time = d.getTime();

      let score = time - this.state.startTime;

      document.getElementById('bar').style.backgroundColor = 'var(--light-blue)';

      // Check to see if there's a highscore already, if there is, check if score is lower
      if (localStorage.getItem('highscore') ===  'null') {
        localStorage.setItem('highscore', score);
      }
      else if (score < localStorage.getItem('highscore') && localStorage.getItem('highscore') > 0) {
        localStorage.setItem('highscore', score);
      }
      this.setState({
        gameStarted: false,
        startClicked: false,
        score: score
      });
    }
  }


  render() {
    return(
      <div>
        <h1>Reaction Time Speed Test</h1>
        <p>When the bar turns <span className='c-green'>green</span>, click on it</p>
        <h2 className='score'>{this.state.error === true ? "Don't click the bar too early!" : this.state.score > 0 ? 'Your time was: ' + this.state.score + 'ms' : "Don't mess this up"}</h2>
        <div className='bar' id='bar' onClick={this.endGame}>
          <p className='highscore'>{localStorage.getItem('highscore') > 0 ? 'Highscore: ' + localStorage.getItem('highscore') + 'ms 🥳' : ' '}</p>
        </div>
        <button onClick={this.startGame}>Start</button>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
