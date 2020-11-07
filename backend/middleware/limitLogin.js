const rateLimit = require("express-rate-limit");

const limitLogin = rateLimit({
    windowMs:30*1000,
    max:4,
    handler: (req, res) => {res.sendStatus(429)},

});

module.exports = limitLogin;