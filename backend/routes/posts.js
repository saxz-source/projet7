const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const multer = require('../middleware/multer-config');
const secure = require("../middleware/secure");
const privilege = require("../middleware/privileges")

router.get("/user/:id", secure, privilege, postsCtrl.getPersonPost);
router.get('/media', secure, privilege, postsCtrl.getMediaPost);
router.get('/text', secure, privilege, postsCtrl.getTextPost);
router.get('/:id/', secure, privilege, postsCtrl.getOnePost);
router.post('', secure, multer, postsCtrl.addPost);
router.get('', secure, privilege, postsCtrl.getAllPosts);
router.put("/mod", secure, postsCtrl.modifyVisiblePost);
router.put('/m', secure, multer, postsCtrl.modifyPostContent); 
router.put('', secure, postsCtrl.modifyPostNbComments );
router.delete('', secure, postsCtrl.deletePost);

router.get('/comments/:id', secure, privilege, postsCtrl.getComments);
router.post('/comment', secure, postsCtrl.addComment);
router.put('/comment/mod/:id', secure, postsCtrl.modifyVisibleComment);
router.put('/comment/:id', secure, postsCtrl.modifyComment);
router.delete('/comment',secure, postsCtrl.deleteComment);





 

module.exports = router;