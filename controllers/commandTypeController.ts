import commandTypeService from '../services/commandTypeService'
import express from 'express'

export const addCommandType = (req: express.Request, res: express.Response) => {
	const {name, description} = req.body
	
	if (name && description) {
		commandTypeService.createOne({name, description})
		.then(doc => res.json({ success: true, data: doc }))
		.catch((e) => { 
			if (e.code === 11000)
				return res.status(422).json({ success: false, message: 'Command Type already exist!' });
		})
	} else {
		return res.status(400).json({success: false, messsage: "bad request"})
	}

}

export const deleteCommandType = (req: express.Request, res: express.Response) => {
	const {name} = req.body
	if (name) {
		commandTypeService.deleteOne({name})
		.then(doc => res.status(200).json({success: true, data: doc}))
		.catch(e => {
			return res.status(422).json({success: false, message: e.message})
		})
	} else {
		return res.status(400).json({success: false, messsage: "bad request"})
	}
}
export const getCommandType = (req: express.Request, res: express.Response) => {
	commandTypeService.getOne({name: req.params.name})
	.then(doc => res.status(200).json({success: true, data: doc}))
	.catch(e => res.status(400).json({success: false, messsage: e.message}))
}