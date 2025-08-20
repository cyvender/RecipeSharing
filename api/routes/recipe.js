const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs').promises;
const db = require('../db/recipe.js');
const { ensureAuthenticated } = require('../auth');

async function writeBase64ToFile(base64String) {
    const commaIndex = base64String.indexOf(',');
    const base64Data = base64String.substring(commaIndex + 1);
    const buffer = Buffer.from(base64Data, 'base64');
    const fileName = `${uuidv4()}.jpg`;
    const filePath = path.join('images', fileName);
    await fs.writeFile(filePath, buffer);
    return fileName;
} 

// router.post('/addrecipe', ensureAuthenticated, async (req, res) => {
//     const { base64data } = req.body;
//     const fileName = await writeBase64ToFile(base64data);
//     req.body.fileName = fileName;
//     await db.addRecipe(req.body);
//     res.json({ status: 'ok' })
// });

//testing postgreSQL
router.post('/addrecipe', ensureAuthenticated, async (req, res) => {
    const { base64data } = req.body;
    const fileName = await writeBase64ToFile(base64data);
    req.body.fileName = fileName;
    await db.addRecipe(req.body);
    res.json({ status: 'ok' })
});

router.post('/addcategory', ensureAuthenticated, async (req, res) => {
    await db.addCategory(req.body);
    res.json({ status: 'ok' });
}); 

router.get('/getrecipes', async (req, res) => {
    res.json(await db.getRecipes());
})

router.get('/getcategories', async (req, res) => {
    res.json(await db.getCategories());
});

router.get('/getcategoriesandcounts', ensureAuthenticated,  async (req, res) => {
    res.json(await db.getCategoriesAndCounts());
});

router.get('/image/:name', async (req, res) => {
    const fileName = req.params.name;
    const filePath = path.join(__dirname, '../images', fileName);
    res.sendFile(filePath);
});

module.exports = router;