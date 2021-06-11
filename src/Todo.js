import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import firebase from "./firebase";
function Todo() {
    const [task, setTask] = useState("");
    const createTodo = e => {
        e.preventDefault();
        firebase.firestore().collection("Todos").add({
            task: task,
            done: false
        }); 
        setTask("")
    }

    return (
        <form onSubmit={createTodo}>
            <TextField
                style={{ width: "100%" , padding: 8 }}
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