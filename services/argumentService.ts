import parentService from './parentService'
import argument, { IArgument, IMinArgument } from '../models/Argument'

export default parentService<IArgument, IMinArgument>(argument)