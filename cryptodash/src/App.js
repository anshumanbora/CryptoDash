import React, { Component } from 'react';
import Header from './Components/Header';
import './App.css';
import ApiInterface from './Components/ApiInterface'
import Footer from "./Components/Footer";


class App extends Component {
  render() {
    return (
      <div className="App">

          <Header/>
        <ApiInterface/>



      </div>
    );
  }
}

export default App;
