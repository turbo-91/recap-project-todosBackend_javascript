import ToDo from "../models/todo.js";
import { v4 as uuidv4 } from "uuid";

export async function getAllToDos() {
  return await ToDo.find();
}

export async function getToDoById(id) {
  return await ToDo.findById(id);
}

export async function createToDo(description, status) {
  const newToDo = new ToDo({
    id: uuidv4(),
    description: description,
    status: status,
  });
  return await newToDo.save();
}

export async function updateToDo(id, updatedData) {
  return await ToDo.findByIdAndUpdate(id, updatedData, { new: true });
}

export async function deleteToDo(id) {
  return await ToDo.findByIdAndDelete(id);
}
