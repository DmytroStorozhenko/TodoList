import {ActionType, FilterValuesType, removeTodoListAction, todoListsReducer} from './todoLists-reducer'
import {v1} from 'uuid';
import {TodoListType} from '../../App/App';


let todolistId1: string
let todolistId2: string;
let startState: Array<TodolistType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {todolistId: todolistId1, title: "What to learn", filter: "all"},
        {todolistId: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todoListsReducer(startState, removeTodoListAction(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].todolistId).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";

    const action: ActionType = {type: 'ADD-TODOLIST', title: newTodolistTitle, id: todolistId2}

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const action: ActionType = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action: ActionType = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    };

    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


