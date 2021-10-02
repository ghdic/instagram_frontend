import React, { useContext } from "react";
import {Avatar} from "@material-ui/core";
import styled from 'styled-components';
import { AppContext } from "../App";
import default_profile from '../images/default_userprofile.jpg'

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
  const {user} = useContext(AppContext);

  let userProfileImageUpdate = () => {
    
  }

  return (
    <InfoSectionStyled>
        <div className="info_container">
            <Avatar onClick={} src={user.profileImage === "" ? default_profile:user.profileImage} className="info_image" />
            <div className="info_content">
                <div className="info_username">{user.nickName}</div>
                <div className="info_description">{user.userName}</div>
            </div>
        </div>
    </InfoSectionStyled>
  );
}

export default InfoSection;