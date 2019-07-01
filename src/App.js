import React from 'react';
import './App.css';
import Calculate from './components/calculation';
import { ThemeProvider } from '@material-ui/styles';


export default class App extends React.Component {
  render(){
    return (
      <ThemeProvider >
      <div className="App">
        <Calculate />
      </div>
      </ThemeProvider>
    );
  }
}


