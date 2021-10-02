import React from 'react';
import {Grid} from "@material-ui/core";
import StatusBar from "./StatusBar";
import Mainpage from "./Mainpage";
import InfoSection from "./InfoSection";
import Suggestions from "./Suggestions";
import styled from "styled-components";

const MainContentStlyed = styled.div`
  body {
    background-color: #fafafa;
  }
`

function MainContent() {
  return (
    <MainContentStlyed>
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
    </MainContentStlyed>
  );
}

export default MainContent;