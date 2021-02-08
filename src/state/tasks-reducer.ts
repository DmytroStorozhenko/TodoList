import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

export type ActionType =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTitleActionType |
    AddTodolistActionType |
    RemoveTodolistActionType

export function tasksReducer(state: TasksStateType, action: ActionType) {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state,
                [action.todolistId]: [...state[action.todolistId].filter(task => task.id !== action.taskId)]
            }
           /* let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.taskId)
            return copyState*/
        }
        case 'ADD-TASK': {
            let task: TaskType = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId], task]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, isDone: action.isDone}
                    }
                })
                /*  [action.todolistId]: state[action.todolistId].map(task => task.id !== action.taskId
                    ? task : {...task, title: action.title}
                )*/
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, title: action.title}
                    }
                })
            }
                /*  [action.todolistId]: state[action.todolistId].map(task => task.id !== action.taskId
                    ? task : {...task, title: action.title}
                )*/
             }
        case 'ADD-TODOLIST': {
            return {
                ...state, [action.id]: []
            }
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error('I dont understand this type')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId}) as const

export const addTaskAC = (title: string, todolistId: string) =>
    ({type: 'ADD-TASK', title, todolistId}) as const

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) =>
    ({type: 'CHANGE-TASK-STATUS', isDone, taskId, todolistId}) as const

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) =>
   (  {type: 'CHANGE-TASK-TITLE', title, taskId, todolistId}) as const
