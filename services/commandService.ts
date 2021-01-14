import parentService from './parentService'
import command from '../models/Command'

export default parentService(command)
// //command.updateOne({name: 'npm'}, {$pull: { Arguments: { name: 'somename'}}})
