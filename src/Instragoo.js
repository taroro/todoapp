import React, { useState, useEffect } from "react";
import UploadImage from "./UploadImage";
import Switch from "@material-ui/core/Switch"
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete"
import firebase from "./firebase";
function Instragoo() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        firebase.firestore().collection('post').onSnapshot((snapshot) => {
            const postData = [];
            snapshot.forEach(
                (doc) => postData.push(
                    { ...doc.data(), 
                        id: doc.id }
                    )
            ); 
            setPosts(postData);
        });
    }, []);

    const like = (id, numLike) => {
        firebase.firestore().collection('post').doc(id).set({like: numLike+1}, { merge: true });
    }
    return (
        <>
            <UploadImage />
            {posts.map((post, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "col", alignItems: "center"}}>
                    <img src={post.imageUrl} />
                    <p style={{padding: 8, flexGrow: 1}}><b>{post.caption}</b></p>
                    <button onClick={e => like(post.id, post.like)}>LIKE</button>
                    <p style={{padding: 8, flexGrow: 1}}><b>{post.like}</b></p>
                </div>
            ))}
        </>
    )
}
export default Instragoo;