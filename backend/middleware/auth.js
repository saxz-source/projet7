const webtoken = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = webtoken.verify(token, process.env.SECRET_J);
        const userId = decodedToken.userId;

        if (req.body.userId && req.body.userId !== userId) {
            throw 'Id utilisateur non valide';

        } else {
            next();
        };
    }
    catch (error) {
        res.status(401).json({ error: error| 'Requete non identifiée' });
    }
};