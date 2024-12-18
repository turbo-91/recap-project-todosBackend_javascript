import { v4 as uuidv4 } from "uuid";
import ToDo from "../models/todo";
import {
  getAllToDos,
  getToDoById,
  createToDo,
  updateToDo,
  deleteToDo,
} from "../services/todoService";

jest.mock("../models/todo");

describe("ToDo Service Unit Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getAllToDos - should fetch all todos", async () => {
    const mockTodos = [
      { id: uuidv4(), description: "Test todo", status: "OPEN" },
    ];
    ToDo.find.mockResolvedValue(mockTodos);

    const result = await getAllToDos();
    expect(result).toEqual(mockTodos);
    expect(ToDo.find).toHaveBeenCalled();
  });

  test("getToDoById - should fetch a todo by ID", async () => {
    const mockToDo = { id: "123", description: "Test ToDo", status: "OPEN" };
    ToDo.findById.mockResolvedValue(mockToDo);

    const result = await getToDoById("123");
    expect(result).toEqual(mockToDo);
    expect(ToDo.findById).toHaveBeenCalledWith("123");
  });

  test("createToDo - should create a new todo", async () => {
    const mockToDo = {
      id: uuidv4(),
      description: "New ToDo",
      status: "IN_PROGRESS",
    };
    ToDo.prototype.save = jest.fn().mockResolvedValue(mockToDo);

    const result = await createToDo(mockToDo.description, mockToDo.status);
    expect(result).toEqual(mockToDo);
    expect(ToDo.prototype.save).toHaveBeenCalled();
  });

  test("updateToDo - should update a todo", async () => {
    const mockToDo = { id: "123", description: "Updated ToDo", status: "DONE" };
    ToDo.findByIdAndUpdate.mockResolvedValue(mockToDo);

    const result = await updateToDo("123", mockToDo);
    expect(result).toEqual(mockToDo);
    expect(ToDo.findByIdAndUpdate).toHaveBeenCalledWith("123", mockToDo, {
      new: true,
    });
  });

  test("deleteToDo - should delete a todo", async () => {
    const mockToDo = { id: "123", description: "To Delete", status: "OPEN" };
    ToDo.findByIdAndDelete.mockResolvedValue(mockToDo);

    const result = await deleteToDo("123");
    expect(result).toEqual(mockToDo);
    expect(ToDo.findByIdAndDelete).toHaveBeenCalledWith("123");
  });
});
