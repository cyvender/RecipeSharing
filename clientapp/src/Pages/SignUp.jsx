import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignupClick = async e => {
        e.preventDefault();
        await axios.post('/api/account/signup', { email, password });
        navigate('/login');
    }

    console.log(email, password)
    return (
        <div className="row" style={{minHeight: '80vh', display: 'flex', alignItems: 'center'}}>
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                <h3>Sign up for a new account</h3>
                <form>
                    <input type="text" placeholder="First Name" className="form-control" /><br />
                    <input type="text" placeholder="Last Name" className="form-control" /><br />
                    <input onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder="Email" className="form-control" /><br />
                    <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" className="form-control" /><br />
                    <button onClick={onSignupClick} className="btn btn-primary">Signup</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
