import parentService from './parentService'
import command, {IMinCommand, ICommand} from '../models/Command'

export default parentService<ICommand, IMinCommand>(command)
// //command.updateOne({name: 'npm'}, {$pull: { Arguments: { name: 'somename'}}})
