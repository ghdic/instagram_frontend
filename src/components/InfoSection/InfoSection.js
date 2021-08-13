import React from 'react';
import './InfoSection.css'
import {Avatar} from "@material-ui/core";
import imageSrc from '../../images/pp1.png'

function InfoSection() {
  return (
    <div>
        <div className="info_container">
            <Avatar src={imageSrc} className="info_image" />
            <div className="info_content">
                <div className="info_username">anindya_bunny</div>
                <div className="info_description">Description</div>
            </div>
        </div>
    </div>
  );
};

export default InfoSection;