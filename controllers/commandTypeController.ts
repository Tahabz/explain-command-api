import Argument from '../models/Argument'
import Command from '../models/Command'
import CommandType, {IMinCommandType} from '../models/CommandType'
import commandTypeService from '../services/commandTypeService'
import express from 'express'

export const addCommandType = (req: express.Request, res: express.Response) => {
	const {name, description} = req.body
	
	if (name && description) {
		commandTypeService.createOne({name, description})
		.then(doc => res.json({ success: true, data: doc }))
		.catch((e) => { 
			if (e.code === 11000)
				return res.status(422).send({ success: false, message: 'Command Type already exist!' });
		})
	} else {
		return res.status(400).send({success: false, messsage: "bad request"})
	}

}

export const deleteCommandType = (req: express.Request, res: express.Response) => {

}
export const getCommandType = (req: express.Request, res: express.Response) => {
	
}