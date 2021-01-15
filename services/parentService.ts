import { Model, Document, FilterQuery, QueryOptions, UpdateQuery, CreateDocumentDefinition } from 'mongoose'

const getOne = <T extends Document>(model: Model<T>) => {(filter: FilterQuery<T>) => new Promise<T>((resolve, reject) => {
	model.findOne(filter).lean().exec()
		.then((doc: T) => {
			if (!doc) reject(new Error('Empty document'));
			resolve(doc);
		})
		.catch((e: any) => reject(e));
});}

const getAll = <T extends Document>(model: Model<T>) => new Promise<T>((resolve, reject) => {
	model
	.find({})
	.lean()
	.exec()
		.then((docs: T) => {
			if (!docs)
				reject(new Error('Empty documents'));
			resolve(docs);
		})
		.catch((e: any) => reject(e));
});

const createOne = <T extends Document, U>(model: Model<T>) => (data: U) => new Promise<T>((resolve, reject) => {
	model.create(data)
		.then((doc: T) => {
			if (!doc) reject(new Error('Something went wrong'));
			resolve(doc);
		})
		.catch((e: any) => reject(e));
});

const deleteOne = <T extends Document>(model: Model<T>) => (filter: FilterQuery<T>) => new Promise<T>((resolve, reject) => {
	model.findOneAndDelete(filter).lean().exec()
		.then((removed: T) => {
			if (!removed) reject(new Error('An error occured'));
			resolve(removed);
		})
		.catch((e: any) => reject(e));
});

const updateOne = <T extends Document>(model: Model<T>) => (filter: FilterQuery<T>, data: UpdateQuery<T>, options?: QueryOptions) => new Promise<T>((resolve, reject) => {
	model.findOneAndUpdate(filter, data, options).lean().exec()
		.then((updated: T) => {
			if (!updated) {
				reject(new Error('An error occured'));
			}
			resolve(updated);
		})
		.catch((e: any) => reject(e));
});

export default <T extends Document, U>(model: Model<T>) => ({
	getOne: getOne(model),
	getAll,
	createOne: createOne<T, U>(model),
	updateOne: updateOne(model),
	deleteOne: deleteOne(model),
});