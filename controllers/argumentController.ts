import argumentService from '../services/argumentService'
import express from 'express'
import commandService from '../services/commandService'

export const addArgument = (req: express.Request, res: express.Response) => {
	const {name, description, commandName, commandType} = req.body
	
	if (name && description && commandName && commandType) {
		commandService.getOneAndPopulate({name: commandName}, 'CommandType')
		.then(command => {
			console.log(command.CommandType.name);
		})

		argumentService.createOne({name, description})
		.then(doc => {
			res.json({ success: true, data: doc }) 
		})
		.catch((e) => { 
			if (e.code === 11000)
				return res.status(422).json({ success: false, message: 'Argument already exist!' });
		})
	} else {
		return res.status(400).json({success: false, messsage: "bad request"})
	}

}

export const deleteArgument = (req: express.Request, res: express.Response) => {
	const {name} = req.body
	if (name) {
		argumentService.deleteOne({name})
		.then(doc => res.status(200).json({success: true, data: doc}))
		.catch(e => {
			return res.status(422).json({success: false, message: e.message})
		})
	} else {
		return res.status(400).json({success: false, messsage: "bad request"})
	}
}

export const getArgument = (req: express.Request, res: express.Response) => {
	argumentService.getOne({name: req.params.name})
	.then(doc => res.status(200).json({success: true, data: doc}))
	.catch(e => res.status(400).json({success: false, messsage: e.message}))
}