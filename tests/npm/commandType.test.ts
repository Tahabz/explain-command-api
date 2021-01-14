import mongoose from 'mongoose'
import connect from '../../db/connect'
import * as commandType from '../../controllers/commandTypeController'

beforeAll(async () => {
	try {
		await connect()
	} catch(e) {
		console.log(e);
	}
})

describe('Create a Command Type', () => {
	it('should add a command type', async () => {

	})
})