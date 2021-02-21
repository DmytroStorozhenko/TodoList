import {tasksReducer} from "./tasks-reducer";
import {addTodolistAC, todolistsReducer} from "./todolists-reducer";
import {TodolistType} from "../AppWithRedux";
import {TasksStateType} from "../TodoList";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistType> = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].todolistId;

    expect(idFromTasks).toBe(action.id);
    expect(idFromTodolists).toBe(action.id);
});


