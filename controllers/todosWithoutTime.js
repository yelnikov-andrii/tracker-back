import { TodoWithoutTimeTracker } from "../models/index.js";

async function createTodo(req, res) {
    try {
        const { todo, userId } = req.body;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const newTodo = await TodoWithoutTimeTracker.create({
            name: todo.name,
            completed: todo.completed,
            userTrackerId: userId
        });

        return res.status(201).json(newTodo);
    }
    catch (e) {
        console.error('Error creating todo:', error);
        return res.status(500).json({ message: 'Failed to create todo' });
    }
}

async function getTodos(req, res) {
    try {
        const { userId } = req.params;

        const todos = await TodoWithoutTimeTracker.findAll({
            where: {
                userTrackerId: userId
            }
        });

        return res.status(200).json(todos);
    }

    catch (error) {
        console.error('Error retrieving todos:', error);
        return res.status(500).json({ message: 'Failed to retrieve todos' });
    }
}

async function deleteTodo(req, res) {
    const { userId } = req.body;
    const { todoId } = req.params;

    try {
        const foundTodo = await TodoWithoutTimeTracker.findOne({ where: { userTrackerId: userId, id: todoId } });
        if (!foundTodo) {
            res.status(400).json({ message: 'Todo not found or you do not have permission to delete it' });
            return;
        } else {
            await TodoWithoutTimeTracker.destroy({ where: { id: todoId } });
            return res.status(204).send();
        }
    }

    catch (error) {
        console.error('Error deleting todo:', error);
        return res.status(500).json({ message: 'Failed to delete todo' });
    }
}

async function deleteAll(req, res) {
    const { userId, todosIds } = req.body;

    try {
        await TodoWithoutTimeTracker.destroy({ where: { id: todosIds, userTrackerId: userId } });
        res.status(200).send({ message: "Todos deleted successfully" })
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: 'Error deleting todos' })
    }
}

async function changeTodo(req, res) {
    const { todoId, newTodo, userId } = req.body;
    try {
        const foundTodo = await TodoWithoutTimeTracker.findOne({ where: { id: todoId, userTrackerId: userId } });

        if (!foundTodo) {
            return res.status(404).json({ message: 'Todo not found or access denied' });
        }

        await foundTodo.update({
            name: newTodo.name || foundTodo.name,
            completed: newTodo.completed !== undefined ? newTodo.completed : foundTodo.completed
        });
        return res.status(200).json(foundTodo);

    } catch (e) {
        console.error('Error updating todo:', e);
        return res.status(500).json({ message: 'Failed to update todo' });
    }
}

async function toggleTodos(req, res) {
    const { todos } = req.body;
    try {
        for (const todo of todos) {
            await TodoWithoutTimeTracker.update({ completed: todo.completed }, { where: { id: todo.id } })
        }

        res.status(200).json({ message: 'Todos updated successfully' });

    } catch (e) {
        console.error('Error updating todos', e);
        return res.status(500).json({ message: 'Failed to updates todos' });
    }
}

export const todosWithoutTimeController = {
    createTodo,
    getTodos,
    deleteTodo,
    changeTodo,
    deleteAll,
    toggleTodos
}