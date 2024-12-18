import ToDo from "./models/todo";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      if (req.query.id) {
        const todo = await ToDo.findOne({ id: req.query.id });
        if (!todo) {
          return res.status(404).json({ message: "ToDo not found" });
        }
        return res.status(200).json(todo);
      } else {
        const todos = await ToDo.find();
        return res.status(200).json(todos);
      }
    } else if (req.method === "POST") {
      const { description, status } = req.body;
      const newTodo = new ToDo({
        id: uuidv4(),
        description,
        status,
      });
      const savedTodo = await newTodo.save();
      return res.status(201).json(savedTodo);
    } else if (req.method === "PUT") {
      const updatedTodo = await ToDo.findOneAndUpdate(
        { id: req.query.id },
        req.body,
        { new: true }
      );
      if (!updatedTodo) {
        return res.status(404).json({ message: "ToDo not found" });
      }
      return res.status(200).json(updatedTodo);
    } else if (req.method === "DELETE") {
      const deletedTodo = await ToDo.findOneAndDelete({ id: req.query.id });
      if (!deletedTodo) {
        return res.status(404).json({ message: "ToDo not found" });
      }
      return res.status(204).end();
    } else {
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("API Error:", error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
}
