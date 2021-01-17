import { Document, Model, model, Types, Schema, Query } from "mongoose"
import Argument, { IArgument } from "./Argument"
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
		ref: 'Argument'
	}]
})

export interface ICommand extends Document {
	readonly name: string,
	readonly description: string,
	readonly CommandType: Types.ObjectId,
	readonly Arguments?: Types.ObjectId[]
}

export interface IMinCommand {
	readonly name: string,
	readonly description: string,
	readonly CommandType: Types.ObjectId,
	readonly Arguments?: Types.ObjectId[]
}


CommandSchema.post('findOneAndDelete', async (doc: ICommandType) => {
	try {
		await Argument.deleteMany({id: doc.id})
	} catch (e) {
		console.log(e);
	}
})

export default model<ICommand>('Command', CommandSchema)

// //command.updateOne({name: 'npm'}, {$pull: { Arguments: { name: 'somename'}}})
