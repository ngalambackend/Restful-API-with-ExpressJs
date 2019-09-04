const Sequelize = require('sequelize');
const ZSequelize = require('../libraries/ZSequelize');
const Op = require('sequelize').Op;

module.exports = {
    createArticle: async function(req, res){
        /* BODY */
        let categoryid = req.body.categoryid;
        let title = req.body.title;
        let body = req.body.body;

        /* VALIDATION */
        /* PARAMETER  */
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

		/* FETCH ZSequelize */
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

        /* PARAMETER */
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
    }
}