import React, { useContext } from "react";
import {Avatar} from "@material-ui/core";
import styled from 'styled-components';
import { AppContext } from "../App";
import default_profile from '../images/default_userprofile.jpg'
import { storage } from "../firebase";

const InfoSectionStyled = styled.div`
  .info_container {
    width: 300px;
    height: 56px;
    margin-top: 50px;
    display: flex;
  }

  .info_image {
    min-width: 60px;
    min-height: 60px;
    cursor: pointer;
  }

  .info_content {
    margin-left: 15px;
  }

  .info_username {
    margin: 5px;
    font-weight: bold;
  }

  .info_description {
    margin: 5px;
  }
`

function InfoSection() {
  const {user, setUser} = useContext(AppContext);
  console.log(user);

  let userProfileImageUpdate = (e) => {
    let image = e.target.files[0];
    if(image === null || image === undefined)
      return;
    let uploadTask = storage.ref("profiles").child(image.name).put(image);
    uploadTask.on(
      "state_change",
      function (snapshot) {
        let progress_percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress_percent);
      },
      function (error) {
        console.log(error);
      },
      function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log(downloadURL)
          let payload = {
            "userName": user.userName,
            "nickName": user.nickName,
            "profileImage": downloadURL
          }
          console.log(payload)

          const requestOptions = {
            method: "POST",
            headers: {'Content-type': "application/json"},
            body: JSON.stringify(payload)
          }
          fetch(`https://instagram-spring.herokuapp.com/user/${user.uid}`, requestOptions)
            .then(response => response.json())
            .then(data => {
              setUser(data);
              localStorage.setItem("user", JSON.stringify(data));
            })
            .catch(error => {

            })
        })
      }
    )
  }

  return (
    <InfoSectionStyled>
        <div className="info_container">
          <input id="profile_image_upload" onChange={userProfileImageUpdate} type="file" style={{display:"none"}} />
          <label htmlFor="profile_image_upload">
            <Avatar src={user.profileImage === "" ? default_profile:user.profileImage} className="info_image" />
          </label>
            <div className="info_content">
                <div className="info_username">{user.nickName}</div>
                <div className="info_description">{user.userName}</div>
            </div>
        </div>
    </InfoSectionStyled>
  );
}

export default InfoSection;