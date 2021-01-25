import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed"

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
            [todoListID1]: [
                {id: v1(), title: "html", isDone: true},
                {id: v1(), title: "js", isDone: true},
                {id: v1(), title: "react", isDone: false},
                {id: v1(), title: "ts", isDone: false}
            ],
            [todoListID2]: [
                {id: v1(), title: "Headphones", isDone: true},
                {id: v1(), title: "New laptop", isDone: false},
                {id: v1(), title: "PS5", isDone: false}
            ],
        }
    )

    function addTask(title: string, todolistID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        tasks[todolistID] = [newTask, ...tasks[todolistID]]
        setTasks({...tasks})
    }

    function removeTask(taskId: string, todoListID: string) {
        // const todoListTasks = tasks[todoListID]
        // tasks[todoListID] = todoListTasks.filter(task => task.id !== taskId)
        // setTasks({...tasks, [todoListID]: todoListTasks.filter(task => task.id !== taskId)})
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== taskId)})

    }

    function changeFilter(filterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = filterValue
            setTodoLists([...todoLists])
        }
    }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(task => task.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTitle(taskID: string, title: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(task => task.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    function addTodolist(todolistTitle: string) {
        const todoListID = v1()
        const newTodoList: TodoListType = {
            id: todoListID,
            title: todolistTitle,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({
            ...tasks,
            [todoListID]: []
        })
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    function changeTodolistTitle(title: string, todolistID: string) {
        const todoList = todoLists.find(tl => tl.id === todolistID)
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }

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
                    todoLists.map(todoList => {
                        //let allTodolistTasks = tasks[todoList.id];
                        let tasksForTodolist = tasks[todoList.id];

                        if (todoList.filter === "active") {
                            tasksForTodolist = tasks[todoList.id].filter(task => !task.isDone)
                        }
                        if (todoList.filter === "completed") {
                            tasksForTodolist = tasks[todoList.id].filter(task => task.isDone)
                        }
                        return (
                            <Grid item key={todoList.id} style={{padding: "10px"}}>
                                <Paper elevation={4}
                                style={{padding: "10px"}}>
                                    <Todolist
                                    key={todoList.id}
                                    id={todoList.id}
                                    filter={todoList.filter}
                                    title={todoList.title}
                                    tasks={tasksForTodolist}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    changeStatus={changeStatus}
                                    removeTodoList={removeTodoList}
                                    changeTaskTitle={changeTitle}
                                    changeTodoListTitle={changeTodolistTitle}/></Paper>
                            </Grid>
                            )
                    })
                }</Grid>
            </Container>
        </div>
    )
}

export default App;

