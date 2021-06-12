import React, { useState, useEffect } from "react";
import UploadImage from "./UploadImage";
import Switch from "@material-ui/core/Switch"
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import ThumbDownIcon from "@material-ui/icons/ThumbDown"
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

    const dislike = (id, numLike) => {
        firebase.firestore().collection('post').doc(id).set({dislike: numLike+1}, { merge: true });
    }

    return (
        <>
            <UploadImage />
            {posts.map((post, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: 10}}>
                    <img src={post.imageUrl} width="100" />
                    <p style={{padding: 8, flexGrow: 1}}><b>{post.caption}</b></p>
                    <IconButton aria-label="Like" onClick={e => like(post.id, post.like)} >
                        <ThumbUpIcon fontSize="large" />
                    </IconButton>
                    <p style={{padding: 8, flexGrow: 1}}><b>{post.like}</b></p>
                    <IconButton aria-label="Dislike" onClick={e => dislike(post.id, post.dislike)} >
                        <ThumbDownIcon fontSize="large" />
                    </IconButton>
                    <p style={{padding: 8, flexGrow: 1}}><b>{post.dislike}</b></p>
                </div>
            ))}
        </>
    )
}
export default Instragoo;