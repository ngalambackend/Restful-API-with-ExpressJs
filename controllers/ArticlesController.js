const ZSequelize = require('../libraries/ZSequelize');
const Op = require('sequelize').Op;

module.exports = {
    createArticle: async function(req, res){
        /* BODY */
        let categoryid = req.body.categoryid;
        let title = req.body.title;
        let body = req.body.body;

        /* VALIDATION */
        /* PARAMETER VALIDATION */
		let validationField = [
            'id'
        ];
		let validationWhere = {
			[Op.or]: [
                {title: title}, 
                {body: body}
            ]
		};

		let validationOrderBy = false;
		let validationGroupBy = false;
		let validationModel = 'ArticlesModel';

		/* FETCH Duplicate Data */
		let validationArticles = await ZSequelize.fetch(true, validationField, validationWhere, validationOrderBy, validationGroupBy, validationModel);

		if (validationArticles.dataValues.length > 0) {
			return res.status(409).json({
				result : false,
				data:{
					code: 409,
                    message: "Resource already exists."
				},
			});
        }

        /* PARAMETER ARTICLES*/
        let articleValue = {
            categoryid: categoryid,
            title: title,
            body: body
        };

        /* INSERT  */
        let articleResult = await ZSequelize.insertValues(articleValue, "ArticlesModel");

        /* RESPONSE */
        if (articleResult.result) {
            return res.status(201).json({
                result : articleResult.result,
                data: {
                    code: 201,
                    message: "Success create data.",
                    data: articleResult
                }
            });
        }else{
            return res.status(400).json({
                result : articleResult.result,
                data:{
                    code: 400,
                    message: "Failed create data."
                },
            });
        }
    },

    getArticlesWithCategories: async function(req, res){
       /* PARAMETER */
		let articlesField = [
            'id',
            'title',
            'body',
            'createdAt',
            'updatedAt',
        ];
		let articlesWhere = false;

		let articlesOrderBy = false;
		let articlesGroupBy = false;
		let articlesModel = 'ArticlesModel';
        let articlesJoins = [
            [
                {
                    'fromModel' : 'ArticlesModel',
                    'fromKey' : 'categoryid',
                    'bridgeType' : 'belongsTo',
                    'toModel' : 'CategoriesModel',
                    'toKey' : 'id',
                    'attributes' : ['id', 'name'],
                    'required': true
                }
            ],
            [
                {
                    'fromModel' : 'ArticlesModel',
                    'fromKey' : 'articles.id',
                    'bridgeType' : 'hasMany',
                    'toModel' : 'CommentsModel',
                    'toKey' : 'articleid',
                    'attributes' : ['id', 'body', 'createdAt'],
                    'required': false
                }
            ]
        ];
		let articlesResult = await ZSequelize.fetchJoins(
            true, 
            articlesField, 
            articlesWhere, 
            articlesOrderBy, 
            articlesGroupBy, 
            articlesModel, 
            articlesJoins);

		if (articlesResult.result) {
			return res.status(200).json({
				result : articlesResult.result,
				data:{
					code: 200,
                    message: "Success.",
                    articles: articlesResult.dataValues
				},
			});
        }else{
            return res.status(204).json({
				result : articlesResult.result,
				data:{
					code: 204,
                    message: "Failed."
				},
			});
        }
    },

    updateArticle: async function(req, res){
        /* PARAMS */
		let id = req.params.id;

		/* POST BODY */
        let categoryid = req.body.categoryid;
        let title = req.body.title;
        let body = req.body.body;

		/* PARAMETER ZSequelize  */
		/* PARAMETER ARTICLES*/
        let articleValue = {
            categoryid: categoryid,
            title: title,
            body: body
        };

		let articleWhere = {
			id: id
		};

		/* UPDATE ZSequelize */
		let articleResult = await ZSequelize.updateValues(articleValue, articleWhere, "ArticlesModel");
	
		 /* FETCTH RESULT & CONDITION & RESPONSE */
		if (articleResult.result) {
			return res.status(200).json({
				result : articleResult.result,
				data: {
					code: 200,
					message: "Success modify data."
				}
			});
		}else{
			return res.status(404).json({
				result : articleResult.result,
				data: {
					code: 404,
					message: "Voucher does not exist."
				},
			});
		}
    },

    deleteArticle: async function(req, res) {
		/* PARAMS */
		let id = req.params.id;
		
		/* PARAMETER ZSequelize  */
		let articleWhere = {
			id: id
		};

		/* DELETE ZSequelize */
		let articleResult = await ZSequelize.destroyValues(articleWhere, "ArticlesModel");

		/* FETCTH RESULT & CONDITION & RESPONSE */
		if (articleResult.result) {
			return res.status(200).json({
				result : articleResult.result,
				data: {
					code: 200,
					message: "Success delete data."
				}
			});
		}else{
			return res.status(404).json({
				result : articleResult.result,
				data:{
					code: 404,
					message: "Data does not exist."
				},
			});
		}
	}
}