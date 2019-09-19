const express = require('express');
const router = express.Router();
const ArticlesController = require('../controllers/ArticlesController');

router.post(
	'/',
	ArticlesController.createArticle
);

router.get(
	'/',
	ArticlesController.getArticlesWithCategories
);

router.put(
	'/:id',
	ArticlesController.updateArticle
);

router.delete(
	'/:id',
	ArticlesController.deleteArticle
);
module.exports = router;
