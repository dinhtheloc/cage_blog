import React from 'react';
import {
  BrowserRouter as Router,

  Route, Switch
} from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Loading from './components/Loading/Loading';
import Article from './views/Article/Article';
import Home from './views/Home/Home';

function App() {
  

  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/article/:slug">
          <Article />
        </Route>

      </Switch>
      {/* <Footer></Footer> */}
      <Loading></Loading>
    </Router>
  );
}

export default App;
