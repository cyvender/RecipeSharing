import { useState, useRef } from 'react'
import Recipe from '../components/Recipe'
import ImageUpload from '../components/ImageUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faListDots, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context';
import axios from 'axios';

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const AddRecipe = () => {

    const { categories } = useAuth();
    const fileRef = useRef();

    // const [category, setCategory] = useState({});
    const [ingredients, setIngredients] = useState(['']);
    const [steps, setSteps] = useState([''])
    const [image, setImage] = useState(null);
    const [isPublic, setIsPublic] = useState(false);
    // const [title, setTitle] = useState('');
    const [recipe, setRecipe] = useState(
        {
            title: '',
            category: '',
            ingredientsString: '',
            // categoryId: '',
            stepsString: '',
            base64data: '',
            isPublic: false,
            // UserId: '',
        });

    const onRecipeChange = e => {
        const copy = { ...recipe };
        copy[e.target.name] = e.target.value;
        setRecipe(copy);
    }

    const onIngredientChange = (e, index) => {
        const copy = [...ingredients];
        copy[index] = e.target.value;
        setIngredients(copy);
        const recipeCopy = {...recipe};
        recipeCopy.ingredientsString = JSON.stringify(copy);
        setRecipe(recipeCopy);
    }

    const onAddIngredientClick = () => {
        const copy = [...ingredients, ''];
        setIngredients(copy);
    }

    const onStepChange = (e, index) => {
        const copy = [...steps];
        copy[index] = e.target.value;
        setSteps(copy);
        const recipeCopy = {...recipe};
        recipeCopy.stepsString = JSON.stringify(copy);
        setRecipe(recipeCopy);
    }

    const onAddStepClick = () => {
        const copy = [...steps, ''];
        setSteps(copy);
    }

    // const onFileChosen = e => {
    //     setImage(fileRef.current.files[0]);
    // }
    const onFileChosen = async () => {
        setImage(fileRef.current.files[0]);
        const copy = { ...recipe };
        copy.base64data = await toBase64(fileRef.current.files[0]);
        setRecipe(copy);
    }


    const onSharePublicCheck = () => {
        const copy = {...recipe};
        copy.isPublic = !copy.isPublic;
        setRecipe(copy);
    }

    const onSubmitClick = async e => {
        e.preventDefault();
        // const base64data = await toBase64(fileRef.current.files[0]);
        // recipe.base64data = base64data;
        console.log("RECIPE:", recipe)
        await axios.post('/api/recipe/addrecipe', recipe);
    }

    let imageUrl = '';
    if (image) {
        imageUrl = URL.createObjectURL(image);
    }
    console.log(categories)
    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div className="container mt-5 d-flex">
                {/* Form Section */}
                <div className="card shadow-sm" style={{ maxWidth: 600, width: '100%', borderRadius: 15, background: '#f8f9fa' }}>
                    <div className="card-body" style={{ padding: '20px' }}>
                        <h2 className="mb-4 text-center" style={{ fontFamily: 'Arial', color: '#343a40' }}>
                            Add a New Recipe
                        </h2>
                        <form onSubmit={onSubmitClick}>
                            {/* Title */}
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">
                                    Recipe Title
                                </label>
                                <input onChange={onRecipeChange} value={recipe.title} name="title" type="text" className="form-control" />
                            </div>
                            {/* Category */}
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">
                                    Category
                                </label>
                                <select onChange={onRecipeChange} value={recipe.category} name="category" className="form-select">
                                    <option value="-1">Select a category</option>
                                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>
                            {/* Ingredients */}
                            <div className="mb-3">
                                <label htmlFor="ingredients" className="form-label">
                                    Ingredients
                                </label>
                                {ingredients.map((i, index) =>
                                    <input key={index} onChange={e => onIngredientChange(e, index)} value={i} type="text" className="form-control mb-2" />
                                )}
                                <br></br>
                                <button onClick={onAddIngredientClick} type="button" className="btn btn-success">
                                    Add Ingredient
                                </button>
                            </div>
                            {/* Steps */}
                            <div className="mb-3">
                                <label htmlFor="steps" className="form-label">
                                    Steps
                                </label>
                                {steps.map((s, index) =>
                                    <textarea key={index} onChange={e => onStepChange(e, index)} value={s} className="form-control mb-2" rows="3"></textarea>
                                )}
                                <button onClick={onAddStepClick} type="button" className="btn btn-info">
                                    Add Step
                                </button>
                            </div>
                            {/* Image Upload */}
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">
                                    Upload Image
                                </label>
                                <input ref={fileRef} onChange={onFileChosen} type="file" className="form-control" />
                            </div>
                            {/* Image */}
                            {imageUrl && <img
                                src={imageUrl}
                                className="img-fluid mb-3"
                                style={{ maxHeight: '200px', borderRadius: '10px' }}
                            />}
                            {/* IsPublic */}
                            <div className="form-check mb-3">
                                <input onChange={onSharePublicCheck} className="form-check-input" type="checkbox" />
                                <label className="form-check-label" htmlFor="isPublic">
                                    Share this recipe publicly
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary w-100" style={{ marginTop: '10px' }}>
                                Add Recipe
                            </button>
                        </form>
                    </div>
                </div>
                <Recipe recipe={recipe}
                    ingredients={ingredients}
                    steps={steps}
                    imageUrl={imageUrl} />
            </div>
        </div>
    )
}

export default AddRecipe;