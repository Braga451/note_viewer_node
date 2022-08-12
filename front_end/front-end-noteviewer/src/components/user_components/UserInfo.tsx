import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import DefaultImg from "../../static/images/default_user.png"
import SettingsIcon from "../../static/images/settings.png"
interface IUserInfo{
  isTheUser: boolean;
  userImg: string;
  userName: string;
}

function UserInfo(props : IUserInfo){
  const [image, changeImage] = useState(null);
  useEffect(() => {
    if(props.userImg == DefaultImg){
      changeImage(<img src={DefaultImg} id="user-img"/>)
    }
    else if(image != props.userImg){
      const b64_string = `data:image/jpeg;base64,${props.userImg}`
      changeImage(<img src={b64_string} id="user-img" />)
    }
  }, [props.userImg])
  return(
    <div id="user-info-area">
      {props.isTheUser ? <Link to="/config" id="config-redirect"> <img src={SettingsIcon} id="img-config"/> </Link> : <p></p>}
      <div id="image-name-info">
        {image}
        <p id="user-name">{props.userName}</p>
      </div>
    </div>
  )
}

export default UserInfo
