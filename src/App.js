import React, {Component} from 'react';
import { Provider } from 'react-redux';

import Navbar from "./components/Navbar";
import store from './store';
import { loadUser } from './actions/authActions';
import Footer from './components/Footer';

class App extends Component{

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() { 
    return (
      <Provider store={store}>
        <Navbar/>
        <Footer/>
      </Provider>
    )
  }

}

export default App;
