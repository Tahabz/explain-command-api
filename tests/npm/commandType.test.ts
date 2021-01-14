import mongoose from 'mongoose'
import connect from '../../db/connect'
import commandType, {IMinCommandType} from '../../models/CommandType'
import commandTypeService from '../../services/commandTypeService'
import { IMinCommand } from '../../models/Command'
import CommandType from '../../models/CommandType'

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
	it('should add a command type',  async (done) => {
		expect.assertions(1)
		const commandType: IMinCommandType = {
			name: 'npm',
			description: 'node package manager',
		}
		jest.spyOn(CommandType, 'create').mockReturnValue(Promise.resolve(commandType))
		const {name, description} = await commandTypeService.createOne(commandType)
		expect({name, description}).toEqual(commandType)
		done()
	})
})