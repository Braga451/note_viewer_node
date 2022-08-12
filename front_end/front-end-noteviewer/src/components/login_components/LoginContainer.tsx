import {useRef, useState, useEffect} from "react"
import {requestLoginUser} from "../../api/routes_js/user.js" 
import {setAuthToken} from "../../static/js/cookiesAux.js"
import ArrowBackButton from "../index_components/ArrowBackButton"

function LoginContainer(props){
    const user_ref = useRef(), 
    password_ref = useRef(),
    [data, updateFormData] = useState({}),
    [request_return, updateRequestReturn] = useState({}),
    cleanValues = (array_ref) => {
      array_ref.forEach((ref) => {
        ref.current.value = ""
      })
    },
    submitData = (target) => {
      target.preventDefault();
      updateFormData({
        method: "password",
        username : user_ref.current.value,
        user_password : password_ref.current.value
      })
      cleanValues([user_ref, password_ref])
    };
    useEffect(() => {
      if(data.username != undefined && data.user_password != undefined){
        const request = requestLoginUser(data);
        request.then((return_data) => {
          updateRequestReturn(return_data);
          updateFormData({});
        })
      }
    }, [data])
    useEffect(() => {
    if(request_return.message != undefined){
      alert(request_return.message);
      updateRequestReturn({})
      }
    if(request_return.status == 200){
        setAuthToken(request_return.token);
        document.location = "/user";  
    }
    }, [request_return]) 
    return (
        <form onSubmit={submitData} className="register-login-form">
            <ArrowBackButton callbackReturn = {props.callbackReturn}/>
            <input type="text" ref={user_ref} placeholder="NOME DE USUARIO" required maxLength="200" />
            <input type="password" ref={password_ref} placeholder="SENHA" required maxLength="200" />
            <input type="submit" value="ENTRAR"/>
        </form>
    )
}

export default LoginContainer
