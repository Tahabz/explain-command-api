import commandTypeService from '../services/commandTypeService'
import commandService from '../services/commandService'
import argumentService from '../services/argumentService'
import Command, { ICommand } from '../models/Command'
import express from 'express'
import CommandType, { ICommandType } from '../models/CommandType'

export const addCommandType = (req: express.Request, res: express.Response) => {
	const { name, description } = req.body

	if (name && description) {
		commandTypeService.createOne({ name, description })
			.then(doc => res.json({ success: true, data: doc }))
			.catch((e) => {
				if (e.code === 11000)
					return res.status(422).json({ success: false, message: 'Command Type already exist!' });
			})
	} else {
		return res.status(400).json({ success: false, messsage: "bad request" })
	}

}

export const deleteCommandType = (req: express.Request, res: express.Response) => {
	const { name } = req.body
	if (name) {
		commandTypeService.deleteOne({ name })
			.then(type => {
				commandService.getMany({ CommandType: type._id }).then((comArr: any) => {
					comArr.forEach((com: ICommand) => {
						commandService.deleteOne({ name: com.name }).catch(e => 
							res.status(422).json({ success: false, message: e.message })
						)
					});
					return res.status(200).json({ success: true, data: type })
				}).catch((e: any) => res.status(422).json({ success: false, message: e.message}))

			})
			.catch(e => {
				return res.status(422).json({ success: false, message: e.message })
			})
	} else {
		return res.status(400).json({ success: false, messsage: "bad request" })
	}
}
export const getCommandType = (req: express.Request, res: express.Response) => {
	commandTypeService.getOne({ name: req.params.name })
		.then(doc => res.status(200).json({ success: true, data: doc }))
		.catch(e => res.status(404).json({ success: false, messsage: e.message }))
}

export const updateCommandType = (req: express.Request, res: express.Response) => {
	const {commandTypeName} = req.body
	const {data} = req.body
	console.log(data);
	if (data && commandTypeName) {
		commandTypeService.updateOne({name: commandTypeName}, data)
			.then(doc => res.status(200).json({ success: true, data: doc }))
			.catch(e => res.status(422).json({ success: false, message: e.message }))
	} else {
		return res.status(400).json({ success: false, message: "bad request" })
	}
}