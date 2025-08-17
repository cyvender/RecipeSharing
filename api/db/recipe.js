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

// const addRecipe = async recipe => {
//     await sql.connect(config);
//     await pool.query(`INSERT INTO Recipes (Title, Ingredients, Steps, ImageUrl, IsPublic, UserId, Category, CategoryId)
//                     VALUES (${recipe.title}, ${recipe.ingredientsString}, ${recipe.stepsString}, ${recipe.fileName}, ${recipe.isPublic} , ${recipe.userId}, ${recipe.category}, ${recipe.categoryId})`);
//     await sql.close();
// };

require('dotenv').config();
const { Pool } = require('pg')

console.log('loaded database_url:', process.env.DATABASE_URL ) //debug
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// const addRecipe = async recipe => {
//     await pool.query(`INSERT INTO "Recipes" ("Title", "Ingredients", "Steps", "ImageUrl", "IsPublic", "UserId", "Category", "CategoryId")
//                     VALUES ('${recipe.title}', '${recipe.ingredientsString}', '${recipe.stepsString}', '${recipe.fileName}', ${recipe.isPublic === 1}, ${recipe.userId}, '${recipe.category}', ${recipe.categoryId})`);
// };
const addRecipe = async recipe => {
    const client = await pool.connect();
    const query = `INSERT INTO "Recipes" ("Title", "Ingredients", "Steps", "ImageUrl", "IsPublic", "UserId", "Category", "CategoryId")
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    const values = [
        recipe.title,
        recipe.ingredientsString,
        recipe.stepsString,
        recipe.fileName,
        recipe.isPublic,
        recipe.userId,
        recipe.category,
        recipe.categoryId
    ];
    await client.query(query, values);
    client.release();
};



const addCategory = async category => {
    const client = await pool.connect();
    const query = `INSERT INTO "Categories" ("Name")
                    VALUES ($1)`;
    const values = [
        category.name
    ];
    await client.query(query, values);
    client.release();
}

const getRecipes = async () => {
    const client = await pool.connect();
    const { rows } = await client.query(`SELECT * FROM "Recipes"`);
    client.release();
    return rows;
}

const getCategories = async () => {
    const client = await pool.connect();
    const { rows } = await client.query(`SELECT * FROM "Categories"`);
    client.release();
    return rows;
}

const getCategoriesAndCounts = async () => {
    const client = await pool.connect();
    const { rows } = await client.query(`SELECT c.*, COUNT(r."Id") AS "RecipeCount"
                                        FROM "Categories" c
                                        LEFT JOIN "Recipes" r ON r."CategoryId" = c."Id"
                                        GROUP BY c."Name", c."Id"`);
    client.release();
    return rows;
}

module.exports = { addCategory, getCategories, addRecipe, getRecipes, getCategoriesAndCounts };