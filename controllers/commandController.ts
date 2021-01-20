import commandService from '../services/commandService'
import express from 'express'
import CommandType from '../models/CommandType'
import commandTypeService from '../services/commandTypeService'

export const addcommand = (req: express.Request, res: express.Response) => {
	const {name, description, commandTypeName} = req.body
	
	if (name && description && commandTypeName) {
		commandTypeService.getOne({name: commandTypeName})
			.then(doc => {
				commandService.createOne({name, description, CommandType: doc._id})
				.then(doc => res.json({ success: true, data: doc }))
				.catch(e => res.status(422).json({ success: false, message: e.message }))
			})
		.catch((e) => { 
			if (e.code === 11000)
				return res.status(422).json({ success: false, message: 'Command Type already exist!' });
			return res.status(422).json({ success: false, message: e.message });
		})
	} else {
		return res.status(400).json({success: false, messsage: "bad request"})
	}

}

export const deletecommand = (req: express.Request, res: express.Response) => {
	const {name} = req.body
	if (name) {
		commandService.deleteOne({name})
		.then(doc => res.status(200).json({success: true, data: doc}))
		.catch(e => {
			return res.status(422).json({success: false, message: e.message})
		})
	} else {
		return res.status(400).json({success: false, messsage: "bad request"})
	}
}
export const getcommand = (req: express.Request, res: express.Response) => {
	commandService.getOne({name: req.params.name})
	.then(doc => res.status(200).json({success: true, data: doc}))
	.catch(e => res.status(400).json({success: false, messsage: e.message}))
}

export const updateCommand = (req: express.Request, res: express.Response) => {
	const {commandName} = req.body
	const {data} = req.body
	console.log(data)
	if (data && commandName) {
		commandService.updateOne({name: commandName}, data)
			.then(doc => res.status(200).json({ success: true, data: doc }))
			.catch(e => res.status(422).json({ success: false, message: e.message }))
	} else {
		return res.status(400).json({ success: false, message: "bad request" })
	}
}