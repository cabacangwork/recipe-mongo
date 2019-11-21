import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const RecipeList = () => {

    const [recipes, setRecipes] = useState(['']);
    const [load, setLoad] = useState(true);
    const [noData, setNoData] = useState(false);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        axios.get('http://localhost:5000/recipes', {
            params: {
              dish: 'chicken'
            }
          })
            .then(response => {
                if ((response.data).length === 0){
                    setLoad(false);
                    setNoData(true);
                }
                else {
                    setLoad(false);
                    setRecipes(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

        return (
            <div className="container recipe-list">
                <div className="header-part">
                    <h2>Recipe Lists</h2>
                    <div className="select-container">
                        <select className="form-control" id="filter" value={filter} onChange={(e) => onFilter(e.target.value)}>
                            <option value="all">Show all</option>
                            <option value="chicken">Chicken</option>
                            <option value="beef">Beef</option>
                            <option value="pork">Pork</option>
                            <option value="seafood">Seafood</option>
                            <option value="vegetable">Vegetable</option>
                            <option value="pasta">Pasta</option>
                            <option value="desert">Desert</option>
                        </select>
                    </div>
                
                </div>
                <ul className="list-group">
                    {load ? <span>Loading...</span> : 
                        ( 
                            noData ?
                                <h3>No Data in List</h3>
                                :
                                recipes.map((recipe, index) => 
                                    <li className="list-group-item list-group-item-secondary" key={index}>
                                        <Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link>
                                    </li>
                                )
                        )
                    }
                </ul>
            </div>
        )

        function onFilter(filterVal) {
            setFilter(filterVal);
        }

}

export default RecipeList;