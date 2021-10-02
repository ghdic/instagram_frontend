import React, {useState, useEffect} from 'react';
import {Avatar} from "@material-ui/core";
import defaultProfile from '../images/default_userprofile.jpg'
import styled from "styled-components";

const StatusBarStyled = styled.div`
  .statusbar_container {
    height: 120px;
    width: 650px;
    background-color: white;
    border: 1px solid #dbdbdb;
    margin-top: 25px;
    display: flex;
    overflow-x: scroll;
    padding: 0px 20px;
  }

  .statusbar_container::-webkit-scrollbar {
    display: none;
  }

  .statusbar_status {
    min-width: 55px;
    min-height: 55px;
    border: 1px solid #D2D2D2;
  }

  .status {
    margin: 25px 10px;
  }

  .statusbar_text {
    font-size: 12px;
    max-width: 50px;
    text-align: center;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  .statusbar_upload {
    margin: 30px 20px 30px 30px;
  }
`

function StatusBar() {
    let [statusList, setStatusList] = useState([])

    useEffect(() => {
        fetch(`https://instagram-spring.herokuapp.com/user`)
            .then(response => response.json())
            .then(data => {
                setStatusList(data);
            })
    }, [])

  return (
    <StatusBarStyled>
        <div className="statusbar_container">
            {
                statusList.map((item, index)=> (
                    <div className="status" key={index}>
                        <Avatar className="statusbar_status" src={item.profileImage === "" ? defaultProfile:item.profileImage} />
                        <div className="statusbar_text">
                            {item.nickName}
                        </div>
                    </div>
                ))
            }

        </div>
    </StatusBarStyled>
  );
}

export default StatusBar;