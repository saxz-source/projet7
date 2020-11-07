const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.DATABASE_H,
    user: process.env.DATABASE_U,
    password: process.env.DATABASE_P,
    database: process.env.DATABASE
});

const fs = require('fs')

// Ajout d'un post, route POST
exports.addPost = (req, res) => {
    if (req.body.mediaInfos) {
        JSON.parse(req.body.mediaInfos);
        const [title, category] = req.body.mediaInfos
        if (!title || !category) return res.status(400).json({ message: "" })
    };
    if (!req.body.mediaInfos) {
        const { title, content, category } = req.body;
        if (!title || !content || !category) return res.status(400).json({ message: "" })
    };

    let mediaObject;
    req.file ? mediaObject = {
        ...JSON.parse(req.body.mediaInfos),
        id_author: req.user,
        media: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } :
        mediaObject = {
            ...req.body,
            id_author: req.user
        };

    db.query("INSERT INTO posts SET ?", { ...mediaObject }, (error, result) => {
        if (error) res.status(400).json({ message: error })
        res.status(201).json({ message: "post archivé" })
    })
};


// MODIF de posts route PUT
exports.modifyPostContent = (req, res) => {
  
    if (req.body.mediaInfos) {
        JSON.parse(req.body.mediaInfos);
        const [title, category] = req.body.mediaInfos
        if (!title || !category) return res.status(400).json({ message: "" })
    };
    if (!req.body.mediaInfos) {
        const { title, content, category } = req.body;
        if (!title || !content || !category) return res.status(400).json({ message: "" })
    };

    let mediaObject;
    req.file ? mediaObject = {
        ...JSON.parse(req.body.mediaInfos),
        id_author: req.user,
        media: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } :
        mediaObject = {
            ...JSON.parse(req.body.mediaInfos),
            id_author: req.user
        };

    db.query("UPDATE posts SET ? WHERE id = ?", [{ ...mediaObject }, mediaObject.id], (error, result) => {
        if (error) res.status(400).json({ message: error })
        res.status(200).json({ message: "post archivé" })
    })
}


// GET tous les posts
exports.getAllPosts = (req, res) => {
    let pageNumber = req.query.page
    let limit = 10
    let offset = (pageNumber - 1) * 10
    db.query("SELECT posts.id, posts.id_author, DATE_FORMAT(posts.date, 'Posté le %d/%m/%y, %H:%i') AS date, posts.title, posts.content, posts.media, posts.comments_number, posts.visibility, users.fullName FROM posts INNER JOIN users ON id_author = users.id ORDER BY posts.id DESC LIMIT ? OFFSET ?", [limit, offset], (error, result) => {
        if (error) res.status(500).json({ message: error })
        let userId = req.user;
        let role = req.role;
        res.status(200).json({ result, userId, role })
    })
};
  
 
// GET media posts
exports.getMediaPost = (req, res) => {
    let pageNumber = req.query.page
    let limit = 10
    let offset = (pageNumber - 1) * 10
    db.query("SELECT posts.id, posts.id_author, DATE_FORMAT(posts.date, 'Posté le %d/%m/%y à %H:%i') AS date, posts.title, posts.media, posts.comments_number, posts.visibility, users.fullName FROM posts INNER JOIN users ON id_author = users.id WHERE posts.category = 'media' ORDER BY posts.id DESC LIMIT ? OFFSET ?", [limit, offset], (error, result) => {
        if (error) res.status(500).json({ message: error })
        let userId = req.user;
        let role = req.role;
        res.status(200).json({ result, userId, role })
    })
};


// GET text posts
exports.getTextPost = async (req, res) => {
    let pageNumber = req.query.page
    let limit = 10
    let offset = (pageNumber - 1) * 10
    db.query("SELECT posts.id, posts.id_author, DATE_FORMAT(posts.date, 'Posté le %d/%m/%y à %H:%i') AS date, posts.title, posts.content, posts.media, posts.comments_number, posts.visibility, users.fullName FROM posts INNER JOIN users ON id_author = users.id WHERE posts.category = 'textContent' ORDER BY posts.id DESC LIMIT ? OFFSET ?", [limit, offset], (error, result) => {
        if (error) res.status(500).json({ message: error })
        let userId = req.user;
        let role = req.role;
        res.status(200).json({ result, userId, role })
    })
};

// GET les publications d'un seul membre
exports.getPersonPost = (req, res) => {
    if (isNaN(req.params.id)) return res.status(404).json({ message: "pas d'article" })
    let pageNumber = req.query.page
    let limit = 10
    let offset = (pageNumber - 1) * 10
    db.query("SELECT posts.id, posts.id_author, DATE_FORMAT(posts.date, '%d/%m/%y, %H:%i') AS date, posts.title, posts.content, posts.media, posts.comments_number, posts.visibility, users.fullName FROM posts INNER JOIN users ON posts.id_author = users.id WHERE id_author = ? ORDER BY date DESC LIMIT ? OFFSET ?", [req.params.id, limit, offset], (error, result) => {
        if (error) res.status(400).json({ message: error })
        if (result.length<1) return res.status(200).json({ message: "pas de publications supplémentaires à afficher" })
        let userId = req.user;
        let role = req.role;
        res.status(200).json({ result, userId, role })
    })
}



