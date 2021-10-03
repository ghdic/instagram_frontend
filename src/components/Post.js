import React, { useContext, useEffect, useRef, useState } from "react";
import {Avatar} from "@material-ui/core";
import love from '../images/love.svg'
import comment from '../images/comment.svg'
import share from '../images/share.svg'
import styled from "styled-components";
import default_profile from '../images/default_userprofile.jpg'
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { AppContext } from "../App";
import PostModal from "./PostModal";

const PostStyled = styled.div`

  border: 1px solid #dbdbdb;
  width: 650px;
  margin: 60px 15px;
  
  .post_container {
    width: 650px;
    border: 1px solid #dbdbdb;
    background-color: white;
    margin-top: 25px;
  }

  .post_header {
    height: 60px;
    border-bottom: 1px solid #dbdbdb;
    display: flex;
  }

  .post_image {
    min-width: 30px;
    min-height: 30px;
    margin: 10px;
  }
  
  .post_content {
    margin: 10px 10px 10px 20px;
    font-size: 20px;
    font-weight: 500;
  }

  .post_username {
    font-weight: bold;
    margin-top: 20px;
  }

  .post_reactimage {
    width: 25px;
    height: 25px;
    margin: 5px;
  }

  .post_comment {
    margin: 10px;
  }

  .post_commentbox {
    height: 56px;
    width: 98%;
    border: 1px solid #dbdbdb;
    font-size: 18px;
    padding-left: 10px;
  }
  
  .post_icon {
    width: 25px;
    height: 25px;
    margin: 20px 5px;
    color: cornflowerblue;
    cursor: pointer;
  }

  .comment_icon_wrap {
    display: inline-block;
    margin-left: 8px;
  }
  
  .comment_icon {
    position: relative;
    top: 8px;
    cursor: pointer;
  }
`

function Post({post, updatePostData, deletePostData}) {

    const [commentList, setCommentList] = useState([]);
    const [fixComment, setFixComment] = useState(0);
    const {user} = useContext(AppContext);
    const commentInput = useRef();
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    }
    const handleClose = () => {
      setOpen(false);
    }

    useEffect(() => {
        fetch(`https://instagram-spring.herokuapp.com/comments/${post.postId}`)
            .then(response => response.json())
            .then(data => {
                setCommentList(data);
              console.log(commentList);
            })
    }, [post.postId])

    const submitComments = (event) => {
        if(event.key === "Enter") {
            let comment = event.currentTarget.value;
            if(comment !== null && comment !== undefined) {
                let payload = fixComment === 0 ? {
                    "postId": post.postId,
                    "uid": user.uid,
                    "comment": comment
                } : {
                  "uid": user.uid,
                  "comment": comment
                }

                const requestOptions = {
                    method: "POST",
                    headers: {'Content-type': "application/json"},
                    body: JSON.stringify(payload)
                }
                let requestUrl = fixComment === 0 ? "https://instagram-spring.herokuapp.com/comments":`https://instagram-spring.herokuapp.com/comments/${fixComment}`;
                fetch(requestUrl, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        if(fixComment === 0)
                          setCommentList([...commentList, data])
                        else {
                          let items = [...commentList];
                          items[items.findIndex(el => el.commentId === data.commentId)] = data;
                          setCommentList(items)
                        }
                        event.target.value = ""
                        setFixComment(0)
                    })
                    .catch(error => {

                    })
            }
        }
    }

    const onClickLike = () => {

      const requestOptions = {
        method: "POST",
        headers: {'Content-type': "application/json"},
        body: "{}"
      }
      fetch(`https://instagram-spring.herokuapp.com/post/like/${post.postId}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          updatePostData(data);
        })
        .catch(error => {

        })
    }

    const onClickDeletePost = () => {
      if(!confirm("정말 삭제하시겠습니까?"))
        return
      let payload = {
        "uid": user.uid
      }
      const requestOptions = {
        method: "DELETE",
        headers: {'Content-type': "application/json"},
        body: JSON.stringify(payload)
      }
      fetch(`https://instagram-spring.herokuapp.com/post/${post.postId}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          deletePostData(post);
        })
        .catch(error => {

        })
    }

    const onClickUpdateComment = (item) => {
      console.log(commentInput.current);
      commentInput.current.value = item.comment;
      setFixComment(item.commentId)
    }

    const onClickDeleteComment = (commentId) => {
      if(!confirm("정말 삭제하시겠습니까?"))
        return
      let payload = {
        "uid": user.uid
      }
      const requestOptions = {
        method: "DELETE",
        headers: {'Content-type': "application/json"},
        body: JSON.stringify(payload)
      }
      fetch(`https://instagram-spring.herokuapp.com/comments/${commentId}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          let items = [...commentList];
          items.splice(items.findIndex(el => el.commentId === commentId), 1);
          setCommentList(items);
        })
        .catch(error => {

        })
    }

  return (
    <PostStyled className="post_container">
        <div className="post_header">
            <Avatar className="post_image" src={post.user.profileImage === "" ? default_profile:post.user.profileImage } />
            <div className="post_username">{post.user.nickName}</div>
          {
            post.user.uid === user.uid ? (<div><UpdateIcon className="post_icon" onClick={handleOpen} />
              <DeleteIcon className="post_icon" onClick={onClickDeletePost} /></div>):null
          }

        </div>
        <div>
            <img src={post.postPath} width="650px" alt=""/>
          <div className="post_content">{post.content}</div>
        </div>
        <div>
            <div style={{"marginLeft":"10px"}}>
                <img src={love} className="post_reactimage" onClick={onClickLike} style={{cursor:"pointer"}} alt=""/>
                <img src={comment} className="post_reactimage" alt=""/>
                <img src={share} className="post_reactimage" alt=""/>
            </div>
            <div style={{"fontWeight":"bold", "marginLeft":"20px"}}>
                {post.likeCount} likes
            </div>
        </div>
        <div>
            {
                commentList.map((item, index) => (
                    <div className="post_comment"
                         key={item.commentId}>{item.user.nickName}: {item.comment}
                      {item.user.uid === user.uid ?
                        (<div className="comment_icon_wrap"><UpdateIcon className="comment_icon" onClick={()=>onClickUpdateComment(item)} />
                      <DeleteIcon className="comment_icon" onClick={()=>onClickDeleteComment(item.commentId)} /></div>):null
                      }</div>
                ))
            }
            <input className="post_commentbox" ref={commentInput} onKeyPress={submitComments} type="text" placeholder="Add a commnet..." />
        </div>
      <PostModal open={open} handleClose={handleClose} handlePostData={updatePostData} post={post} />
    </PostStyled>

  );
}

export default Post;