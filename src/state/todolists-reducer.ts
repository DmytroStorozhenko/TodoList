import {TodolistType} from "../AppWithRedux";
import {v1} from "uuid";
import {FilterValuesType} from "../TodoList";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeTodoListTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodoListFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type ActionType =
    RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodoListTitleActionType |
    ChangeTodoListFilterActionType

let initialState:Array<TodolistType> = []

export function todolistsReducer(state = initialState, action: ActionType): Array<TodolistType> {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return  state.filter(todolist => todolist.todolistId !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {
                todolistId: action.id,
                title: action.title,
                filter: "all"
            }]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todolist => {
                if(todolist.todolistId === action.id) {
                    return {...todolist, title: action.title}
                }
                return todolist
            })
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todolist => {
                if (todolist.todolistId === action.id) {
                    return {...todolist, filter: action.filter}
                }
                return todolist
            })
        default:
            return state
    }
}

export const removeTodolistAC = (id: string) =>
    ({type: 'REMOVE-TODOLIST', id}) as const
export const addTodolistAC = (title: string) =>
    ({type: 'ADD-TODOLIST', title, id: v1()}) as const
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, title}) as const
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter}) as const