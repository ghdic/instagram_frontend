import React, {useState, useEffect} from 'react';
import './MainPage.css'
import Post from "../Post/Post";
import uploadImage from '../../images/upload.png';
import {storage, auth} from "../firebase";

function Mainpage() {
    let [progress, setProgress] = useState("");
    let [postData, setPostData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/post")
            .then(response => response.json())
            .then(data => {
                setPostData(data);
            })
    }, [])
    // let data = [
    //     {
    //         id:'1234',
    //         userName:'asd',
    //         postImage:'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
    //         likes:'1234',
    //         commentList: [
    //             {
    //                 "userName": "ASDS",
    //                 "commentId":"1234",
    //                 "timeStamp":"123456",
    //                 "description":"Comment 1"
    //             },
    //             {
    //                 "userName": "ASDS",
    //                 "commentId":"1234",
    //                 "timeStamp":"123456",
    //                 "description":"Comment 1"
    //             },
    //             {
    //                 "userName": "ASDS",
    //                 "commentId":"1234",
    //                 "timeStamp":"123456",
    //                 "description":"Comment 1"
    //             }
    //         ]
    //     },
    //     {
    //         id:'1234',
    //         userName:'AAAA',
    //         postImage:'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
    //         likes:'1234',
    //         commentList: [
    //             {
    //                 "userName": "DDDD",
    //                 "commentId":"1234",
    //                 "timeStamp":"123456",
    //                 "description":"Comment 1"
    //             },
    //             {
    //                 "userName": "ASDS",
    //                 "commentId":"1234",
    //                 "timeStamp":"123456",
    //                 "description":"Comment 1"
    //             },
    //             {
    //                 "userName": "ASDS",
    //                 "commentId":"1234",
    //                 "timeStamp":"123456",
    //                 "description":"Comment 1"
    //             }
    //         ]
    //     }
    // ]


    let upload = (e) => {
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

            },
            function(){
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log(downloadURL)
                    let payload = {
                        "postId": Math.floor(Math.random()*100000),
                        "userId": JSON.parse(localStorage.getItem("user")).uid,
                        "postPath": downloadURL,
                        "timeStamp": new Date().getTime(),
                        "likeCount": 0
                    }
                    console.log(payload)

                    const requestOptions = {
                        method: "POST",
                        headers: {'Content-type': "application/json"},
                        body: JSON.stringify(payload)
                    }
                    fetch("http://localhost:8080/post", requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            setPostData([data, ...postData])
                        })
                        .catch(error => {

                        })
                })
            }
        )
    }
  return (
    <div>
        <div style={{"textAlign":"center", "margin":"10px", width:"650px"}}>
            <div className="fileupload">
                <label for="file-upload">
                    <img src={uploadImage} className="mainpage_uploadicon" alt=""/>
                </label>
                <input id="file-upload" onChange={upload} type="file"/>
            </div>
            <div className="upload_text">{progress}</div>
        </div>
        {
            postData.map((item, index) => (
                <Post post={item} />
            ))
        }



    </div>
  );
};

export default Mainpage;