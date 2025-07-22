import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Context = createContext();

const ContextComponent = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        setIsLoading(true);
        const { data } = await axios.get('/api/recipe/getcategories');
        console.log("category data:", data)
        setCategories(data);
        setIsLoading(false);
    }

    useEffect(() => {
        const loadUser = async () => {
            const { data } = await axios.get('/api/account/getcurrentuser');
            setUser(data);
            setIsLoading(false);
        }
        getCategories();
        loadUser();
    }, []);

    if (isLoading) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ marginBottom: '20px' }} />
                <h1>Loading....</h1>
            </div>
        )
    }

    console.log(categories)
    console.log("user:", user)
    return (
        <Context.Provider value={{ user, setUser, categories, getCategories }}>
            {children}
        </Context.Provider>
    )

}

const useAuth = () => useContext(Context);

export { ContextComponent, useAuth };