
const Sequelize = require('sequelize');

exports.insertValues = function(values, modelName) {
    const Model = require('../models/'+ modelName);
    return new Promise((resolve, reject) => {
		Model
      		.create(values)
			.then((result) => resolve({result: result._options.isNewRecord, record: result.dataValues}))
			.catch((err) => reject(err));
	});
};

exports.updateValues = function(values, anyWhere, modelName) {
    const Model = require('../models/'+ modelName);
    return new Promise((resolve, reject) => {
		Model
      		.update(values, { where: anyWhere })
			.then((result) => resolve({result: result[0] == 1 ? true : false}))
			.catch((err) => reject(err));
	});
};

exports.destroyValues = function(anyWhere, modelName) {
    const Model = require('../models/'+ modelName);
    return new Promise((resolve, reject) => {
		Model
            .destroy({where: anyWhere})
			.then((result) => resolve({result: result > 0 ? true : false}))
			.catch((err) => reject(err));
	});
};

exports.fetch = function(findAll, anyField, anyWhere, orderBy, groupBy, modelName) {
	if (!Array.isArray(anyField)) {
		console.error('Value must contain an array.');
		anyField = false;
	}else{
		anyField = anyField;
	}

	if (anyWhere === false) {
		anyWhere = '';
	}else{
		anyWhere = anyWhere;
	}

	if (orderBy === false) {
		orderBy = '';
	}else{
		orderBy = orderBy;
	}

	if (groupBy === false) {
		groupBy = '';
	}else{
		groupBy = groupBy;
	}

	if (modelName == '' || modelName == null) {
		console.log('Model needed and not found.');
		process.exit();
	}else{
		modelName = modelName;
	}

	const Model = require('../models/'+ modelName);
	if (!findAll) {
		return new Promise((resolve, reject) => {
			Model
				.findOne({
					attributes: anyField,
					where: anyWhere,
					order: orderBy,
					group : groupBy
				  })
				.then((result) => resolve({
					result: result !== null ? true : false,
					joinFind : 'Fetch One',
					dataValues: result,
				}))
				.catch((err) => reject(err));
			});
	}else{
		return new Promise((resolve, reject) => {
		Model
            .findAll({
				attributes: anyField,
				where: anyWhere,
				order: orderBy,
				group : groupBy
			  })
			.then((result) => resolve({
				result: result.length > 0 ? true : false,
				joinFind : 'Fetch All',
				dataValues: result
			}))
			.catch((err) => reject(err));
		});
	}
};

exports.fetchJoins = function(findAll, anyField, anyWhere, orderBy, groupBy, modelName, modelJoins) {
	if (!Array.isArray(anyField)) {
		console.error('The value must contain the specified array and object.');
		process.exit();
	}else{
		anyField = anyField;
	}

	if (anyWhere === false) {
		anyWhere = '';
	}else{
		anyWhere = anyWhere;
	}

	if (orderBy === false) {
		orderBy = '';
	}else{
		orderBy = orderBy;
	}

	if (groupBy === false) {
		groupBy = '';
	}else{
		groupBy = groupBy;
	}

	if (modelName == '' || modelName == null) {
		console.log('Model needed and not found.');
		process.exit();
	}else{
		modelName = modelName;
	}

	if (!Array.isArray(modelJoins)) {
		console.log('model join selected harus array');
		process.exit();
	}else{
		modelJoins = modelJoins;
	}

	let includes = [];
	for (let join_number = 0; join_number < modelJoins.length; join_number++) {
		let include_object = {};

		const ModelOne = require('../models/'+ modelJoins[join_number][0].fromModel);
		const ModelTwo = require('../models/'+ modelJoins[join_number][0].toModel);
		if (modelJoins[join_number][0].bridgeType === 'hasMany') {
			ModelOne.hasMany(ModelTwo, {foreignKey:modelJoins[join_number][0].toKey})
		}else if (modelJoins[join_number][0].bridgeType === 'belongsTo') {
			ModelOne.belongsTo(ModelTwo, {foreignKey:modelJoins[join_number][0].fromKey})
		}else{
			ModelOne.hasOne(ModelTwo, {foreignKey:modelJoins[join_number][0].toKey})
		}

		let where_object = {};
		where_object[modelJoins[join_number][0].toKey] = Sequelize.col(modelJoins[join_number][0].fromKey);

		let required = modelJoins[join_number][0].required;
		include_object['attributes'] = modelJoins[join_number][0].attributes;
		include_object['model'] = ModelTwo;
		include_object['where'] = where_object;
		include_object['required'] = required;
		
		includes.push(include_object);
	}

	const Model = require('../models/'+ modelName);
	
	if (!findAll) {
		return new Promise((resolve, reject) => {
			Model
				.findOne({
					attributes: anyField,
					include: includes,
					where: anyWhere,
					order: orderBy,
					group : groupBy
				})
				.then((result) => resolve({
					result: result !== null ? true : false,
					joinFind : 'Fetch One',
					dataValues: result === null ? [] : result
				}))
				.catch((err) => reject(err));
		});
	}else{
		return new Promise((resolve, reject) => {
			Model
				.findAll({
					attributes: anyField,
					where: anyWhere,
					include: includes,
					order: orderBy,
					group : groupBy
				})
				.then((result) => resolve({
					result: result !== null ? true : false,
					joinFind : 'Fetch All',
					dataValues: result === null ? [] : result
				}))
				.catch((err) => reject(err));
		});
	}
};