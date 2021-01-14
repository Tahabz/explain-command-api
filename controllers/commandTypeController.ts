import Argument from '../models/Argument'
import Command from '../models/Command'
import CommandType, {IMinCommandType} from '../models/CommandType'
import commandTypeService from '../services/commandTypeService'
import express from 'express'

export const addCommandType = async (req: express.Request, res: express.Response) => {
	const npm = await commandTypeService.createOne({
		name: 'hello',
		description: 'somefucking description'
	})
}

export const deleteCommandType = (req: express.Request, res: express.Response) => {
	
}
export const getCommandType = (req: express.Request, res: express.Response) => {
	
}