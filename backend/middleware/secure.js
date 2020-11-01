const webtoken = require('jsonwebtoken');
const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.DATABASE_H,
    user: process.env.DATABASE_U,
    password: process.env.DATABASE_P,
    database: process.env.DATABASE
});

module.exports = async (req, res, next) => {

    let token;
    if (req.cookies) token = req.cookies.jwt;
    if (!token || token === "expiredtoken") {
        return res.status(401).json({status : 401,
            message: "can't see these things bro"
        })
    }

    const decodedToken = webtoken.verify(token, process.env.SECRET_J);
   // console.log(decodedToken)
    const userId = decodedToken.id;

    db.query("SELECT id, role FROM users WHERE id = ?", [userId] , (error, result) => {

        if (error) res.status(500).json({ error })
        if (result.length < 1) res.status(401).json({status : 401,
            message: "can't see these things bro"
        })
        const id = result[0].id
        if (id !== userId) res.status(401).json({status : 401,
            message: "can't see these things bro"
        })

    })
 
    req.user= userId;
  
    next();
}



