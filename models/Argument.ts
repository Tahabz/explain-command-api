import { Document, Model, model, Types, Schema, Query } from "mongoose"

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

export default model<IArgument>("Argument", ArgumentSchema)