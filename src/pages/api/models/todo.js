import mongoose from "mongoose";

const toDoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["OPEN", "IN_PROGRESS", "DONE"],
    required: true,
  },
});

const ToDo = mongoose.models.ToDo || mongoose.model("ToDo", toDoSchema);

export default ToDo;
