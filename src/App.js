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
import PageNotFound from './components/PageNotFound';
import EditRecipe from './components/EditRecipe';

class App extends Component{
  render() { 
    return (
        <Router>
          <Navbar/><br/>
          <Switch>
              <Route exact path="/"component={Home}/>
              <Route exact path="/recipes/add" component={AddRecipe}/>
              <Route exact path="/recipes" component={RecipeList} />
              <Route exact path="/recipes/view/:id" component={RecipeDetails}/>
              <Route exact path="/recipes/update/:id" component={EditRecipe}/>
              <Route component={PageNotFound} />
          </Switch>
        </Router>
    )
  }

}

export default App;
