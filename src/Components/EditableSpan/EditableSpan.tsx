import React, {ChangeEvent, FC, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = React.memo((props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        if (title.trim()) props.changeTitle(title)
    }
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

    return (
        editMode ?
            <TextField
                value={title}
                onBlur={offEditMode}
                autoFocus
                onChange={changeTitle}
            /> :
            <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})
