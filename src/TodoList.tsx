import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton, Button, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (filterValue: FilterValuesType, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (taskID: string, todoListID: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                {/*<button onClick={removeTodoList}>X</button>*/}
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div className={'filters'}>
                <Button variant={props.filter === 'all' ? 'contained' : 'outlined'}
                        color={props.filter === 'all' ? 'primary' : 'default'}
                        size={'small'}
                        /*className={props.filter === 'all' ? 'active-filter' : 'not-active-filter'}*/
                        onClick={onAllClickHandler}>All
                </Button>
                <Button
                    variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    size={'small'}
                    color={props.filter === 'active' ? 'primary' : 'default'}
                    /*className={props.filter === 'active' ? 'active-filter' : 'not-active-filter'}*/
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    size={'small'}
                    color={props.filter === 'completed' ? 'primary' : 'default'}
                    /*className={props.filter === '' ? 'active-filter' : 'not-active-filter'}*/
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        const removeTask = () => props.removeTask(task.id, props.id)
                        const changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(task.id, event.currentTarget.checked, props.id)
                        }
                        const changeTitle = (title: string) => {
                            props.changeTaskTitle(task.id, title, props.id)

                        }
                        return (
                            <li key={task.id}
                                className={`${task.isDone && "isDone"} taskItem`}>
                                <Checkbox
                                    color={'primary'}
                                    checked={task.isDone}
                                    onChange={changeStatus}
                                    />
                                {/*<input*/}
                                {/*    onChange={changeStatus}*/}
                                {/*    type="checkbox"*/}
                                {/*    checked={task.isDone}*/}
                                {/*/>*/}
                                <EditableSpan title={task.title}
                                              changeTitle={changeTitle}/>
                                {/*<button onClick={removeTask}>x</button>*/}
                                <IconButton onClick={removeTask}>
                                    <Delete/>
                                </IconButton>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

