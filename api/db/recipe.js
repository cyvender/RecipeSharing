const sql = require('mssql/msnodesqlv8');

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
    await pool.query(`INSERT INTO Recipes (Title, Ingredients, Steps, ImageUrl, IsPublic, UserId, Category, CategoryId)
                    VALUES (${recipe.title}, ${recipe.ingredientsString}, ${recipe.stepsString}, ${recipe.fileName}, ${recipe.isPublic} , ${recipe.userId}, ${recipe.category}, ${recipe.categoryId})`);
    await sql.close();
};

// require('dotenv').config();
// const { Pool } = require('pg')

// console.log('loaded database_url:', process.env.DATABASE_URL ) //debug
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

// const addRecipe = async recipe => {
//     await pool.query(`INSERT INTO "Recipes" ("Title", "Ingredients", "Steps", "ImageUrl", "IsPublic", "UserId", "Category", "CategoryId")
//                     VALUES ('${recipe.title}', '${recipe.ingredientsString}', '${recipe.stepsString}', '${recipe.fileName}', ${recipe.isPublic === 1}, ${recipe.userId}, '${recipe.category}', ${recipe.categoryId})`);
// };
// const addRecipe = async recipe => {
//     const client = await pool.connect();
//     const query = `INSERT INTO "Recipes" ("Title", "Ingredients", "Steps", "ImageUrl", "IsPublic", "UserId", "Category", "CategoryId")
//                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
//     const values = [
//         recipe.title,
//         recipe.ingredientsString,
//         recipe.stepsString,
//         recipe.fileName,
//         recipe.isPublic,
//         recipe.userId,
//         recipe.category,
//         recipe.categoryId
//     ];
//     await client.query(query, values);
//     client.release();
// };



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

const getCategoriesAndCounts = async () => {
    await sql.connect(config);
    const { recordset } = await sql.query`SELECT c.*, COUNT(r.Id) AS 'RecipeCount'
                                        FROM Categories c
                                        LEFT JOIN Recipes r ON r.CategoryID = c.Id
                                        GROUP BY c.Name, c.Id`;
    await sql.close();
    return recordset;
}

module.exports = { addCategory, getCategories, addRecipe, getRecipes, getCategoriesAndCounts };