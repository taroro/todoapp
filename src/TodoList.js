import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import Switch from "@material-ui/core/Switch"
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete"
import firebase from "./firebase";
function TodoList() {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        firebase.firestore().collection('Todos').onSnapshot((snapshot) => {
            const todoData = [];
            snapshot.forEach(
                (doc) => todoData.push(
                    { ...doc.data(), 
                        id: doc.id }
                    )
            );
            console.log(todoData);  
            setTodos(todoData);
        });
    }, []);

    const updateTodo = (id, done) => {
        firebase.firestore().collection('Todos').doc(id).set({done: !done}, { merge: true });
    }
    return (
        <>
            <Todo />
            {todos.map((todo, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <Switch edge="end" checked={todo.done} onChange={e => updateTodo(todo.id, todo.done)}
                        inputProps={{ "aria-labelledby": "switch-list-label-bluetooth" }}
                    />
                    <p style={{padding: 8, flexGrow: 1}}><b>{todo.task}</b></p>
                    <IconButton aria-label="delete" onClick={e => firebase.firestore().collection('Todos').doc(todo.id).delete() } >
                        <DeleteIcon fontSize="large" />
                    </IconButton>
                </div>
            ))}
        </>
    )
}
export default TodoList;