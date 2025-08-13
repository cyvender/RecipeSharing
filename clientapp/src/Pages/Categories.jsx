import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

function Categories() {

    const [name, setName] = useState('');
    const [categoriesAndCounts, setCategoriesAndCounts] = useState([]);

    useEffect(() => {
        const getCategoriesAndCounts = async () => {
            const { data } = await axios.get('/api/recipe/getcategoriesandcounts');
            console.log("category data:", data)
            setCategoriesAndCounts(data);
        }
        getCategoriesAndCounts();
    }, [])

    const onAddClick = async () => {
        await axios.post('api/recipe/addcategory', { name })
    }


    console.log(categoriesAndCounts)
    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div className="container mt-5" style={{ maxWidth: '600px' }}>
                <h2 className="mb-4 text-center">Categories</h2>
                <form className="mb-4">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Add new category"
                            onChange={e => setName(e.target.value)}
                            value={name}
                        />
                        <button onClick={onAddClick} type="submit" className="btn btn-primary">
                            Add
                        </button>
                    </div>
                </form>
                <ul className="list-group shadow-sm">
                    {categoriesAndCounts.map(c =>
                        <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {c.name}
                            <span className="badge bg-primary rounded-pill">{c.recipeCount}</span>
                        </li>
                    )}
                </ul>
            </div>
        </div >
    );
}

export default Categories;