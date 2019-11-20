import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';


const AddRecipe = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [procedures, setProcedures] = useState(['']);
    const [dish, setDish] = useState('not-specified');
    const [selectedFile, setSelectedFile] = useState(); // file info
    const [previewImg, setPreviewImg] = useState(); // base64 img

    return (
        <div className="form-add card container">
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
                    {ingredients.map((ingredient, index) => {
                        return (
                            <div key={index} className="add-tab">
                                <div className="add-input">
                                    <input className="form-control" value={ingredient} onChange={(e) => onChangeIngredient(e, index)} required/>
                                </div>
                                <div>
                                    <button className="btn btn-remove" onClick={(e) => removeIngredient(e, index)}>Remove</button>
                                </div>
                            </div>
                        );
                    })}
                    <br/><button onClick={addIngredient} className="btn btn-secondary btn-add">Add Ingredient</button>
                </div>
                <div className="form-group">
                    <label>Procedure:</label>
                    {procedures.map((procedure, index) => (
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
                <div className="form-group">
                    <label>Image Upload</label>
                    <input type="file" className="form-control-file" accept="image/*" onChange={onFileChange} />
                    {previewImg && <img src={previewImg} width="200" />}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
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
    
    function onOption(e) {
        setDish(e.target.value)
    }

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

        // const newRecipe = {
        //     id: Date.now(),
        //     title, 
        //     description, 
        //     ingredients, 
        //     procedures, 
        //     dish,
        //     date: moment().format('LL')
        // };

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('ingredients', ingredients);
        formData.append('procedures', procedures);
        formData.append('dish', dish);
        formData.append('date', moment().format('LL'));
        formData.append('imgUrl', selectedFile);

        axios.post('http://localhost:5000/recipes/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => console.log(res.data))
            .then(res => (
                setTitle(''),
                setDescription(''),
                setIngredients(['']),
                setProcedures(['']),
                setDish('not-specified')
            )); 
    }


}

export default AddRecipe;

