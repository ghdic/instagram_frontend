import React, {useState, useEffect} from 'react';
import Post from "./Post";
import uploadImage from '../images/upload.png';
import {storage} from "../firebase";
import styled from "styled-components";
import PostModal from "./PostModal";

const MainpageStyled = styled.div`
  .mainpage_uploadicon {
    margin: 20px 20px;
  }

  .fileupload > input {
    display: none;
  }
  
  .post_upload {
    text-align: center;
    margin: 30px 15px 10px 15px;
    width: 650px;
    background-color: beige;
    border-radius: 20px;
  }
`

function Mainpage() {

    let [postData, setPostData] = useState([]);
    console.log(postData)

    useEffect(() => {
        fetch("https://instagram-spring.herokuapp.com/post")
            .then(response => response.json())
            .then(data => {
                setPostData(data);
            })
    }, [])

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handlePostData = (data) => {
      setPostData([data, postData]);
  }


  return (
    <MainpageStyled>
        <div className="post_upload">
            <img src={uploadImage} className="mainpage_uploadicon" onClick={handleOpen} alt=""/>
            <PostModal open={open} handleClose={handleClose} handlePostData={handlePostData} />

        </div>
        {
            postData.map((item, index) => (
                <Post post={item} key={item.postId} />
            ))
        }
    </MainpageStyled>
  );
}

export default Mainpage;