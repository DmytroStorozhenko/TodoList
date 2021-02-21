import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, FC, useCallback} from "react";
import {TaskType} from "./AppWithRedux";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task: FC<TaskPropsType> = React.memo((props) => {
    const {taskId, isDone, title} = props.task
    const dispatch = useDispatch()

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(taskId, props.todolistId))
    }, [dispatch, taskId, props.todolistId])

    const changeStatus = useCallback((event: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatusAC(taskId, event.currentTarget.checked, props.todolistId))
        }, [dispatch, taskId, props.todolistId])

    const changeTitle = useCallback(() => {
            dispatch(changeTaskTitleAC(taskId, title, props.todolistId))
        }, [dispatch, taskId, title, props.todolistId])

    return (
        <div>
            <Checkbox
                color={'primary'}
                checked={isDone}
                onChange={changeStatus}
            />
            <EditableSpan title={title}
                          changeTitle={changeTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    )
})
