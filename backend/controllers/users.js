const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.DATABASE_H,
  user: process.env.DATABASE_U,
  password: process.env.DATABASE_P,
  database: process.env.DATABASE

});

const bcrypt = require('bcrypt');
const webtoken = require('jsonwebtoken');


// Fonctions
const verifNameRegex = (itemToVerif) => {
  var regexSecure = /[<>=#{}\[\]_+&|§]+/;
  if (regexSecure.test(itemToVerif)) return true
  return false
};


// AJOUT D UTILISATEUR, route POST
exports.signup = (req, res, next) => {
  //console.log(req.body);
  const { email, firstName, lastName, password, confirmPassword } = req.body;
  let requestError = [];
  if (!email) requestError.push("Email Invalide")
  if (!firstName && verifNameRegex(firstName)) requestError.push("Prénom Invalide")
  if (!lastName && verifNameRegex(lastName)) requestError.push("Nom Invalide")
  if (!password) requestError.push("Mot de passe Manquant")
  if (!confirmPassword) requestError.push("Mot de passe non confirmé")
  if (requestError.length !== 0) return res.status(400).json({ message: requestError });
  const fullName = firstName + " " + lastName;

  db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) => {
    if (error) return res.status(500).json({ error });
    let dataErr = [];
    // console.log(result)
    if (result.length > 0) dataErr.push("Adresse e-mail déjà utilisée")
    if (password !== confirmPassword) dataErr.push("Mots de passe différents")
    // console.log(dataErr)
    if (dataErr.length !== 0) return res.status(400).json({ message: dataErr })

    let hash = await bcrypt.hash(password, 10);

    db.query("INSERT INTO users SET ?", { email: email, firstName: firstName, lastName: lastName, fullName: fullName, password: hash }, (error, result) => {
      if (error) return res.status(500).json({ error });
      //console.log(result.insertId)
      const id = result.insertId;
      const token = webtoken.sign({ id: id }, process.env.SECRET_J, { expiresIn: process.env.SECRET_EXPIRES });
      let cookieOptions = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "production" ? true : false,
        httpOnly: process.env.NODE_ENV === "production" ? true : false,
      }
      res.cookie('jwt', token, cookieOptions);
      res.status(201).json({ message: "Utilisateur enregistré" })
    })
  });
};


// CONNEXION DE L UTILISATEUR, route POST
exports.login = async (req, res, next) => {

  let remainingTry = req.rateLimit.remaining;
  const writeJsonMessage = (leftTry) => {
    if (leftTry > 0) return `Email ou mot de passe incorrect. Il vous reste ${leftTry} essai(s).`
    return "Email ou mot de passe incorrect. Veuillez réessayer plus tard."
  }
  let jsonMessage = writeJsonMessage(remainingTry)

  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: jsonMessage })

    db.query("SELECT* FROM users WHERE email = ? ", [email], async (error, result) => {
      if (error) console.log(error);
      // console.log(result)
      if (result.length < 1 || !(await bcrypt.compare(password, result[0].password))) {
        res.status(401).json({ message: jsonMessage })
      } else {
        const id = result[0].id;
        const token = webtoken.sign({ id: id }, process.env.SECRET_J, { expiresIn: process.env.SECRET_EXPIRES });
        let cookieOptions = {
          expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 60 * 60 * 1000),
          secure: process.env.NODE_ENV === "production" ? true : false,
          httpOnly: process.env.NODE_ENV === "production" ? true : false,
        }
        res.cookie('jwt', token, cookieOptions);
        res.status(200).json({ userId: id, token })
      };
    });
  } catch (error) {
    return res.status(500).json({ error })
  };
}


// Déconnexion route GET
exports.logout = async (req, res) => {
  let cookieOptions = {
    expires: new Date(Date.now() + 3000),
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: process.env.NODE_ENV === "production" ? true : false,
  }
  res.cookie('jwt', 'expiredtoken', cookieOptions);
  res.status(200).json({ status: "success" })
}


//Récupérer les infos Users, route GET
exports.getUserHome = (req, res) => {
  db.query("SELECT * FROM users WHERE id = ?", [req.user], (error, result) => {
    if (error) res.status(500).json({ message: "probleme recherche user" })
    if (result.length === 1) {
      const { firstName, lastName, fullName, avatar } = result[0];
      res.status(200).json({ firstName, lastName, fullName, avatar });
    } else {
      res.status(500).json({ message: "probleme recherche user" })
    };
  })
};


// Modifier les infos User, route PUT
exports.modifyUser = (req, res) => {
  db.query("SELECT id FROM users WHERE id = ?", [req.user], (error, result) => {
    if (error) res.status(500).json({ error })
    if (result.length === 1) {
      const { firstName, lastName } = req.body;
      if (!firstName || verifNameRegex(firstName)) return res.status(400).json({ message: "erreur" });
      if (!lastName || verifNameRegex(lastName)) return res.status(400).json({ message: "erreur" });
      const fullName = firstName + " " + lastName;
      db.query("UPDATE users SET ? WHERE id = ?", [{ firstName, lastName, fullName }, req.user], (error, result) => {
        if (error) res.status(500).json({ error });
        res.status(200).json({ message: 'user modifié' })
      });

    } else {
      res.status(400).json({ message: error })
    };
  })
}


//Supprimer compte user route DELETE
exports.deleteUser = (req, res) => {
  db.query("DELETE FROM users WHERE id = ?", [req.user], (error, result) => {
    try {
      let cookieOptions = {
        expires: new Date(Date.now() + 3000),
        secure: process.env.NODE_ENV === "production" ? true : false,
        httpOnly: process.env.NODE_ENV === "production" ? true : false,
      }
      res.cookie('jwt', 'expiredtoken', cookieOptions);
      res.status(200).json({ message: "user supprimé" })
    } catch {
      res.status(400).json({ error });
    }
  })
};