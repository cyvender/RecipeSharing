const sql = require('mssql/msnodesqlv8');
const camelCaseDeep = require('camelcase-object-deep');
const bcrypt = require('bcrypt');

const config = {
    database: 'RecipeSharing',
    server: '.\\sqlexpress',
    driver: 'msnodesqlv8',
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }
} 

const signup = async user => {
    const hash = await bcrypt.hash(user.password, 10);
    await sql.connect(config);
    await sql.query`INSERT INTO Users (Email, PasswordHash) VALUES(${user.email}, ${hash})`;
    await sql.close();
}

const login = async (email, password) => {

    await sql.connect(config);
    const { recordset } = await sql.query`SELECT * FROM Users WHERE Email = ${email}`;
    await sql.close();
    if(!recordset.length) {
        return null;
    }

    const user = camelCaseDeep(recordset[0]);
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    delete user.passwordHash;
    return isMatch ? user : null;
}

module.exports = { signup, login };