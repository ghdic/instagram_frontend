import React, {useState, useEffect} from 'react';
import './StatusBar.css'
import {Avatar} from "@material-ui/core";
import statusimg from '../../images/pp1.png'
import uploadimage from '../../images/statusadd.png'

function StatusBar() {
    let [statusList, setStatusList] = useState([])

    let getData = () => {
        let data = [
            {
                'username':'anidya_bunny',
                'imageURL':'../../images/pp1.png'
            },
            {
                'username':'testing',
                'imageURL':'../../images/pp1.png'
            },
            {
                'username':'aaaa',
                'imageURL':'../../images/pp1.png'
            },
            {
                'username':'bbbb',
                'imageURL':'../../images/pp1.png'
            },
            {
                'username':'cccc',
                'imageURL':'../../images/pp1.png'
            }
        ]
        setStatusList(data)
    }

    useEffect(() => {
        getData()
    }, [])

  return (
    <div>
        <div className="statusbar_container">
            <img src={uploadimage} className="statusbar_upload" width="55px" height="55px" alt=""/>
            {
                statusList.map((item, index)=> (
                    <div className="status" key={index}>
                        <Avatar className="statusbar_status" src={statusimg} />
                        <div className="statusbar_text">
                            {item.username}
                        </div>
                    </div>
                ))
            }

        </div>
    </div>
  );
};

export default StatusBar;