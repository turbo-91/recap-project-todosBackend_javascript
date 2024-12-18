import ToDo from "../models/todo.js";
import { v4 as uuidv4 } from "uuid";

export const getAllToDos = async () => await ToDo.find();
export const getToDoById = async (id) => await ToDo.findById(id);
export const createToDo = async (description, status) => {
  const newToDo = new ToDo({
    id: uuidv4(),
    description,
    status,
  });
  return await newToDo.save();
};
export const updateToDo = async (id, updatedData) => {
  return await ToDo.findByIdAndUpdate(id, updatedData, { new: true });
};
export const deleteToDo = async (id) => await ToDo.findByIdAndDelete(id);
