import connect from '../../db/connect'
import Command, {IMinCommand} from '../../models/Command'
import commandService from '../../services/commandService'
import mongoose from 'mongoose'
import CommandType from '../../models/CommandType'

afterEach(async () => {
 await Command.deleteMany()
})

beforeAll(async () => {
	try {
		await connect()
	} catch(e) {
		console.log(e);
	}
})

beforeEach(() => { 
	jest.restoreAllMocks(); 
});


describe('Create a Command', () => {
	it('should add a command',  async (done) => {
		expect.assertions(3)

		const install: IMinCommand = {
			name: 'install',
			description: 'install package from npm',
			CommandType: mongoose.Types.ObjectId(),
		}

		const resInstall = await commandService.createOne(install)

		expect(resInstall.name).toBe(install.name)

		expect(resInstall.description).toBe(install.description)

		expect(resInstall.CommandType).toEqual(install.CommandType)

		done()
	})
})

describe('delete a command', () => {
	it('should delete a command', async (done) => {
		const install: IMinCommand = {
			name: 'install',
			description: 'install package from npm',
			CommandType: mongoose.Types.ObjectId(),
		}
		const res = await commandService.createOne(install)
		const resd = await commandService.deleteOne(res.id)
		expect(res._id).toEqual(resd?._id)
		done()
	})
})

describe('update a command', () => {
	it('should update a command', async (done) => {
		const install: IMinCommand = {
			name: 'install',
			description: 'install package from npm',
			CommandType: mongoose.Types.ObjectId(),
		}
		const argId = mongoose.Types.ObjectId()
		await commandService.createOne(install)
		
		const updated = await commandService.updateOne(
			{name: 'install'},
			{ $push: { Arguments: argId } },
			{new: true}
		)

		
		expect(updated?._id).toBeDefined()
		
		if (updated?.Arguments) {
			expect(updated?.Arguments[0].toHexString()).toBe(argId.toHexString());
		}
		done()
	})
})


describe('get command', () => {
	it('should get all commands', async (done) => {
		expect.assertions(1)
		const install: IMinCommand = {
			name: 'install',
			description: 'install package from npm',
			CommandType: mongoose.Types.ObjectId(),
		}
		const remove: IMinCommand = {
			name: 'remove',
			description: 'remove package',
			CommandType: mongoose.Types.ObjectId(),
		}
		await commandService.createOne(install)
		await commandService.createOne(remove)

		const commands = await commandService.getAll()

		expect(commands?.length).toBeGreaterThan(0)
		done()
	})

	it('should get a specific command', async (done) => {
		expect.assertions(4)

		const install: IMinCommand = {
			name: 'install',
			description: 'install package from npm',
			CommandType: mongoose.Types.ObjectId(),
		}

		await commandService.createOne(install)

		const getInstall = await commandService.getOne({name: install.name})
		expect(getInstall?._id).toBeDefined()
		expect(getInstall?.name).toBe(install.name)
		expect(getInstall?.description).toBe(install.description)
		expect(getInstall?.CommandType.toHexString()).toBe(install.CommandType.toHexString())
		done()
	})
})
