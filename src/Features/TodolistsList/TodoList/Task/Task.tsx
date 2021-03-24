import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../Components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, FC, useCallback} from "react";
import {useDispatch} from "react-redux";
import {deleteTask, updateTask} from "../../tasks-reducer";
import {TaskStatuses, TaskType} from "../../../../api/todoListsAPI";

export type TaskPropsType = {
    task: TaskType
}

export const Task: FC<TaskPropsType> = React.memo((props) => {
    const {id, status, title, todoListId} = props.task
    const dispatch = useDispatch()

    const deleteTaskHandler = useCallback(() => {
        dispatch(deleteTask(todoListId, id))
    }, [dispatch, id, todoListId])

    const changeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {

        let isDone = event.currentTarget.checked

        let newStatus = isDone ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTask(todoListId, id, {status: newStatus}))
        debugger
    }, [dispatch])

    const changeTitleHandler = useCallback((newTitle: string) => {
        dispatch(updateTask(todoListId, id, {title: newTitle}))
    }, [dispatch])

    return (
        <div>
            <Checkbox
                color={'primary'}
                checked={status === TaskStatuses.Completed}
                onChange={changeStatusHandler}
            />
            <EditableSpan title={title} changeTitle={changeTitleHandler}/>
            <IconButton onClick={deleteTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})
