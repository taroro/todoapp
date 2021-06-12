import React, { useState, useEffect } from "react";
import firebase from "./firebase";
function UploadImage() {
    const [image , setImage] = useState('');
    var storage = firebase.storage();
    const upload = ()=>{
        if(image == null)
          return;
        storage.ref(`/images/${image.name}`).put(image)
        .on("state_changed" , alert("success") , alert);
      }
      return (
        <div className="App">
          <center>
          <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
          <button onClick={upload}>Upload</button>
          </center>
        </div>
      );
}
export default UploadImage;