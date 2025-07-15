import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

function Categories() {

    const [name, setName] = useState('');

    const onAddClick = async () => {
        await axios.post('api/recipe/addcategory', {name} )
    }

    console.log(name)
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
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Cakes
                        <span className="badge bg-primary rounded-pill">2</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Meats
                        <span className="badge bg-primary rounded-pill">0</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Junkfood
                        <span className="badge bg-primary rounded-pill">1</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Categories;