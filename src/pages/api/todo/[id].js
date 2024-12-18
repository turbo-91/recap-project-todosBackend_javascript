import dbConnect from "../utils/dbConnect.js";
import ToDo from "../models/todo.js";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  try {
    if (method === "GET") {
      const todo = await ToDo.findOne({ id: id });
      if (!todo) {
        return res.status(404).json({ message: "ToDo not found" });
      }
      return res.status(200).json(todo);
    } else if (method === "PUT") {
      const updatedTodo = await ToDo.findOneAndUpdate({ id: id }, req.body, {
        new: true,
      });
      if (!updatedTodo) {
        return res.status(404).json({ message: "ToDo not found" });
      }
      return res.status(200).json(updatedTodo);
    } else if (method === "DELETE") {
      const deletedTodo = await ToDo.findOneAndDelete({ id: id });
      if (!deletedTodo) {
        return res.status(404).json({ message: "ToDo not found" });
      }
      return res.status(204).end();
    } else {
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
