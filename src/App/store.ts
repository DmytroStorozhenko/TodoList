import {tasksReducer} from '../Features/TodolistsList/tasks-reducer';
import {todoListsReducer} from '../Features/TodolistsList/todoLists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;