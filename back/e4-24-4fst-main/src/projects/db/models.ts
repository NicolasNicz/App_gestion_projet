import mongoose, { model, Schema } from 'mongoose'
import uniqueValidator from "mongoose-unique-validator"
import httpErrors from "mongoose-errors"

const dbProjectSchema = new Schema({
  name : {type:String,unique:true},
  description : String,
  leader : {type:mongoose.Types.ObjectId,ref:'User'},
  scrumMaster : {type:mongoose.Types.ObjectId,ref:'User'},
  productOwner : {type:mongoose.Types.ObjectId,ref:'User'},
  participants : [{type:mongoose.Types.ObjectId,ref:'User'}],
  sprints:[{id:Number,startDate:Date,endDate:Date}],
  stories : [{type:mongoose.Types.ObjectId,ref:'Story'}]
})
dbProjectSchema.plugin(uniqueValidator)
dbProjectSchema.plugin(httpErrors)

const DbProject = model('Project',dbProjectSchema)

export { DbProject , dbProjectSchema }
