import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

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
        return <h1>Loading....</h1>
    }

    console.log(categories)
    console.log("user:", user)
    return (
        <Context.Provider value={{ user, setUser, categories, setCategories, getCategories }}>
            {children}
        </Context.Provider>
    )

}


const useAuth = () => useContext(Context);


export { ContextComponent , useAuth };