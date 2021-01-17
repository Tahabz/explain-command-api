import { Document, Model, model, Types, Schema, Query } from "mongoose"
import argumentService from "../services/argumentService";

const ArgumentSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	}
})

export interface IArgument extends Document {
	name: string,
	description: string
}
export interface IMinArgument {
	name: string,
	description: string
}

ArgumentSchema.post('findOneAndDelete', async (doc: IArgument) => {
	try {
		await argumentService.updateOne({_id: doc.id}, {$pull: { Arguments: doc.id}})
	} catch (e) {
		console.log(e);
	}
})

export default model<IArgument>("Argument", ArgumentSchema)