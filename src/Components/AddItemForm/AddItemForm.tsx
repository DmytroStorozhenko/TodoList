import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = React.memo((props ) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        const itemTitle = title.trim()
        if (itemTitle) {
            props.addItem(itemTitle);
            setTitle("")
        } else {
            setError("Title is required!")
        }
        setTitle("")
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") addItem()
    }

    return (
        <div>
            <TextField
                size={'small'}
                variant={'outlined'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
                label={'Title'}/>
            <IconButton
                color={'primary'}
                onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
})