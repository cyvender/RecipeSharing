import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faListDots, faUser } from '@fortawesome/free-solid-svg-icons';

const Recipe = ({ recipe, ingredients, steps, imageUrl }) => {
    console.log(imageUrl)
    return (
        <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100" style={{ borderRadius: '15px' }}>
                <div className="card-body d-flex flex-column" style={{ maxHeight: '500px', overflow: 'hidden' }}>
                    <h3 className="text-center" style={{ fontFamily: 'Arial, sans-serif', color: 'rgb(52, 58, 64)' }}>
                        {recipe.title}
                    </h3>
                    {imageUrl && <img src={`/api/recipe/image/${imageUrl}`} className="img-fluid" style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '10px',
                        objectFit: 'cover'
                    }}
                    />
                    }
                    <div style={{ flex: '1 1 auto', overflowY: 'auto' }}>
                        <p><strong>Category:</strong> {recipe.category}</p>
                        <p><strong>Ingredients:</strong></p>
                        {ingredients.map((ingredient, index) => <div key={index} className="mb-2">
                            <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#1b9c17d6', marginRight: '4px' }} />
                            {ingredient}
                        </div>
                        )}
                        <p><strong>Steps:</strong></p>
                        {steps.map((step, index) =>
                            <div key={index} className="mb-2">
                                <FontAwesomeIcon icon={faListDots} style={{ color: '#354edcd6', marginRight: '4px' }} />
                                {step}
                            </div>
                        )}
                        <p>
                            <strong>Public:</strong>{' '}
                            {!recipe.isPublic && <FontAwesomeIcon icon={faUser} style={{ color: 'red' }} />}
                            {recipe.isPublic && <FontAwesomeIcon icon={faUser} style={{ color: 'green' }} />}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recipe;