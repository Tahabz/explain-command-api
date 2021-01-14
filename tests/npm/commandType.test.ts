import mongoose from 'mongoose'
import connect from '../../db/connect'
import commandType, {IMinCommandType} from '../../models/CommandType'
import commandTypeService from '../../services/commandTypeService'
import { IMinCommand } from '../../models/Command'

afterEach(async () => {
	await commandType.deleteMany()
})

beforeAll(async () => {
	try {
		await connect()
	} catch(e) {
		console.log(e);
	}
})

describe('Create a Command Type', () => {
	it('should add a command type',  () => {
		const commandType: IMinCommandType = {
			name: 'npm',
			description: 'node package manager',
		}
		return commandTypeService.createOne(commandType)
					.then(({name, description}) => expect({name, description}).toEqual(commandType))
	})
})