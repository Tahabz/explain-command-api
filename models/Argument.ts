import { Document, Model, model, Types, Schema, Query } from "mongoose"
import commandService from "../services/commandService";
import Command from "./Command";

const ArgumentSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
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

// ArgumentSchema.post('findOneAndDelete', async (doc: IArgument) => {
// 	try {
// 		//await argumentService.getAll() 
// 		await Command.updateOne({Arguments: doc._id}, {$pull: { Arguments: doc._id}})
// 	} catch (e) {
// 		console.log(e);
// 	}
// })

export default model<IArgument>("Argument", ArgumentSchema)