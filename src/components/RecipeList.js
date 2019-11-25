import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const RecipeList = () => {

    const [recipes, setRecipes] = useState(['']);
    const [load, setLoad] = useState(true);
    const [noData, setNoData] = useState(false);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        axios.get('http://localhost:5000/recipes/?filter='+filter)
            .then(response => {
                setLoad(false);
                if ((response.data).length === 0){
                    setNoData(true);
                }
                else {
                    setRecipes(response.data);
                }
            })
            .catch((error) => {console.log(error);})
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
                {load ? <span className="loading">Loading...</span> : 
                    ( 
                        noData ?
                            <h3 className="no-data">-- No Data in List --</h3>
                            :
                            recipes.map((recipe, index) => 
                                <li className="list-group-item list-group-item-secondary title-link" key={index}>
                                    <Link to={`/recipes/view/${recipe._id}`}>{recipe.title}</Link>
                                </li>
                            )
                    )
                }
            </ul>
        </div>
    )

    function onFilter(filterVal) {
        setFilter(filterVal);
        setLoad(true);
        axios.get('http://localhost:5000/recipes/?filter='+filterVal)
            .then(response => {
                setLoad(false);
                if ((response.data).length === 0){
                    setNoData(true);
                }
                else {
                    setNoData(false);
                    setRecipes(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

}

export default RecipeList;