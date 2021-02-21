import React, {FC, useCallback} from "react";
import {TaskType, TodolistType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton, Button} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {Task} from "./Task";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {addTaskAC} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed"

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type TodolistPropsType = {
    todolist: TodolistType
   }

export const Todolist: FC<TodolistPropsType> = React.memo((props) => {
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const {todolistId, title, filter} = props.todolist

    const addTask = useCallback((title: string) => {
            dispatch(addTaskAC(title, todolistId))
        }, [dispatch, todolistId])

    const onAllClickHandler = useCallback(() => {
            dispatch(changeTodolistFilterAC(todolistId, "all"))
        }, [dispatch, todolistId])

    const onActiveClickHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(todolistId, "active"))
    }, [dispatch, todolistId])

    const onCompletedClickHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(todolistId, "completed"))
    }, [dispatch, todolistId])

    const changeTodolistTitle = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleAC(newTitle, todolistId))
    }, [dispatch, todolistId])

    const removeTodoList = useCallback(() => {
            dispatch(removeTodolistAC(todolistId))
        }, [dispatch, todolistId])


    let allTodolistTasks = tasks[todolistId]
    let tasksForTodolist = allTodolistTasks

    if (filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
    }
    if (filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
    }

    return (
        <div>
            <h3>
                <EditableSpan
                    title={title}
                    changeTitle={changeTodolistTitle}/>
                <IconButton
                    onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm
                addItem={addTask}/>
            <div className={'filters'}>
                <Button variant={filter === 'all' ? 'contained' : 'outlined'}
                        color={filter === 'all' ? 'primary' : 'default'}
                        size={'small'}
                    /*className={props.filter === 'all' ? 'active-filter' : 'not-active-filter'}*/
                        onClick={onAllClickHandler}>All
                </Button>
                <Button
                    variant={filter === 'active' ? 'contained' : 'outlined'}
                    size={'small'}
                    color={filter === 'active' ? 'primary' : 'default'}
                    /*className={props.filter === 'active' ? 'active-filter' : 'not-active-filter'}*/
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                    size={'small'}
                    color={filter === 'completed' ? 'primary' : 'default'}
                    /*className={props.filter === '' ? 'active-filter' : 'not-active-filter'}*/
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
            <ul>
                {
                    tasksForTodolist.map(task => {
                        return (
                            <li key={task.taskId}
                                className={`${task.isDone && "isDone"} taskItem`}>
                                <Task
                                    task={task}
                                    todolistId={todolistId}/>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
})
