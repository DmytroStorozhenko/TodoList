import React, {FC, useCallback, useEffect} from "react";
import {AddItemForm} from "../../../Components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../Components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {Task} from "./Task/Task";
import {changeTodoListFilterAction, changeTodoListTitle, removeTodoList, TodoListType} from "../todoLists-reducer";
import {addTask, setTasks} from "../tasks-reducer";
import {TaskStatuses, TaskType} from "../../../api/todoListsAPI";

type TodolistPropsType = {
    todoList: TodoListType
    tasks: Array<TaskType>
}

export const TodoList: FC<TodolistPropsType> = React.memo((props) => {
    const dispatch = useDispatch()

    const {id, title, filter} = props.todoList

    useEffect ( () => {
        dispatch(setTasks(id))
    }, [])

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTask(id, title))
    }, [dispatch, id])

    const setAllFilter = useCallback(() => {
        dispatch(changeTodoListFilterAction(id, "all"))
    }, [dispatch, id])

    const setActiveFilter = useCallback(() => {
        dispatch(changeTodoListFilterAction(id, "active"))
    }, [dispatch, id])

    const setCompletedFilter = useCallback(() => {
        dispatch(changeTodoListFilterAction(id, "completed"))
    }, [dispatch, id])

    const changeTodoListTitleHandler = useCallback((newTitle: string) => {
        dispatch(changeTodoListTitle(id, newTitle))
    }, [dispatch, id])

    const removeTodoListHandler = useCallback(() => {
        dispatch(removeTodoList(id))
    }, [dispatch, id])

    let tasksForTodolist = props.tasks

    if (filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(task => task.status === TaskStatuses.New)
    }
    if (filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(task => task.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3>
                <EditableSpan
                    title={title}
                    changeTitle={changeTodoListTitleHandler}/>
                <IconButton
                    onClick={removeTodoListHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm
                addItem={addTaskHandler}/>
            <div className={'filters'}>
                <Button variant={filter === 'all' ? 'contained' : 'outlined'}
                        color={filter === 'all' ? 'primary' : 'default'}
                        size={'small'}
                        onClick={setAllFilter}>All
                </Button>
                <Button
                    variant={filter === 'active' ? 'contained' : 'outlined'}
                    size={'small'}
                    color={filter === 'active' ? 'primary' : 'default'}
                    onClick={setActiveFilter}>Active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                    size={'small'}
                    color={filter === 'completed' ? 'primary' : 'default'}
                    onClick={setCompletedFilter}>Completed
                </Button>
            </div>
            <ul>
                {
                    tasksForTodolist.map(task => {
                        return (
                            <li
                                key={task.id}
                                className={`${task.status === TaskStatuses.Completed && "isDone"} taskItem`}>
                                <Task task={task}/>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
})
