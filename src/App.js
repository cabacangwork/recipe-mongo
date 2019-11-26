import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';

import Navbar from "./components/Navbar";
import store from './store';

import { loadUser } from './actions/authActions';

class App extends Component{

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() { 
    return (
      <Provider store={store}>
        <Navbar/>
      </Provider>
    )
  }

}

export default App;
