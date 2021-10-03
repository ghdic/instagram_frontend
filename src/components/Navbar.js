import React, { useContext } from "react";
import {Grid, Avatar} from "@material-ui/core";
import insta_logo from '../images/logoinsta.png'
import home from '../images/home.svg'
import message from '../images/message.svg'
import find from '../images/find.svg'
import react from '../images/love.svg'
import pp from '../images/pp1.png'
import styled from "styled-components";
import LogoutIcon from '@mui/icons-material/Logout';
import { AppContext } from "../App";
import { Logout } from "../auth/auth";

const NavbarStyled = styled.div`
  .navbar_barContent {
    height: 54px;
    background-color: white;
    border-bottom: 1px solid #dbdbdb;
  }

  .navbar_logo {
    margin-top: 10px;
  }

  .navbar_img {
    margin:15px 10px;
  }

  .nav_searBar {
    height: 30px;
    width: 215px;
    margin-top: 10px;
    border: 1px solid #dbdbdb;
    text-align: center;
    background-color: #fafafa;
    border-radius: 5px;
  }
`

function Navbar() {
  const {setUser} = useContext(AppContext);

  return (
    <NavbarStyled>
        <div className={"navbar_barContent"}>
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={3}>
                    <img src={insta_logo} className={"navbar_logo"} width={"105px"} alt=""/>
                </Grid>
                <Grid item xs={3}>
                    <input type="text" className={"nav_searBar"} placeholder={"Search"}/>
                </Grid>
                <Grid item xs={3} style={{'display':'flex'}}>
                    <img className={"navbar_img"} src={home} width={"25px"} alt=""/>
                    <img className={"navbar_img"} src={message} width={"25px"} alt=""/>
                    <img className={"navbar_img"} src={find} width={"25px"} alt=""/>
                    <img className={"navbar_img"} src={react} width={"25px"} alt=""/>
                    <LogoutIcon className={"navbar_img"} style={{cursor: "pointer"}} onClick={() => Logout(setUser)} />
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </div>

    </NavbarStyled>
  );
}

export default Navbar;