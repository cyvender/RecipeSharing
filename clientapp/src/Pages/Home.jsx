import { useState, useEffect } from 'react';
import { useAuth } from '../Context';
import axios from 'axios';
import Recipe from '../components/Recipe'

function Home() {
    const { user } = useAuth();
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        const getRecipes = async () => {
            const { data } = await axios.get('/api/recipe/getrecipes');
            console.log(data);
            data.forEach(r => r.ingredients = JSON.parse(r.ingredients));
            data.forEach(r => r.steps = JSON.parse(r.steps));

            user && setRecipes(data);
            !user && setRecipes(data.filter(r => r.isPublic === true))
        }
        getRecipes();
    }, [])

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div className="container mt-5" style={{ backgroundColor: 'rgb(245, 245, 245)', padding: '20px', borderRadius: '10px' }}>
                <div className="jumbotron bg-light p-5 rounded-lg mb-4 shadow">
                    <h1 className="display-4">Welcome to Recipe Sharing App!</h1>
                    <p className="lead">Explore the most delicious recipes shared by our community. Share your own recipes and get inspired by others!</p>
                    <hr className="my-4" />
                    <p>Here are some of the latest recipes:</p>
                </div>
                <div className="row">
                    {recipes && recipes.map(r =>
                        <Recipe key={r.id}
                            recipe={r}
                            ingredients={r.ingredients}
                            steps={r.steps}
                            imageUrl={r.imageUrl}
                            isPreview={false} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home;
