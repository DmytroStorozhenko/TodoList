import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    // const [title, setTitle] = useState<string>('')
    // const [error, setError] = useState<string | null>(null)
    //
    // const addTask = () => {
    //     const taskTitle = title.trim()
    //     if (taskTitle) {
    //         props.addTask(taskTitle, props.id);
    //         setTitle("")
    //     } else {
    //         setError("Title is required!")
    //     }
    //     setTitle("")
    // }
    // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     setError(null)
    //     setTitle(event.currentTarget.value)
    // }
    // const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === "Enter") addTask()
    // }
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
            <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            {/*<div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    onClick={deleteError}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>*/}
            <div className={'filters'}>
                <button className={props.filter === 'all' ? 'active-filter' : 'not-active-filter'}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : 'not-active-filter'}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : 'not-active-filter'}
                        onClick={onCompletedClickHandler}>Completed
                </button>
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
                                <input
                                    onChange={changeStatus}
                                    type="checkbox"
                                    checked={task.isDone}
                                />
                                <EditableSpan title={task.title}
                                              changeTitle={changeTitle}/>
                                {/*<span>{task.title}</span>*/}
                                <button onClick={removeTask}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

