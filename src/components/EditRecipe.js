import React, { useState, useEffect} from 'react';
import moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router-dom'

const EditRecipe = (props) => {

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [procedures, setProcedures] = useState(['']);
    const [dish, setDish] = useState('not-specified');
    const [selectedFile, setSelectedFile] = useState();
    const [previewImg, setPreviewImg] = useState();

    useEffect(() => {
        axios.get('http://localhost:5000/recipes/view/'+props.match.params.id)
            .then(response => {
                console.log(response);
                setId(response.data._id)
                setTitle(response.data.title)
                setDescription(response.data.description)
                setDish(response.data.dish);
                setPreviewImg(response.data.imgUrl);
                setIngredients(JSON.parse(response.data.ingredients));
                setProcedures(JSON.parse(response.data.procedures));
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    return (
      <div className="form-add card container edit-page">
        <div className="back-link"><Link to={`/recipes/view/${id}`}>&lt; Back to Recipe Details</Link></div>
        <h2 className="title">Edit Recipe</h2>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label><br/>
                <input className="form-control" type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Description</label><br/>
                <textarea className="form-control" rows="3" type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Dish Type</label>
                <select className="form-control" id="dishType" value={dish} onChange={(e) => onOption(e)}>
                    <option value="not-specified">Not Specified</option>
                    <option value="chicken">Chicken</option>
                    <option value="beef">Beef</option>
                    <option value="pork">Pork</option>
                    <option value="seafood">Seafood</option>
                    <option value="vegetable">Vegetable</option>
                    <option value="pasta">Pasta</option>
                    <option value="desert">Desert</option>
                </select>
            </div>
            <div className="form-group">
                <label>Ingredients:</label>
                { ingredients && ingredients.map((ing, index) => (
                    <div key={index} className="add-tab">
                        <div className="add-input">
                            <input className="form-control" value={ing} onChange={(e) => onChangeIngredient(e, index)} required/>
                        </div>
                        <div>
                            <button className="btn btn-remove" onClick={(e) => removeIngredient(e, index)}>Remove</button>
                        </div>
                    </div>
                ))}
                <br/><button onClick={addIngredient} className="btn btn-secondary btn-add">Add Ingredient</button>
            </div>
            <div className="form-group">
                <label>Procedure:</label>
                { procedures && procedures.map((procedure, index) => (
                    <div key={index} className="add-tab">
                        <div className="add-input">
                            <textarea className="form-control" rows="3" type="text" value={procedure} onChange={(e) => onChangeProcedure(e, index)} required/>
                        </div>
                        <div>
                            <button className="btn btn-remove" onClick={(e) => removeProcedure(e, index)}>Remove</button>
                        </div>
                    </div>
                ))}
                <br/><button onClick={addProcedure} className="btn btn-secondary btn-add">Add Procedure</button>
            </div>       
            <div className="form-group img-up"> 
                {previewImg && <img src={previewImg} className="img-preview" />}
                <div className="image-label">
                    <label>Image Upload</label>
                    <input type="file" name="imgUrl" className="form-control-file" accept="image/*" onChange={onFileChange} />
                </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg">Submit</button>
        </form>
      </div>  
    );

    function onFileChange (event) {
        if(event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            // use FileReader api constructor from HTML5
            let reader = new FileReader();
            // listen
            reader.onloadend = () => {
                setPreviewImg(reader.result);
            };
            // start reading as URL
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    function onChangeIngredient(e, index) {
        const temp = [...ingredients];
        temp[index] = e.target.value;
        setIngredients(temp);
    }

    function addIngredient(e) {
        e.preventDefault();
        const values = [...ingredients];
        values.push('');
        setIngredients(values);
    }

    function removeIngredient(e, index) {
        e.preventDefault();
        const values = [...ingredients];
        if(index >= 1) {
            values.splice(index, 1);
            setIngredients(values);
        }
    }

    function onChangeProcedure(e, index) {
        const temp = [...procedures];
        temp[index] = e.target.value;
        setProcedures(temp);
    }

    function addProcedure(e) {
        e.preventDefault();
        const values = [...procedures];
        values.push('');
        setProcedures(values);
    }

    function removeProcedure(e, index) {
        e.preventDefault();
        const values = [...procedures];
        if(index >= 1) {
            values.splice(index, 1);
            setProcedures(values);
        }
    }
    
    function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('ingredients', JSON.stringify(ingredients));
        formData.append('procedures', JSON.stringify(procedures));
        formData.append('dish', dish);
        formData.append('editDate', moment().format('LLL'));
        
        if (selectedFile) formData.append('imgUrl', selectedFile);

        axios.post('http://localhost:5000/recipes/update/'+props.match.params.id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => console.log(res.data))
        .then( () => (
            setTimeout(() => {
                props.history.push(`/recipes/list`);
            }, 500)
        )); 
    }

}

export default EditRecipe;
