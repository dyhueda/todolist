import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title:{type : 'string', required: true, unique: true},
    checked:{type : 'boolean', required: true , default: true},
    tags : [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Tags"
      },
    ],
  },
  {
    timestamps : true,
  }
  
)
const ToDo = mongoose.models.ToDo || mongoose.model("ToDo", todoSchema)

export default ToDo
