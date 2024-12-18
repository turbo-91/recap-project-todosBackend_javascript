import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import ToDo from "../models/todo.js";
import handler from "../todo.js";
import supertest from "supertest";
import dbConnect from "../utils/dbConnect.js";
import express from "express";

let mongoServer;
const app = express();
app.use(express.json()); // Add JSON body parsing for Express
app.all("/api/todo", handler); // Mount your Next.js API route as a handler

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  global.__MONGO_URI__ = mongoServer.getUri(); // Set the in-memory MongoDB URI
  process.env.NODE_ENV = "test"; // Set the environment to "test"

  await dbConnect(); // Connect to the database
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("ToDo API Integration Tests", () => {
  let server;
  let request;
  let todo;

  beforeEach(async () => {
    server = app.listen(); // Start the server
    request = supertest(server);

    todo = await ToDo.create({
      id: "123",
      description: "Test ToDo",
      status: "OPEN",
    });
  });

  afterEach(async () => {
    await ToDo.deleteMany();
    server.close(); // Ensure the server is properly closed
  });

  test("GET /api/todo/[id] - should return a single todo", async () => {
    const response = await request.get(`/api/todo?id=${todo.id}`);
    expect(response.status).toBe(200);
    expect(response.body.description).toBe("Test ToDo");
  });

  test("PUT /api/todo/[id] - should update a todo", async () => {
    const updatedData = { description: "Updated ToDo", status: "DONE" };
    const response = await request
      .put(`/api/todo?id=${todo.id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.description).toBe("Updated ToDo");
    expect(response.body.status).toBe("DONE");
  });

  test("DELETE /api/todo/[id] - should delete a todo", async () => {
    const response = await request.delete(`/api/todo?id=${todo.id}`);
    expect(response.status).toBe(204);

    const deletedToDo = await ToDo.findOne({ id: todo.id });
    expect(deletedToDo).toBeNull();
  });
});
