import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import AddRecipe from "./components/AddRecipe";
import Home from './components/Home';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

class App extends Component{
  render() { 
    return (
        <Router>
          <Navbar/><br/>
        <Switch>
            <Route exact path="/"component={Home}/>
            <Route path="/recipes/add" component={AddRecipe}/>
            <Route exact path="/recipes" component={RecipeList} />
            <Route path="/recipes/:id" component={RecipeDetails}/>
            {/* <Route component={PageNotFound} /> */}
        </Switch>
        </Router>
    )
  }

}

export default App;
