import parentService from './parentService'
import command, {IMinCommand, ICommand, IMinCommandPopulated} from '../models/Command'

export default parentService<ICommand, IMinCommand, IMinCommandPopulated>(command)