import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import firebase from "./firebase";
function Todo() {
    const [task, setTask] = useState("");
    let name = ""
    const createTodo = e => {
        e.preventDefault();
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        const todoRef = db.collection("Todos").add({
            task: task,
            done: false
        }); 
        setTask("")
    }

    return (
        <form onSubmit={createTodo}>
            <TextField
                style={{ width: "50%", marginTop: 50, marginLeft: 10 }}
                id="standard-basic"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                label="Add Todo"
                variant="outlined"
            />
        </form>
    )
}
export default Todo