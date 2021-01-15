import React, {ChangeEvent, FC, useState} from "react";

type EditableSpanType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan: FC<EditableSpanType> = (props) => {
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
            <input
                onBlur={offEditMode}
                autoFocus
                value={title}
                onChange={changeTitle}/> :
            <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}
