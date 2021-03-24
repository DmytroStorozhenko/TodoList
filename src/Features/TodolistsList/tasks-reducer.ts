import {
    AddTodoListActionType,
    RemoveTodoListActionType,
    SetTodoListsActionType,
} from "./todoLists-reducer";
import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses, TaskType, todoListsAPI, UpdateTaskType} from "../../api/todoListsAPI";
import {AppRootStateType} from "../../App/store";

let initialState: TasksStateType = {}

export function tasksReducer(state = initialState, action: ActionType): TasksStateType {
    switch (action.type) {
        case "SET-TASK": return {...state, [action.todoListId]: action.tasks}
        case 'ADD-TASK': return {...state,[action.task.todoListId]: [...state[action.task.todoListId], action.task]}
        case 'REMOVE-TASK': return {...state,
                [action.todoListId]: [...state[action.todoListId].filter(task => task.id !== action.taskId)]}
        case "UPDATE-TASK-STATUS": return {...state, [action.todoListId]: state[action.todoListId].
                map(task => task.id === action.taskId ? {...task, ...action.properties}: task)}
        case 'SET-TODOLIST':
            const stateCopy = {...state}
            action.todoLists.forEach(todoList => {
                stateCopy[todoList.id] = []
            })
            return stateCopy;
                case 'ADD-TODOLIST': return {...state, [action.todoList.id]: []}
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

// actions
export const setTaskAction = (todoListId: string, tasks: Array<TaskType>) =>
    ({type: 'SET-TASK', todoListId, tasks}) as const
export const addTaskAction = (task: TaskType) =>
    ({type: 'ADD-TASK', task}) as const
export const deleteTaskAction = (todoListId: string, taskId: string,) =>
    ({type: 'REMOVE-TASK', todoListId, taskId,}) as const
export const updateTaskAction = (todoListId: string, taskId: string, properties: UpdatedTaskType) =>
    ({type: 'UPDATE-TASK-STATUS', todoListId, taskId, properties}) as const

// thunks
export const setTasks = (todoListId: string) => {
    return async (dispatch: Dispatch<ActionType>) => {
        try {
            let response = await todoListsAPI.getTasks(todoListId)
            dispatch(setTaskAction(todoListId, response.data.items))
        } finally {
        }
    }
}

export const addTask = (todoListId: string, title: string) => {
    return async (dispatch: Dispatch<ActionType>) => {
        try {
            let response = await todoListsAPI.createTask(todoListId, title)
            dispatch(addTaskAction(response.data.data.item))
        } finally {
        }
    }
}

export const deleteTask = (todoListId: string, taskId: string) => {
    return async (dispatch: Dispatch<ActionType>) => {
        try {
            await todoListsAPI.deleteTask(todoListId, taskId)
            dispatch(deleteTaskAction(todoListId, taskId))
        } finally {
        }
    }
}

export const updateTask = (todoListId: string, taskId: string, properties: UpdatedTaskType) => {
    return async (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
        try {
            const state = getState()
            const task = state.tasks[todoListId].find(task => task.id === taskId)
            if(!task) return

            const API_task: UpdateTaskType = {
                title: task.title,
                description: task.description,
                completed: task.completed,
                priority: task.priority,
                status: task.status,
                startDate: task.startDate,
                deadline: task.deadline,
                ...properties
            }

            await todoListsAPI.updateTask(todoListId, taskId, API_task)
            dispatch(updateTaskAction(todoListId, taskId, properties))
        } finally {
        }
    }
}

// types
export type SetTaskActionType = ReturnType<typeof setTaskAction>
export type AddTaskActionType = ReturnType<typeof addTaskAction>
export type RemoveTaskActionType = ReturnType<typeof deleteTaskAction>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAction>

export type ActionType =
    SetTaskActionType |
    AddTaskActionType |
    RemoveTaskActionType |
    UpdateTaskActionType |
    AddTodoListActionType |
    RemoveTodoListActionType |
    SetTodoListsActionType

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type UpdatedTaskType = {
    completed?: boolean
    deadline?: string
    description?: string
    priority?: TaskPriorities
    startDate?: string
    status?: TaskStatuses
    title?: string
}
