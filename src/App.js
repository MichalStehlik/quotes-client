import React from 'react';
import './App.css';
import {createBrowserHistory} from "history";
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import {AppProvider} from "./providers/ApplicationProvider";
import { Container } from 'reactstrap';

import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Navigation from "./components/Navigation";
import Register from "./components/Register";
import Login from "./components/Login";
import List from "./components/List";
import Create from "./components/Create";

const history = createBrowserHistory();

function App() {
  return (
    <AppProvider>  
      <Router history={history}>
        <Navigation />
        <Container className="main-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/list" component={List} />
            <Route path="/create" component={Create} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Router>
    </AppProvider>
  );
}

export default App;
