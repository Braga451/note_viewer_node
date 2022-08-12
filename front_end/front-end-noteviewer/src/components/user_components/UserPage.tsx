import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import {requestGetTokenData, requestGetUserData, requestGetImageByPath} from "../../api/routes_js/user.js";
import "../../static/css/user_page.css"
import DefaultUserImg from "../../static/images/default_user.png"
import SearchContainer from "./SearchContainer.tsx"
import ProfileContainer from "./ProfileContainer.tsx"

function UserPage(){
  const username = useParams()["*"].split("/")[0],
  [profile_data, changeProfileData] = useState({}),
  [isAuth, changeAuth] = useState(false);
  useEffect(() => {
    const token_data = requestGetTokenData();
    token_data.then((td_result) => {
      if(td_result.status == 200){
        changeAuth(true);
        if(username == "" || username == td_result.token_data.username){
          const username_request = td_result.token_data.username,
          user_request = requestGetUserData(username_request);
          user_request.then((td2_result) => {
            if(td2_result.status == 200){
              const user_request = requestGetUserData(username_request);
              user_request.then((td2_result) => {
              if(td2_result.status == 200){
                const b64_image = requestGetImageByPath({path_img: td2_result.data.path_img});
                b64_image.then((img) => {
                  if(img.status == 200){
                    changeProfileData({
                      isTheUser: true,
                      userImg: img.base64,
                      userName: td2_result.data.username
                    })
                  }
                else{
                    changeProfileData({
                    isTheUser: true,
                    userImg: DefaultUserImg,
                    userName: td2_result.data.username
                  })
                }

              })
              }
              })
            }
            else{
              changeProfileData({
                isTheUser : false,
                userImg : DefaultUserImg,
                userName: "Não encontrado"
              })
            }
          })
        }
        else{
          const user_request = requestGetUserData(username);
          user_request.then((td2_result) => {
            if(td2_result.status == 200){
              const b64_image = requestGetImageByPath({path_img: td2_result.data.path_img});
              b64_image.then((img) => {
                if(img.status == 200){
                  changeProfileData({
                    isTheUser: false,
                    userImg: img.base64,
                    userName: td2_result.data.username
                  })
                }
                else{
                  changeProfileData({
                    isTheUser: false,
                    userImg: DefaultUserImg,
                    userName: td2_result.data.username
                  })
                }

              })
            }
            else{
              changeProfileData({
                isTheUser : false,
                userImg : DefaultUserImg,
                userName: "Não encontrado"
              })
            }
          })
        }
      }
      else{
        alert(td_result.message);
      }
    })
  }, [username])
  // for future: console.log(username === "");
  return(
    isAuth ? <div id="profile-area"> <SearchContainer /> <ProfileContainer isTheUser={profile_data.isTheUser} userImg={profile_data.userImg} userName = {profile_data.userName}/> </div> : <div></div>
  )
}

export default UserPage
