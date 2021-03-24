import {tasksReducer} from "./tasks-reducer";
import {addTodoListAction, todoListsReducer} from "./todoLists-reducer";
import {TodoListType} from "../../App/App";
import {TasksStateType} from "./TodoList/TodoList";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistType> = [];

    const action = addTodoListAction("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].todolistId;

    expect(idFromTasks).toBe(action.id);
    expect(idFromTodolists).toBe(action.id);
});


