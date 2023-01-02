import mongoose from "mongoose";
import Todo from "../models/todos.js";

export const readTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch(error) {
        res.status(409).json({ error: error.message });
    }
}

export const createTodo = async (req, res) => {
    const todo = new Todo(req.body);
    try {
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(409).json({error: error.message});
    }
}

export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(409).json({ error: 'Invalid ID' });
    }
    
    const todo = { title, content, _id:id };
    try {
        await Todo.findByIdAndUpdate(id, todo, { new: true });
        res.status(201).json(todo);
    } catch (error) {
        res.status(409).json({error: error.message});
    }
}

export const deleteTodo = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(409).json({ error: 'Invalid ID' });
    }

    try {
        await Todo.findByIdAndRemove(id);
        res.status(201).json({ message: 'Todo deleted succesfully' });
    } catch (error) {
        res.status(409).json({error: error.message});
    }
}