import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    title:{type : 'string', required: true},
  },
  {
    timestamps : true,
  }
)
const Tags = mongoose.models.Tags || mongoose.model("Tags", tagSchema)

export default Tags
