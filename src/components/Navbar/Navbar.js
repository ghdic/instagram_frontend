import React from 'react';
import './Navbar.css'
import {Grid, Avatar} from "@material-ui/core";
import insta_logo from '../../images/logoinsta.png'
import home from '../../images/home.svg'
import message from '../../images/message.svg'
import find from '../../images/find.svg'
import react from '../../images/love.svg'
import pp from '../../images/pp1.png'


function Navbar() {
  return (
    <div>
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
                    <Avatar className={"navbar_img"} src={pp} style={{"maxWidth":"25px", "maxHeight":"25px"}} />
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </div>

    </div>
  );
};

export default Navbar;