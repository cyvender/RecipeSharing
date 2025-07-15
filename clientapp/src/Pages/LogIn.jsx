import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context';

const Login = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '1', password: '1' });
    const [isValidLogin, setIsValidLogin] = useState(true);
    const { setUser } = useAuth();

    const onFormSubmit = async e => {
        e.preventDefault();
        const { data } = await axios.post('/api/account/login', formData);
        const isValid = Boolean(data);
        setIsValidLogin(isValid);
        if (isValid) {
            setUser(data);
            navigate('/');
        }
    }

    const onTextChange = e => {
        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }

    return (
        <div className="row" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                <h3>Log in to your account</h3>
                <form>
                    <input onChange={onTextChange} value={formData.email} name="email" type="text" placeholder="Email" className="form-control" /><br />
                    <input onChange={onTextChange} value={formData.password} name="password" type="password" placeholder="Password" className="form-control" /><br />
                    <button onClick={onFormSubmit} className="btn btn-primary">Login</button><br />
                    <Link to='/signup'>Sign up for new account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login;
