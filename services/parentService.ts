import { Model, Document, FilterQuery, QueryOptions, UpdateQuery, LeanDocumentOrArray } from 'mongoose'



const getOne = <T extends Document>(model: Model<T>) => (filter: FilterQuery<T>) => new Promise<LeanDocumentOrArray<T>>((resolve, reject) => {
	model.findOne(filter).lean().exec()
		.then((doc: LeanDocumentOrArray<T>) => {
			if (!doc) reject(new Error('Document does not exist'));
			resolve(doc);
		})
		.catch((e: any) => reject(e));
});


const getMany = <T extends Document>(model: Model<T>) => (filter: FilterQuery<T>) => new Promise<LeanDocumentOrArray<T[]>>((resolve, reject) => {
	model.find(filter).lean().exec()
		.then((doc: LeanDocumentOrArray<T[]>) => {
			if (!doc) reject(new Error('Document does not exist'));
			resolve(doc);
		})
		.catch((e: any) => reject(e));
});

const getOneAndPopulate = <T extends Document, X>(model: Model<T>) => (filter: FilterQuery<T>, ref: string) => new Promise<LeanDocumentOrArray<X>>((resolve, reject) => {
	model.findOne(filter).lean().populate(ref).exec()
		.then((doc: LeanDocumentOrArray<X>) => {
			if (!doc) reject(new Error('Document does not exist'));
			resolve(doc);
		})
		.catch((e: any) => reject(e));
});

const getAll = <T extends Document>(model: Model<T>) => () => new Promise<LeanDocumentOrArray<T[]>>((resolve, reject) => {
	model
	.find({})
	.lean()
	.exec()
		.then((docs: LeanDocumentOrArray<T[]>)=> {
			if (!docs)
				reject(new Error('Document does not exists'));
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

const deleteOne = <T extends Document>(model: Model<T>) => (filter: FilterQuery<T>) => new Promise<LeanDocumentOrArray<T>>((resolve, reject) => {
	model.findOneAndDelete(filter).lean().exec()
		.then((removed: LeanDocumentOrArray<T>) => {
			if (!removed) reject(new Error('Document does not exist'));
			resolve(removed);
		})
		.catch((e: any) => reject(e));
});

const updateOne = <T extends Document>(model: Model<T>) => (filter: FilterQuery<T>, data: UpdateQuery<T>, options?: QueryOptions) => new Promise<LeanDocumentOrArray<T>>((resolve, reject) => {
	model.findOneAndUpdate(filter, data, options).lean().exec()
		.then((updated: LeanDocumentOrArray<T>) => {
			if (!updated) {
				reject(new Error('An error occured'));
			}
			resolve(updated);
		})
		.catch((e: any) => reject(e));
});

export default <T extends Document, U, X = any>(model: Model<T>) => ({
	getOne: getOne(model),
	getAll: getAll(model),
	getMany: getMany(model),
	createOne: createOne<T, U>(model),
	updateOne: updateOne(model),
	deleteOne: deleteOne(model),
	getOneAndPopulate: getOneAndPopulate<T, X>(model)
});