import parentService from './parentService'
import commandType, {ICommandType, IMinCommandType} from '../models/CommandType'
import { Document, Model, model, Types, Schema, Query } from "mongoose"


export default parentService<ICommandType, IMinCommandType>(commandType)