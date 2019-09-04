const express = require('express');
const router = express.Router();
const ArticlesController = require('../controllers/ArticlesController');

router.post(
	'/',
	ArticlesController.createArticle
);

module.exports = router;
