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

module.exports = router;
