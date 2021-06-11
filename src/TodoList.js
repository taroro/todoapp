import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import Divider from "@material-ui/core/Divider";
import firebase from "./firebase";
function TodoList() {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        firebase.firestore().collection('Todos').onSnapshot((snapshot) => {
            const todoData = [];
            snapshot.forEach((doc) => todoData.push({ ...doc.data(), id: doc.id }));
            console.log(todoData);  
            setTodos(todoData);
        });
    }, []);
    return (
        <>
        <Todo />
        {todos.map((todo, i) => {
            
        })}
        </>
    )
}
export default TodoList;