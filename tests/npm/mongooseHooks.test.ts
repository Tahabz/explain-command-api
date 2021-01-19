import connect from '../../db/connect'
import Command, {IMinCommand} from '../../models/Command'
import commandService from '../../services/commandService'
import commandTypeService from '../../services/commandTypeService'
import commandType, { IMinCommandType } from '../../models/CommandType'
import CommandType from '../../models/CommandType'
import Argument, { IMinArgument } from '../../models/Argument'
import argumentService from '../../services/argumentService'

afterEach(async() => {
	await Command.deleteMany()
	await commandType.deleteMany()
	await Argument.deleteMany()
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
		const random: IMinCommandType = {
			name: 'random',
			description: 'random package manager'
		}
		await commandTypeService.createOne(random)
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
		expect.assertions(4)
		
		const arg1: IMinArgument = {
			name: 'access',
			description: 'access some shit'
		}
		const arg2: IMinArgument = {
			name: 'grant',
			description: 'grant some shit'
		}
		const arg3: IMinArgument = {
			name: 'random',
			description: 'randomize some shit'
		}

		const carg1 = await argumentService.createOne(arg1)
		const carg2 = await argumentService.createOne(arg2)
		const carg3 = await argumentService.createOne(arg3)


		const npm: IMinCommandType = {
			name: 'npm',
			description: 'node package manager'
		}
		const comtype = await commandTypeService.createOne(npm)

		const install: IMinCommand = {
			name: 'install',
			description: 'install a package from npm',
			CommandType: comtype.id,
			Arguments: [carg1.id, carg2.id]
		}
		await commandService.createOne(install)

		await commandService.deleteOne({name: install.name})

		const carg1exist = await Argument.exists({name: carg1.name})
		const carg2exist = await Argument.exists({name: carg2.name})
		const carg3exist = await Argument.exists({name: carg3.name})

		const commandExist = await Command.exists({name: install.name})

		expect(commandExist).toBeFalsy()
		expect(carg1exist).toBeFalsy()
		expect(carg2exist).toBeFalsy()
		expect(carg3exist).toBeTruthy()
		done()
	})

	it('should delete an argument from a command', async (done) => {

		expect.assertions(6)
		
		const arg1: IMinArgument = {
			name: 'access',
			description: 'access some shit'
		}
		const arg2: IMinArgument = {
			name: 'grant',
			description: 'grant some shit'
		}
		const arg3: IMinArgument = {
			name: 'random',
			description: 'randomize some shit'
		}

		const carg1 = await argumentService.createOne(arg1)
		const carg2 = await argumentService.createOne(arg2)
		const carg3 = await argumentService.createOne(arg3)


		const npm: IMinCommandType = {
			name: 'npm',
			description: 'node package manager'
		}
		const comtype = await commandTypeService.createOne(npm)

		const install: IMinCommand = {
			name: 'install',
			description: 'install a package from npm',
			CommandType: comtype.id,
			Arguments: [carg1.id, carg2.id, carg3]
		}
		await commandService.createOne(install)

		await commandService.updateOne({name: 'install'}, {$pull: { Arguments: carg1.id}})

		const carg1exist = await Argument.exists({name: carg1.name})
		const carg2exist = await Argument.exists({name: carg2.name})
		const carg3exist = await Argument.exists({name: carg3.name})

		const carg1existRef = await Command.exists({Arguments: carg1.id})
		const carg2existRef = await Command.exists({Arguments: carg2.id})
		const carg3existRef = await Command.exists({Arguments: carg3.id})

		console.log(pop);
		expect(carg1existRef).toBeFalsy()
		expect(carg2existRef).toBeTruthy()
		expect(carg3existRef).toBeTruthy()

		expect(carg1exist).toBeFalsy()
		expect(carg2exist).toBeTruthy()
		expect(carg3exist).toBeTruthy()
		done()
	})
})

