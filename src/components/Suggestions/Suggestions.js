import React from 'react';
import './Suggestions.css'
import {Avatar} from "@material-ui/core";
import imageSrc from "../../images/pp1.png"

function Suggestions() {
  return (
    <div>
        <div className="suggestions_container">
            <div className="suggestions_header">
                <div>Suggestions For You</div>
            </div>
            <div className="suggestions_body">
                <div className="suggestions_friends">
                    <Avatar className="suggestions_image" src={imageSrc} />
                    <div className="suggestions_username">Friend 1</div>
                </div>
                <div className="suggestions_friends">
                    <Avatar className="suggestions_image" src={imageSrc} />
                    <div className="suggestions_username">Friend 1</div>
                </div>
                <div className="suggestions_friends">
                    <Avatar className="suggestions_image" src={imageSrc} />
                    <div className="suggestions_username">Friend 1</div>
                </div>
                <div className="suggestions_friends">
                    <Avatar className="suggestions_image" src={imageSrc} />
                    <div className="suggestions_username">Friend 1</div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Suggestions;