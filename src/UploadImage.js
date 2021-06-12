import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import TextField from "@material-ui/core/TextField";
function UploadImage() {
    const [image , setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [caption, setCaption] = useState("");
    var storage = firebase.storage();
    const upload = ()=>{
        if(image == null) return;
        storage.ref(`/images/${image.name}`).put(image).then(() => {
            /* let url = storage.ref(`/images/${image.name}`).getDownloadURL()
            setImageUrl(url) */

            storage.ref(`/images/${image.name}`).getDownloadURL().then((url) => {
              firebase.firestore().collection('post').add({
                caption: caption,
                imageUrl: url,
                like: 0,
                dislike: 0
              })
            })
          }
        );
      }
      return (
        <div className="App" style={{ display: "flex", flexDirection: "row", alignItems: "left", padding: 10 }}>
          <div>
          <TextField
                style={{ padding: 8 }}
                id="standard-basic"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                label="Say Something"
            />
          </div>
          <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
          <button onClick={upload}>Post</button>
          
        </div>
      );
}
export default UploadImage;