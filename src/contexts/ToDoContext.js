import { createContext,useContext,useReducer } from "react";
import tasksReducer from '../reducers/tasksReducer'

const TasksContext=createContext([]);

export const TasksProvider = ({children}) => {    
    const [tasks, dispatch]=useReducer(tasksReducer,[])

    return (
        <TasksContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTasks = () => {
    return useContext(TasksContext)
}