import connect from '../../db/connect'
import Command, {IMinCommand} from '../../models/Command'
import commandService from '../../services/commandService'
import commandTypeService from '../../services/commandTypeService'
import commandType, { IMinCommandType } from '../../models/CommandType'
import mongoose from 'mongoose'
import CommandType from '../../models/CommandType'

afterEach(async() => {
	Command.deleteMany()
	commandType.deleteMany()
})
beforeEach(async() => {
	Command.deleteMany()
	commandType.deleteMany()
})

beforeAll(async () => {
	try {
		await connect()
	} catch(e) {
		console.log(e);
	}
})

describe('commandType', () => {
	it('should delete commandType references in command model', async (done) => {

		expect.assertions(3);

		const npm: IMinCommandType = {
			name: 'npm',
			description: 'node package manager'
		}
		const khra: IMinCommandType = {
			name: 'random',
			description: 'random package manager'
		}
		await commandTypeService.createOne(khra)
		const comtype = await commandTypeService.createOne(npm)

		const install: IMinCommand = {
			name: 'install',
			description: 'install a package from npm',
			CommandType: comtype.id
		}

		await commandService.createOne(install)
		await commandTypeService.deleteOne({name: npm.name})

		const commandExist: boolean = await Command.exists({name: install.name})
		const commandTypeExist: boolean = await CommandType.exists({name: npm.name})
		const randomCommandTypeExist: boolean = await CommandType.exists({name: 'random'})
		
		expect(commandExist).toBeFalsy()
		expect(commandTypeExist).toBeFalsy()
		expect(randomCommandTypeExist).toBeTruthy()
		
		done();
	})
})


describe('command', () => {
	it('should delete all arguments associated with the command model', async (done) => {
		expect.assertions(0)
		done()
	})
})