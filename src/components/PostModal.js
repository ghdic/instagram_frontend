import React, { useContext, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import uploadImage from "../images/upload.png";
import { storage } from "../firebase";
import { AppContext } from "../App";

function PostModal({open, handleClose, handlePostData, post = null}) {
  let [formData, setFormData] = useState({
    postPath: "",
    content: ""
  })
  let [progress, setProgress] = useState("");
  const {user} = useContext(AppContext);

  useEffect(() => {
    if(post === null)
      return;
    setFormData({postPath: post.postPath ?? "", content: post.content ?? ""})
  }, [])

  let upload_image = (e) => {
    let image = e.target.files[0];
    if(image === null || image === undefined)
      return;
    let uploadTask = storage.ref("images").child(image.name).put(image);
    uploadTask.on(
      "state_change",
      function (snapshot) {
        let progress_percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress_percent.toString())
      },
      function (error) {
        console.log(error);
      },
      function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log(downloadURL)
          setFormData({...formData, postPath: downloadURL})
        })
      }
    )
  }

  let upload_post = () => {
    if(formData.postPath === "" || formData.content === "") {
      alert("컨텐츠를 작성하고 제출해주세요!");
      return;
    }


    let payload = {
      "uid": user.uid,
      "postPath": formData.postPath,
      "content": formData.content
    }
    console.log(payload)

    const requestOptions = {
      method: "POST",
      headers: {'Content-type': "application/json"},
      body: JSON.stringify(payload)
    }
    let requestUrl = post === null ? "https://instagram-spring.herokuapp.com/post":`https://instagram-spring.herokuapp.com/post/${post.postId}`
    fetch(requestUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        handlePostData(data);
        handleClose();
      })
      .catch(error => {

      })
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Post Upload</DialogTitle>
        <DialogContent>
          <DialogContentText>
            친구들과 함께 나누고 싶은 추억을 인스타그램에 올려보세요!
          </DialogContentText>
          <div className="fileupload" style={{textAlign:"center"}}>
            <label htmlFor="file-upload">
              <img src={formData.postPath === "" ? uploadImage: formData.postPath} style={{width:"500px", cursor:"pointer"}} alt=""/>
            </label>
            <input id="file-upload" onChange={upload_image} type="file" style={{display:"none"}} />
          </div>
          <div>
            <label htmlFor="progress">Image Upload Progress: </label>
            <progress id="progress" value={progress} max="100"/>
          </div>
          <TextField
            autoFocus
            multiline
            rows={4}
            label="Content"
            type="text"
            fullWidth
            variant="standard"
            value={formData.content}
            onChange={(e) => {setFormData({...formData, content: e.currentTarget.value})}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={upload_post}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PostModal;