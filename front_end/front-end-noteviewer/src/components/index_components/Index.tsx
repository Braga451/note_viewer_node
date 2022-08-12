import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {getCookie} from "../../static/js/cookiesAux.js";
import {requestGetTokenData} from "../../api/routes_js/user.js";
import LogoContainer from "./LogoContainer.tsx";
import RegisterLoginContainer from "./RegisterLoginContainer.tsx";
import LoginContainer from "../login_components/LoginContainer.tsx";
import RegisterContainer from "../register_components/RegisterContainer.tsx";
import "../../static/css/index.css"

function Index(){
  const [isAuth, changeAuth] = useState(false);
  useEffect(() => {
    if(getCookie("auth-token") != undefined){
      const request_get_token_data = requestGetTokenData();
      request_get_token_data.then((data) => {
        if(data.status == 200){
          changeAuth(true);
        }
      })
    }
  }, [document.cookies])
  const callbackReturn = (target) => {
      changeContainerLoginRegister(<RegisterLoginContainer callbackCreateAccount = {callbackCreateAccount} callbackLogin = {callbackLogin} />)
  }, callbackCreateAccount = (target) => {
      changeContainerLoginRegister(<RegisterContainer callbackReturn = {callbackReturn}/>)
  }, callbackLogin = (target) => {
      changeContainerLoginRegister(<LoginContainer callbackReturn = {callbackReturn}/>)
  }, [login_register_container, changeContainerLoginRegister] = useState(
      <RegisterLoginContainer callbackCreateAccount = {callbackCreateAccount} callbackLogin = {callbackLogin} />
  )
  useEffect(() => {
    document.title = "NoteViewer";
  })
  if(isAuth){
    return (<Navigate to="/user" />)
  }
  else{
    return(
      <div id="container-group">
        <LogoContainer />
        {login_register_container}
      </div>
    )
  }
}

export default Index
