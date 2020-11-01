const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.DATABASE_H,
    user: process.env.DATABASE_U,
    password: process.env.DATABASE_P,
    database: process.env.DATABASE
});


module.exports = (req, res, next) => {

    //console.log(req.user)
    const selectRole = (id, callback) => {
        db.query("SELECT role FROM users WHERE id = ?", [id], (error, results) => {
            //console.log(results)
            if (error || results.length < 1) console.log("error")
            role = results[0].role
            return callback(results[0].role)
        })
    }
    let role;
    selectRole(req.user, function (theRole) {
        role = theRole
        req.role = role
        //console.log(role)
        next();
    });

}
