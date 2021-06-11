import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import firebase from "./firebase";
function Todo() {
    const [task, setTask] = useState("");
    const createTodo = e => {
        e.preventDefault();
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        const userRef = db.collection("Todos").add({
            task: task,
            email: false
        }); 
        setTask("")
    }

    return (
        <form onSubmit={createTodo}>
            <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                label="Add Todo"
                variant="outlined"
            />
        </form>
    )
}
export default Todo