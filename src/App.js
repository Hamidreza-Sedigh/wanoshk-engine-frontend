import React from 'react';
//import logo from './logo.svg';  // remove by jean
import {Container} from 'reactstrap';
import Routes from './routes';
import {ContextWrapper} from './user-context'
import './App.css';
//import { Route } from 'react-router-dom';

function App() {
  return (
    <ContextWrapper>
      {/* <Container> */}
      <div className='myContainer'>
        <h1>wanoshk Engine.</h1>
        <div className="content" > 
          <Routes/>
        </div>
      </div>
      {/* </Container> */}
    </ContextWrapper>
  );
}

export default App;
