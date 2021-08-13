import React, {useEffect, useState} from 'react';
import './Post.css'
import {Avatar} from "@material-ui/core";
import love from '../../images/love.svg'
import comment from '../../images/comment.svg'
import share from '../../images/share.svg'

function Post({post}) {

    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/comments/${post.postId}`)
            .then(response => response.json())
            .then(data => {
                setCommentList(data);
            })
    }, [post.postId])

    const submitComments = (event) => {
        if(event.key === "Enter") {
            let comment = event.currentTarget.value;
            if(comment !== null && comment !== undefined) {
                let payload = {
                    "commentId": Math.floor(Math.random()*100000).toString(),
                    "userId": JSON.parse(localStorage.getItem("user")).uid,
                    "postId": post.postId,
                    "timeStamp": new Date().getTime(),
                    "comment": comment
                }

                const requestOptions = {
                    method: "POST",
                    headers: {'Content-type': "application/json"},
                    body: JSON.stringify(payload)
                }
                fetch("http://localhost:8080/comments", requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        setCommentList([...commentList, data])
                        event.target.value = ""
                    })
                    .catch(error => {

                    })
            }
        }
    }

  return (
    <div className="post_container">
        <div className="post_header">
            <Avatar className="post_image" src="" />
            <div className="post_username">{post.userName}</div>
        </div>
        <div>
            <img src={post.postPath} width="650px" alt=""/>
        </div>
        <div>
            <div style={{"marginLeft":"10px"}}>
                <img src={love} className="post_reactimage" alt=""/>
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
                    <div className="post_comment" key={item.id}>{item.userName}: {item.comment}</div>
                ))
            }
            <input className="post_commentbox" onKeyPress={submitComments} type="text" placeholder="Add a commnet..." />
        </div>
    </div>

  );
};

export default Post;