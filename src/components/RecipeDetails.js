import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import PageNotFound from './PageNotFound';

const RecipeDetails = (props) => {

    const [recipe, setRecipe] = useState({});
    const [load, setLoad] = useState(true);
    const [noData, setNoData] = useState(false); 

    useEffect(() => {
        axios.get('http://localhost:5000/recipes/view/'+props.match.params.id)
            .then(response => {
                if ((response.data) == null) {
                    setLoad(false);
                    setNoData(true);
                }
                else {
                    setLoad(false);
                    setRecipe(response.data);
                }
            })
            .catch((error) => {
                setLoad(false);
                setNoData(true);
            })
    }, []);

    return (
        <div className="recipe container">
            {load ? 
                <h2>Loading...</h2> 
                : 
                (noData? <PageNotFound/> :
                    <div className="details">
                        <h2>{recipe.title}</h2>
                        <p className="food-img">
                            <a href={recipe.imgUrl} target="_blank">
                                <img src={recipe.imgUrl} />
                            </a>
                        </p>
                        <p>{recipe.description}</p>
                        <h5>Dish Type:</h5>
                        <p className="dish-type">{recipe.dish}</p>                
                        <div className="ingredients-info">
                            <h5>Ingredients:</h5>
                            <ul>
                                {recipe.ingredients && (JSON.parse(recipe.ingredients)).map((ing, index) => (
                                    <li key={index}>{ing}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="procedures-info">
                            <h5>Procedures:</h5>
                            <ol>
                                {recipe.procedures && (JSON.parse(recipe.procedures)).map((pro, index) => (
                                    <li key={index}>{pro}</li>
                                ))}
                            </ol>
                        </div>
                        <hr/>
                        <div className="date-details">
                            <footer className="blockquote-footer"><cite title="Source Title">Recipe Added on: {recipe.date}</cite></footer>
                            <footer className="blockquote-footer"><cite title="Source Title">Last Update: {recipe.editDate}</cite></footer>
                        </div>
                        <div className="footer-buttons">
                            <div className="left"><Link to="/recipes/list">&lt; Recipe List</Link></div>
                            <div className="middle">
                                <Link className="btn btn-info edit" to={`/recipes/update/${recipe._id}`}>Edit</Link>
                                <button type="button" className="btn btn-info" onClick={(e) => onDelete(e, recipe._id)}>Delete</button>
                            </div>
                            <div className="right"><Link to="/recipes/add">Add Recipe &gt;	</Link></div>                
                        </div>
                    </div>    
                )
            }
        </div>
    )

    function onDelete(e, id) {
        e.preventDefault();
        axios.delete('http://localhost:5000/recipes/'+id, {
            data: {
                imgPath: (recipe.imgUrl).replace('http://localhost:5000/public/','')
            }
        })
          .then(response => { 
              console.log(response.data)
                setLoad(true);
                setTimeout(() => {
                    setLoad(false);
                    setNoData(true);
                }, 1000)
            }
        );
      }
}

export default RecipeDetails