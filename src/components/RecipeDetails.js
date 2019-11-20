import React, { useState, useEffect } from 'react';
import axios from 'axios';


const RecipeDetails = (props) => {

    const [recipe, setRecipe] = useState(['']);

    useEffect(() => {
        
        let mounted = true;

        const loadData = async () => {
            const response = await axios.get('http://localhost:5000/recipes/'+props.match.params.id)
            if (mounted) {
                setRecipe(response.data);
            }
        };
        loadData();

        return () => {
            mounted = false;
          };
        }

    );

    return (
        <div className="recipe container">
            <div className="details">
                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>
                <h5>Dish Type:</h5>
                <p className="dish-type">{recipe.dish}</p>
                <p className="ingredients">{recipe.ingredients}</p>
                
                {/* <div className="ingredients-info">
                    <h5>Ingredients:</h5>
                    <ul>
                        { recipe.ingredients.map((ing, index) => (
                            <li key={index}>{ing}</li>
                        ))}
                    </ul>
                </div>
                <div className="procedures-info">
                    <h5>Procedures:</h5>
                    <ol>
                        { recipe.procedures.map((pro, index) => (
                            <li key={index}>{pro}</li>
                        ))}
                    </ol>
                </div> */}
                <hr/>
                <footer className="blockquote-footer"><cite title="Source Title">Recipe Added on: {recipe.date}</cite></footer>
            </div>
        </div>
    )


}

export default RecipeDetails