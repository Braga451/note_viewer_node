import {useRef, useState, useEffect} from "react"
import {requestCreateUser} from "../../api/routes_js/user.js"
import {setAuthToken, removeAuthToken} from "../../static/js/cookiesAux.js"
import {Navigate} from "react-router-dom"
import ArrowBackButton from "../index_components/ArrowBackButton"

function RegisterContainer(props){
    const user_ref = useRef(),
    email_ref = useRef(),
    password_ref = useRef(), 
    cleanRef = (array_ref) => {
      array_ref.forEach((ref) => {
          ref.current.value = ""
      })
    },
    [form_data, updateData] = useState({}),
    [return_form_data, updateReturnFormData] = useState({}),
    submitData = (target) => {
      target.preventDefault();
      updateData(
      {
          username : user_ref.current.value,
          user_password : password_ref.current.value,
          email : email_ref.current.value 
      });
        cleanRef([user_ref, email_ref, password_ref]);
    }
    useEffect(() => {
      if(form_data.username != undefined && form_data.user_password != undefined && form_data.email != undefined){ 
        const return_json = requestCreateUser(form_data);
        return_json.then((e) => updateReturnFormData(e));
        updateData({});
      }
      return;
    }, 
      [form_data])
    useEffect(() => {
      if(return_form_data.message != undefined){
        alert(return_form_data.message);
        updateReturnFormData({})
      }
      if(return_form_data.status == 200){ // set token and redirect to /user if here 
        setAuthToken(return_form_data.token);
        document.location = "/user"
      }
    }, [return_form_data])
    return(
        <form onSubmit={submitData} className="register-login-form">
            <ArrowBackButton callbackReturn = {props.callbackReturn}/>
            <input type="text" ref={user_ref} placeholder="NOME DE USUARIO" required maxLength="200" />
            <input type="email" ref={email_ref} placeholder="EMAIL" required maxLength="200" />
            <input type="password" ref={password_ref} placeholder="SENHA" required maxLength="200" />
            <input type="submit" value="CRIAR CONTA" />
        </form>
    )
}

export default RegisterContainer
