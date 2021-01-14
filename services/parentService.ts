import { Model, Document, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'

const getOne = <T extends Document>(model: Model<T>) => (filter: FilterQuery<T>) => new Promise((resolve, reject) => {
	model.findOne(filter).lean().exec()
		.then((doc) => {
			if (!doc) reject(new Error('Empty document'));
			resolve(doc);
		})
		.catch((e) => reject(e));
});

const getAll = <T extends Document>(model: Model<T>) => new Promise((resolve, reject) => {
	model.find({}).lean().exec()
		.then((docs) => {
			if (!docs) reject(new Error('Empty documents'));
			resolve(docs);
		})
		.catch((e) => reject(e));
});

const createOne = <T extends Document>(model: Model<T>) => (data: T) => new Promise((resolve, reject) => {
	model.create(data)
		.then((doc) => {
			if (!doc) reject(new Error('Something went wrong'));
			resolve(doc);
		})
		.catch((e) => reject(e));
});

const deleteOne = <T extends Document>(model: Model<T>) => (filter: FilterQuery<T>) => new Promise((resolve, reject) => {
	model.findOneAndDelete(filter).lean().exec()
		.then((removed) => {
			if (!removed) reject(new Error('An error occured'));
			resolve(removed);
		})
		.catch((e) => reject(e));
});

const updateOne = <T extends Document>(model: Model<T>) => (filter: FilterQuery<T>, data: UpdateQuery<T>, options?: QueryOptions) => new Promise((resolve, reject) => {
	model.updateOne(filter, data, options).lean().exec()
		.then((updated) => {
			if (!updated) {
				reject(new Error('An error occured'));
			}
			resolve(updated);
		})
		.catch((e) => reject(e));
});

export default <T extends Document>(model: Model<T>) => ({
	getOne: getOne(model),
	getAll,
	createOne: createOne(model),
	updateOne: updateOne(model),
	deleteOne: deleteOne(model),
});