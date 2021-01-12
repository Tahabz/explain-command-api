import { Document, Model, model, Types, Schema, Query } from "mongoose"
import { IArgument } from "./Argument"
import {ICommandType} from './CommandType'

const CommandSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	},
	CommandType: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'CommandType'
	},
	Arguments: [{
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Argument'
	}]
})

export interface ICommand extends Document {
	readonly name: string,
	readonly description: string,
	readonly CommandType: ICommandType,
	readonly Arguments: IArgument[]
}

export default model<ICommand>('Command', CommandSchema)