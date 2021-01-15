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

beforeEach(() => { 
	jest.restoreAllMocks(); 
});


describe('Create a Command Type', () => {
	it('should add a command type',  async (done) => {
		expect.assertions(2)

		const npm: IMinCommandType = {
			name: 'npm',
			description: 'node package manager',
		}

		jest.spyOn<any, any>(CommandType, 'create').mockReturnValue(Promise.resolve(npm))

		const resNpm = await commandTypeService.createOne(npm)

		expect(resNpm).toEqual(npm)

		const bash: IMinCommandType = {
			name: 'compose',
			description: 'php package manager'
		}

		jest.spyOn<any, any>(CommandType, 'create').mockReturnValue(Promise.resolve(bash))

		const resBash = await commandTypeService.createOne(bash)
		
		expect(resBash).toEqual(bash)
		done()
	})
})

describe('delete a command type', () => {
	it('should delete a command type', async (done) => {
		const npm: IMinCommandType = {
			name: 'npm',
			description: 'node package manager',
		}
		const res = await commandTypeService.createOne(npm)
		const resd = await commandTypeService.deleteOne(res.id)
		expect(res._id).toEqual(resd._id)
		done()
	})
})

describe('update a command type', () => {
	it('should update a command type', async (done) => {
		const brew: IMinCommandType = {
			name: 'brew',
			description: 'brew is a package manager',
		}
		const cbrew = await commandTypeService.createOne(brew)
		const updated = await commandTypeService.updateOne({name: 'brew'}, {description: 'node package not manager'}, {new: true})
		expect(updated.description).not.toBe(cbrew.description)
		done()
	})
})
