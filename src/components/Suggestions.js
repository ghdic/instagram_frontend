import React, {useEffect, useState} from 'react';
import {Avatar} from "@material-ui/core";
import defaultProfile from '../images/default_userprofile.jpg'
import styled from "styled-components";

const SuggestionsStyled = styled.div`
  .suggestions_container {
    width: 325px;
    height: 290px;
    margin-top: 25px;
  }

  .suggestions_header {
    font-weight: bold;
    color: #8e8e8e;
  }

  .suggestions_body {
    height: 256px;
    width: 290px;
    margin-top: 10px;
  }

  .suggestions_friends {
    display: flex;
  }

  .suggestions_image {
    max-width: 35px;
    max-height: 35px;
  }

  .suggestions_username {
    font-weight: bold;
    margin: 10px
  }
`

function Suggestions() {

    let [suggestionList, setSuggestionList] = useState([])

    useEffect(() => {
        fetch(`https://instagram-spring.herokuapp.com/user/suggestions`)
            .then(response => response.json())
            .then(data => {
                setSuggestionList(data);
            })
    }, [])

  return (
    <SuggestionsStyled>
        <div className="suggestions_container">
            <div className="suggestions_header">
                <div>Suggestions For You</div>
            </div>
            <div className="suggestions_body">
                {
                    suggestionList.map((item, index) => (
                        <div className="suggestions_friends" key={index}>
                            <Avatar className="suggestions_image" src={item.profileImage === "" ? defaultProfile:item.profileImage} />
                            <div className="suggestions_username">{item.nickName}({item.userName})</div>
                        </div>
                    ))
                }
            </div>
        </div>
    </SuggestionsStyled>
  );
}

export default Suggestions;