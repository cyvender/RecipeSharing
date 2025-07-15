const sql = require('mssql/msnodesqlv8');
const camelCaseDeep = require('camelcase-object-deep');

const config = {
    database: 'RecipeSharing',
    server: '.\\sqlexpress',
    driver: 'msnodesqlv8',
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }
}

const addRecipe = async recipe => {
    await sql.connect(config);
    await sql.query`INSERT INTO Recipes (Title, Ingredients, Steps, ImageUrl, IsPublic, UserId, Category)
                    VALUES (${recipe.title}, ${recipe.ingredientsString}, ${recipe.stepsString}, ${recipe.fileName}, ${recipe.isPublic} , 1, ${recipe.category})`;
    await sql.close();
};
const addCategory = async category => {
    await sql.connect(config);
    await sql.query`INSERT INTO Categories (Name) VALUES(${category.name})`;
    await sql.close();
}

const getRecipes = async () => {
    await sql.connect(config);
    const { recordset } = await sql.query`SELECT * FROM Recipes`;
    await sql.close();
    return recordset;
}

const getCategories = async () => {
    await sql.connect(config);
    const { recordset } = await sql.query`SELECT * FROM Categories`;
    await sql.close();
    return recordset;
}

module.exports = { addCategory, getCategories, addRecipe, getRecipes };