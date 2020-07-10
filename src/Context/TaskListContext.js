import React, {createContext, useState} from 'react'
import {v4 as uuid} from 'uuid';

export const TaskListContext = createContext();

const TaskListContextProvider = (props) => {
    const [tasks, setTasks] = useState([
        {title: 'Read a book', id:1},
        {title: 'Get up early', id:2},
        {title: 'Go for a jog', id:3},
    ]);
    const [editItem, setEditItem] = useState(null);

    const addTask = (title) => {
        setTasks([...tasks, { title, id: uuid() }])
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    const clearList = () => {
        setTasks([]);
    }

    const findItem = (id) => {
        const item = tasks.find(task => task.id === id);

        setEditItem(item);
    }

    const editTask = (title,id) => {
        const newTasks = tasks.map(task => (
            task.id === id ? {title, id} : task
        ));

        setTasks(newTasks);
        setEditItem(null);
    }
    return (
        <TaskListContext.Provider 
        value={{ 
            tasks, 
            addTask,
            deleteTask,
            clearList,
            findItem,
            editTask,
            editItem,
            }}
         >
            {props.children}
        </TaskListContext.Provider>
    )
}

export default TaskListContextProvider;