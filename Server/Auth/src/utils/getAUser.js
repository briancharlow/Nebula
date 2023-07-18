const mssql = require('mssql');
const config = require('../config/config')

async function getAUser(email) {

    let sql = await mssql.connect(config)
    if (sql.connected) {
        let results = await sql.request()
            .input("userEmail", email)
            .execute("GetUserByEmail")
        let user = results.recordset[0]
        console.log(results.recordset[0])

        return user
    }

}

module.exports = getAUser;