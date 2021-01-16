import connect from '../../db/connect'
import Argument, {IMinArgument} from '../../models/Argument'
import ArgumentService from '../../services/argumentService'
import mongoose from 'mongoose'

afterEach(async () => {
 await Argument.deleteMany()
})

beforeAll(async () => {
	try {
		await connect()
	} catch(e) {
		console.log(e);
	}
})


describe('Create an Argument', () => {
	it('should add an Argument',  async (done) => {
		expect.assertions(3)

		const restricted: IMinArgument = {
			name: 'restricted',
			description: 'Set a package to be restricted',
		}

		const resRestricted = await ArgumentService.createOne(restricted)

		expect(resRestricted._id).toBeDefined()
		expect(resRestricted.name).toBe(restricted.name)
		expect(resRestricted.description).toBe(restricted.description)


		done()
	})
})

describe('delete an Argument', () => {
	it('should delete an Argument', async (done) => {
		expect.assertions(2)
		const restricted: IMinArgument = {
			name: 'restricted',
			description: 'restricted package from npm',
		}
		const res = await ArgumentService.createOne(restricted)
		const resd = await ArgumentService.deleteOne(res.id)
		expect(res._id).toBeDefined()
		expect(res._id).toEqual(resd._id)
		done()
	})
})

describe('update an Argument', () => {
	it('should update an Argument', async (done) => {
		expect.assertions(2)
		const restricted: IMinArgument = {
			name: 'restricted',
			description: 'restricted package from npm',
		}
		const argId = mongoose.Types.ObjectId()
		await ArgumentService.createOne(restricted)
		
		const updated = await ArgumentService.updateOne(
			{name: 'restricted'},
			{description: 'allowed package from npm'},
			{new: true}
		)
		expect(updated._id).toBeDefined()
		expect(updated.description).toBe('allowed package from npm')
		done()
	})
})
