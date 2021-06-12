import React, { useState, useEffect } from "react";
import UploadImage from "./UploadImage";
import Divider from '@material-ui/core/Divider';
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import ThumbDownIcon from "@material-ui/icons/ThumbDown"
import { makeStyles } from '@material-ui/core/styles';
import firebase from "./firebase";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 200,
        marginLeft: 10
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
}));

function Instragoo() {
    const classes = useStyles();
    const [posts, setPosts] = useState([])
    useEffect(() => {
        firebase.firestore().collection('post').onSnapshot((snapshot) => {
            const postData = [];
            snapshot.forEach(
                (doc) => postData.push(
                    {
                        ...doc.data(),
                        id: doc.id
                    }
                )
            );
            setPosts(postData);
        });
    }, []);

    const like = (id, numLike) => {
        firebase.firestore().collection('post').doc(id).set({ like: numLike + 1 }, { merge: true });
    }

    const dislike = (id, numLike) => {
        firebase.firestore().collection('post').doc(id).set({ dislike: numLike + 1 }, { merge: true });
    }

    return (
        <>
            <div style={{}}>
                <UploadImage />
                <div style={{ display: "flex", flexDirection: "col", alignItems: "left", padding: 10 }}>
                    {posts.map((post, i) => (
                        <Card className={classes.root}>
                            <CardMedia
                                className={classes.media}
                                image={post.imageUrl}
                                title={post.caption}
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {post.caption}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="Like" onClick={e => like(post.id, post.like)} >
                                    <ThumbUpIcon fontSize="small" />
                                </IconButton>
                                <p style={{ padding: 8, flexGrow: 1 }}><b>{post.like}</b></p>
                                <IconButton aria-label="Dislike" onClick={e => dislike(post.id, post.dislike)} >
                                    <ThumbDownIcon fontSize="small" />
                                </IconButton>
                                <p style={{ padding: 8, flexGrow: 1 }}><b>{post.dislike}</b></p>
                            </CardActions>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Instragoo;