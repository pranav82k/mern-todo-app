import express from 'express';
import { readTodos, createTodo, updateTodo, deleteTodo } from '../controller/todos.js';

const router = express.Router();
router.get('/', readTodos);
router.post('/', createTodo);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);
export default router;