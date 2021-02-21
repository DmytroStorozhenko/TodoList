import React, {useCallback} from 'react';
import './App.css';
import {FilterValuesType, Todolist} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    taskId: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    todolistId: string
    title: string
    filter: FilterValuesType
}

export function AppWithRedux() {
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodolist = useCallback((todolistTitle: string) => {
        dispatch(addTodolistAC(todolistTitle))
    }, [dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>{
                    todolists.map(todolist => {
                        return (
                            <Grid item key={todolist.todolistId} style={{padding: "10px"}}>
                                <Paper elevation={4}
                                       style={{padding: "10px"}}>
                                    <Todolist
                                        key={todolist.todolistId}
                                        todolist={todolist}
                                    /></Paper>
                            </Grid>
                        )
                    })
                }</Grid>
            </Container>
        </div>
    )
}
