import {todoListsAPI, TodoListServerType} from "../../api/todoListsAPI";
import {Dispatch} from "redux";

let initialState: Array<TodoListType> = []

export function todoListsReducer(state = initialState, action: ActionType): Array<TodoListType> {
    switch (action.type) {
        case "SET-TODOLIST":
            return action.todoLists.map(todoList => ({...todoList,filter: 'all'}))
        case 'ADD-TODOLIST':
            return [{...action.todoList, filter: "all"}, ...state]
        case 'REMOVE-TODOLIST':
            return state.filter(todoList => todoList.id !== action.id)
        case 'CHANGE-TODOLIST-TITLE':
            return state
                .map(todoList => todoList.id === action.todoListId? {...todoList, title: action.title} : todoList)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todoList => todoList.id === action.id? {...todoList, filter: action.filter}: todoList)
        default:
            return state
    }
}

// actions
export const setTodoListsAction = (todoLists: Array<TodoListServerType>) =>
    ({type: 'SET-TODOLIST', todoLists}) as const
export const addTodoListAction = (todoList: TodoListServerType) =>
    ({type: 'ADD-TODOLIST', todoList}) as const
export const removeTodoListAction = (id: string) =>
    ({type: 'REMOVE-TODOLIST', id}) as const
export const changeTodoListTitleAction = (todoListId: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', todoListId, title}) as const
export const changeTodoListFilterAction = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter}) as const



// thunks
export const setTodoLists = () => {
    return async (dispatch: Dispatch<ActionType>) => {
        try {
            let response = await todoListsAPI.getTodoLists()
            dispatch(setTodoListsAction(response.data))
        } finally {
        }
    }
}
export const addTodoList = (title: string) =>
    async (dispatch: Dispatch<ActionType>) => {
        try {
            let response = await todoListsAPI.createTodoList(title)
            dispatch(addTodoListAction(response.data.data.item))
        } finally {
        }
}
export const removeTodoList = (todoListId: string) => {
    return async (dispatch: Dispatch<ActionType>) => {
        try {
            await todoListsAPI.deleteTodoList(todoListId)
            dispatch(removeTodoListAction(todoListId))
        } finally {
        }
    }
}
export const changeTodoListTitle = (todoListId: string, title: string) => {
    return async (dispatch: Dispatch<ActionType>) => {
        try {
            await todoListsAPI.updateTodoList(todoListId, title)
            dispatch(changeTodoListTitleAction(todoListId, title))
        } finally {
        }
    }
}

// types
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAction>
export type AddTodoListActionType = ReturnType<typeof addTodoListAction>
type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAction>
type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAction>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAction>

export type ActionType =
    RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeTodoListTitleActionType |
    ChangeTodoListFilterActionType |
    SetTodoListsActionType

export type TodoListType = TodoListServerType & {
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed"
