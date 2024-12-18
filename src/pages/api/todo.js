import dbConnect from "./utils/dbConnect.js";
import {
  getAllToDos,
  getToDoById,
  createToDo,
  updateToDo,
  deleteToDo,
} from "./services/todoService.js";

export default async function handler(req, res) {
  await dbConnect();
  const { method, body, query } = req;

  try {
    if (method === "GET") {
      if (query.id) {
        const todo = await getToDoById(query.id);
        return res.status(200).json(todo);
      } else {
        const todos = await getAllToDos();
        return res.status(200).json(todos);
      }
    } else if (method === "POST") {
      const newTodo = await createToDo(body.description, body.status);
      return res.status(201).json(newTodo);
    } else if (method === "PUT") {
      const updatedTodo = await updateToDo(query.id, body);
      return res.status(200).json(updatedTodo);
    } else if (method === "DELETE") {
      await deleteToDo(query.id);
      return res.status(204).end();
    } else {
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