// GET ONE POST avec ses commentaires
exports.getOnePost = (req, res) => {
    if (isNaN(req.params.id)) return res.status(404).json({ message: "pas d'article" })
    db.query("SELECT posts.id_author, posts.id, DATE_FORMAT(posts.date, 'Posté le %d/%m/%y à %H:%i') AS date, posts.title, posts.content, posts.media, posts.visibility, users.fullName FROM posts INNER JOIN users ON id_author = users.id WHERE posts.id = ? ORDER BY date DESC", [req.params.id], (error, result) => {
        if (error) return res.status(500).json({ message: error })
        if (result.length<1) return res.status(404).json({ message: "pas d'article" })
        let userId = req.user;
        let role = req.role;
        return res.status(200).json({ result, userId, role })
    })
}


// GET COMMENTAIRES selon l'article
exports.getComments = (req, res) => {
    let role = req.role
    db.query("SELECT comments.id, comments.id_commentAuthor, comments.comment_content, comments.visibility, DATE_FORMAT(comments.date, 'Posté le %d/%m/%y à %H:%i') as date, posts.comments_number, users.fullName FROM comments INNER JOIN posts ON id_post = posts.id INNER JOIN users ON id_CommentAuthor = users.id WHERE posts.id = ? ORDER BY comments.date DESC", [req.params.id], async (error, result) => {
        if (error) res.status(500).json({ message: error })
        let userId = req.user
        await res.status(200).json({ result, userId, role })
    })
}


// Ajout de COMMENTAIRE, route POST
exports.addComment = (req, res, next) => {
    const { comment_content, id_post } = req.body;
    let id_CommentAuthor = req.user;
    if (!comment_content || !id_post) return res.status(400).json({ message: "" });
    db.query("INSERT INTO comments SET ?", { comment_content, id_post, id_CommentAuthor }, (error, result) => {
        if (error) res.status(500).json({ message: error })
        res.status(201).json({ message: "commentaire enregistré" })
    })
}


//MODIF post route PUT
exports.modifyPostNbComments = (req, res) => {
    let { id_post, comments_number, operation } = req.body;
    if (!comments_number) comments_number = 0;
    if (!id_post) return res.status(400).json({ message: "pas d'id_post" });
    if (!operation) return res.status(400).json({ message: "pas d'opération" });
    if (operation === "add") comments_number++;
    if (operation === "decrement") comments_number--;
    db.query("UPDATE posts SET ? WHERE id = ?", [{ comments_number }, id_post], (error, result) => {
        if (error) res.status(500).json({ message: error })
        res.status(200).json({ message: "ok" })
    })
}

//MODIF commentaire route PUT
exports.modifyComment = (req, res) => {
    db.query("SELECT * FROM comments WHERE id = ?", [req.params.id], (error, result) => {
        if (error) res.status(500).json({ message: error })
        db.query("UPDATE comments SET ? WHERE id = ?", [{ comment_content: req.body.comment_content }, req.params.id], (error, result) => {
            if (error) res.status(500).json({ message: error })
            res.status(200).json({ message: "modif comment ok" })
        })
    })
}

//MODIF VISIBILITE commentaire, route PUT
exports.modifyVisibleComment = (req, res) => {
    db.query("SELECT * FROM comments WHERE id = ?", [req.params.id], (error, result) => {
        if (error) res.status(500).json({ message: error })
        let { visibility } = req.body;
        if (visibility === 1) { visibility++ }
        else if (visibility === 2) { visibility-- }

        db.query("UPDATE comments SET ? WHERE id = ?", [{ visibility }, req.params.id], (error, result) => {
            if (error) res.status(400).json({ message: error })
            res.status(200).json({ message: "modif comment ok" })
        })
    })
}

//MODIF VISIBILITE post, route PUT
exports.modifyVisiblePost = (req, res) => {
    const { id } = req.body;
    db.query("SELECT * FROM posts WHERE id = ?", [id], (error, result) => {
        if (error) res.status(500).json({ message: error })
        let { visibility } = req.body;
        if (visibility === 1) { visibility++ }
        else if (visibility === 2) { visibility-- }

        db.query("UPDATE posts SET ? WHERE id = ?", [{ visibility }, id], (error, result) => {
            if (error) res.status(400).json({ message: error })
            res.status(200).json({ message: "modif post ok" })
        })
    })
}


// DELETE post route DELETE
exports.deletePost = (req, res) => {
    db.query("SELECT media FROM posts WHERE id = ?", [req.body.id], async (error, result) => {
        try {
            if (error) res.status(500).json({ message: error });
            if (result[0].media) {
                const filename = result[0].media.split('/images/')[1];
                fs.unlink(`./images/${filename}`, () =>
                    db.query("DELETE FROM posts WHERE id = ? ", [req.body.id], (error, result) => {
                        if (error) res.status(500).json({ message: error })
                        return res.status(200).json({ message: "delete ok" })
                    }))
            } else {
                db.query("DELETE FROM posts WHERE id = ? ", [req.body.id], (error, result) => {
                    if (error) res.status(500).json({ message: error })
                    return res.status(200).json({ message: "delete ok" })
                })
            }
        }
        catch { console.log("bug sur le delete") }
    })
};


//DELETE comment route DELETE
exports.deleteComment = (req, res) => {
    db.query("DELETE FROM comments WHERE id = ?", [req.body.id], (error, result) => {
        if (error) res.status(500).json({ message: error })
        res.status(200).json({ message: "delete ok" })
    })
}

