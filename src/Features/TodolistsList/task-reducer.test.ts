import {addTaskAction, changeTaskStatusAction, changeTaskTitleAction, tasksReducer} from './tasks-reducer';
import {} from '../../App/App';
import {deleteTaskAction} from "./tasks-reducer";
import {addTodoListAction, removeTodoListAction} from "./todoLists-reducer";
import {TasksStateType} from "./TodoList/TodoList";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {taskId: "1", title: "CSS", isDone: false},
            {taskId: "2", title: "JS", isDone: true},
            {taskId: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {taskId: "1", title: "bread", isDone: false},
            {taskId: "2", title: "milk", isDone: true},
            {taskId: "3", title: "tea", isDone: false}
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    const action = deleteTaskAction("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    });

});


test('correct task should be added to correct array', () => {
    const action = addTaskAction("juice", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][3].title).toBe("juice");
    expect(endState["todolistId2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAction("2", false, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].isDone).toBeTruthy();
    expect(endState["todolistId2"][1].isDone).toBeFalsy();
});

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAction("2", 'beer', "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe('JS');
    expect(endState["todolistId2"][1].title).toBe('beer');
});


test('new array should be added when new todolist is added', () => {


    const action = addTodoListAction("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


test('property with todolistId should be deleted', () => {

    const action = removeTodoListAction("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});

