import React, { useState } from "react";
import firebase from "./firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton  from '@material-ui/core/IconButton';
import PhotoCamera from "@material-ui/icons/PhotoCamera"

function UploadImage() {
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState("");
  var storage = firebase.storage();
  const upload = () => {
    if (image == null) return;
    storage.ref(`/images/${image.name}`).put(image).then(() => {
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
      <TextField
          style={{  }}
          id="standard-basic"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          label="คุณกำลังคิดอะไร"
      />
      <input accept="image/*" style={{display: 'none'}} id="icon-button-file" type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      <Button style={{ margin: 8 }} variant="contained" color="primary" onClick={upload}>
        Post
      </Button>
    </div>
  );
}
export default UploadImage;