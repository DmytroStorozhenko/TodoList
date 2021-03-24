import axios from 'axios'

//settings
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '54ca7025-138d-404e-bb10-b393f2399e64'
    }
})

// API
export const todoListsAPI = {
    getTodoLists () {
        return instance.get<Array<TodoListServerType>>(`todo-lists`)
    },
    createTodoList (title: string) {
        return instance.post<ResponseType<{item: TodoListServerType}>>(`todo-lists`, {title})
    },
    deleteTodoList (todoListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}`)
    },
    updateTodoList(todoListId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoListId}`, {title})
    },
    getTasks(todoListId: string) {
        return instance.get<GetTaskResponseType>(`todo-lists/${todoListId}/tasks`)
    },
    createTask(todoListId: string, title: string) {
        return instance.post<ResponseType<CreateTaskType>>(`todo-lists/${todoListId}/tasks`, {title})
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<GetTaskResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, properties: UpdateTaskType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, properties)
    }
}

// types
export type TodoListServerType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTaskResponseType = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}
export type UpdateTaskType = {
    completed: boolean
    deadline: string
    description: string
    priority: TaskPriorities
    startDate: string
    status: TaskStatuses
    title: string
}

type CreateTaskType = {
    item: TaskType
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}