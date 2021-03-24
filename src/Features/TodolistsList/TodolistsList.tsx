import React, {FC, useCallback, useEffect} from "react";
import {Grid, Paper} from "@material-ui/core";
import {TodoList} from "./TodoList/TodoList";
import {addTodoList, setTodoLists, TodoListType} from "./todoLists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../App/store";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import {TasksStateType} from "./tasks-reducer";

export const TodolistList: FC = () => {
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTodoLists())
    }, [])

    const addTodolistHandler = useCallback((todolistTitle: string) => {
        dispatch(addTodoList(todolistTitle))
    }, [dispatch])

    return (
        <>
            <Grid container style={{padding: "10px"}}>
                <AddItemForm addItem={addTodolistHandler}/>
            </Grid>
            <Grid container spacing={3}>{
                todoLists.map(todoList => {
                    return (
                        <Grid item key={todoList.id} style={{padding: "10px"}}>
                            <Paper elevation={4}
                                   style={{padding: "10px"}}>
                                <TodoList
                                    key={todoList.id}
                                    todoList={todoList}
                                    tasks={tasks[todoList.id]}
                                />
                            </Paper>
                        </Grid>
                    )
                })
            }</Grid>
        </>
    )
}