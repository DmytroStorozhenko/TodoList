import React, {ChangeEvent, FC, useState} from "react";
import {TextField} from "@material-ui/core";

type EditablePropsSpanType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan: FC<EditablePropsSpanType> = React.memo((props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        if(title.trim()) props.changeTitle(title)
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
            // <input
            //     onBlur={offEditMode}
            //     autoFocus
            //     value={title}
            //     onChange={changeTitle}/> :
            <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})
