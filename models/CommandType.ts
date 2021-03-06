import { Document, Model, model, Types, Schema, Query } from "mongoose"
import Command from './Command'

const CommandTypeSchema: Schema = new Schema({
	name: {
		type: String,
		requied: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	}
})

export interface IMinCommandType {
	readonly name: string,
	readonly description: string
}

export interface ICommandType extends Document {
	readonly name: string,
	readonly description: string
}

// const middleware = async (doc: ICommandType) => {
// 	if (doc) {
// 		try {
// 			await Command.deleteMany({ CommandType: doc._id })
// 		} catch (e) {	
// 			console.log(e);
// 		}
// 	}
// }

// CommandTypeSchema.post('findOneAndDelete', middleware)

export default model<ICommandType>("CommandType", CommandTypeSchema)