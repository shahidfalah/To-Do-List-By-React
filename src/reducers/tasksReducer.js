import { v4 as uuidv4 } from 'uuid';

export default function reducer(currentTasks,action){
    switch(action.type){
        case "createNewTask":
            return creatingTask(currentTasks,action)
        case "deletingTask":
            return deletingTask(currentTasks,action)
        case "updatingTask":
            return updatingTask(currentTasks,action)
        case "isChecked":
            return OnChecked(currentTasks,action)
        case "OnRefresh":{
            const storedTasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
            return storedTasks
        }
        default:
            throw Error("Unknown action",action.type)
    }
}

function creatingTask(currentTasks,action){
    const newTask=   {
        id:uuidv4(),
        title:action.payload.title,
        details:"",
        isCompleted:false
    }

    const WithNewTask=[...currentTasks,newTask]
    localStorage.setItem("tasks",JSON.stringify(WithNewTask))
    return WithNewTask
}

function deletingTask(currentTasks,action){
    const updatingTasks=currentTasks.filter( task => task.id !== action.payload.specificTask.id)
    localStorage.setItem("tasks",JSON.stringify(updatingTasks))
    return updatingTasks
}

function updatingTask(currentTasks,action){
    const updatingTasks=currentTasks.map( task => {
        if(task.id === action.payload.specificTask.id){
          task.title=action.payload.updateData.title
          task.details=action.payload.updateData.details
        }
        return task
    })
    localStorage.setItem("tasks",JSON.stringify(updatingTasks))
    return updatingTasks
}

function OnChecked(currentTasks,action){
    let updateTask=currentTasks.map((t)=>{ // you can directly change the currentTasks because this will cause Mutation Problem mean the currentTasks is state and you can change it directly.
        if(t.id === action.payload.task.id){
            const update={
                ...t,isCompleted:!t.isCompleted
            }
            return update
        }
        return t
    })
    localStorage.setItem("tasks",JSON.stringify(updateTask))
    return updateTask
}