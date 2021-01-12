import {Model, Document, FilterQuery} from 'mongoose'

const getOne = <T extends Document>(model: Model<T>) => (filter: FilterQuery<T>) => new Promise((resolve, reject) => {
	model.findOne(filter).lean().exec()
	  .then((doc) => {
		if (!doc) reject(new Error('Empty document'));
		resolve(doc);
	  })
	  .catch((e) => reject(e));
  });
  
  const getAll = <T extends Document> (model: Model<T>) => new Promise((resolve, reject) => {
	model.find({}).lean().exec()
	  .then((docs) => {
		if (!docs) reject(new Error('Empty documents'));
		resolve(docs);
	  })
	  .catch((e) => reject(e));
  });
  
  const createOne = <T extends Document>(model: Model<T>) => (data) => new Promise((resolve, reject) => {
	model.create(data)
	  .then((doc) => {
		if (!doc) reject(new Error('Something went wrong'));
		resolve(doc);
	  })
	  .catch((e) => reject(e));
  });
  
  const deleteOne = (model) => (filter) => new Promise((resolve, reject) => {
	model.findOneAndRemove(filter).lean().exec()
	  .then((removed) => {
		if (!removed) reject(new Error('An error occured'));
		resolve(removed);
	  })
	  .catch((e) => reject(e));
  });
  
  const updateOne = (model) => (filter, data, options) => new Promise((resolve, reject) => {
	model.findOneAndUpdate(filter, data, options).lean().exec()
	  .then((updated) => {
		if (!updated) {
		  reject(new Error('An error occured'));
		}
		resolve(updated);
	  })
	  .catch((e) => reject(e));
  });
  
  module.exports = (model) => ({
	getOne: getOne(model),
	getAll,
	createOne: createOne(model),
	updateOne: updateOne(model),
	deleteOne: deleteOne(model),
  });