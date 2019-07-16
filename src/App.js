import React, { Component } from 'react';
import './App.css';
import FormContainer from './containers/FormContainer';

class App extends Component {

  render() {
    return (
      <div className="container">
        <center>
          <header className="App-header">
            <img src={'./child.svg'} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Children Foundation </h1>
          </header>
        </center>
        <div>
            <FormContainer />
        </div>
      </div>
    );
  }
}

export default App;