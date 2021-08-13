import React from 'react';
import './MainContent.css'
import {Grid} from "@material-ui/core";
import StatusBar from "../StatusBar/StatusBar";
import Mainpage from "../MainPage/Mainpage";
import InfoSection from "../InfoSection/InfoSection";
import Suggestions from "../Suggestions/Suggestions";

function MainContent() {
  return (
    <div>
        <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={6} style={{minWidth:"650px"}}>
                <StatusBar/>
                <Mainpage/>
            </Grid>
            <Grid item xs={2} style={{"marginLeft":"50px", minWidth:"300px"}}>
                <InfoSection />
                <Suggestions />
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    </div>
  );
};

export default MainContent;