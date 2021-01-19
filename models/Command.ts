import { Document, Model, model, Types, Schema, Query } from "mongoose"
import argumentService from "../services/argumentService"
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

export interface IMinCommandPopulated {
	readonly name: string,
	readonly description: string,
	readonly CommandType: ICommandType,
	readonly Arguments?: Types.ObjectId[]
}

CommandSchema.post<Query<ICommand, ICommand, ICommand>>('findOneAndUpdate', async function () {
	try {
		const updateQuery = this.getUpdate();
		if (updateQuery?.$pull?.Arguments) {
			await argumentService.deleteOne({_id: updateQuery.$pull.Arguments})
		}
	} catch (e) {
		console.log(e);
	}
})


CommandSchema.post('findOneAndDelete', (doc: ICommand) => {
	try {
		console.log(doc);
		doc.Arguments?.forEach(async (arg) => {
			await argumentService.deleteOne({_id: arg})
		})
	} catch (e) {
		console.log(e);
	}
})

export default model<ICommand>('Command', CommandSchema)

