import {useRef, useState, useEffect} from "react"
import {requestPutUser, requestGetTokenData} from "../../api/routes_js/user.js"
import {setAuthToken, removeAuthToken} from "../../static/js/cookiesAux.js";
import DefaultUserImg from "../../static/images/default_user.png"

function ModifyUserColumn(){
  const [get_token_data, GetTokenData] = useState({}), 
  [submited_data, changeSubmitedData] = useState({});
  useEffect(() => {
    if(get_token_data.status == undefined){  
      const request_token_data = requestGetTokenData();
      request_token_data.then((json) => {
        GetTokenData(json)
      })
    }
    else{
      if(get_token_data.status != 200){
        alert(get_token_data.message);
        window.location = "/"
      }
    }
  }, [get_token_data])
  const image_input = useRef(), 
    username_input = useRef(), 
    password_input = useRef(), 
    email_input = useRef(),
    imageHandler = (image : File) => { 
      const reader = new FileReader();
      reader.readAsBinaryString(image);
      return reader
    },
    handleForms = (e) => {
      e.preventDefault();
      const data_to_upload = {
        image_ext: image_input.current.files.length == 1 ?  image_input.current.files[0].name.split(".")[1] :  null,
        image_data : image_input.current.files.length == 1 ? imageHandler(image_input.current.files[0]) : null,
        username : username_input.current.value,
        user_password : password_input.current.value,
        email : email_input.current.value
      };
      if(data_to_upload.image_data){
        data_to_upload.image_data.onload = (e) => {
          data_to_upload.image_data = [data_to_upload.image_ext, btoa(data_to_upload.image_data.result)];
          submitData(data_to_upload);
        }
      }
      else{
        submitData(data_to_upload)
      }
  },
  submitData = (data) => {
    if(get_token_data.status == 200){
      const request_put_user = requestPutUser(data);
      request_put_user.then((json) => {
        alert(json.message);
        if(json.status == 200){
          setAuthToken(json.token);
          window.location = "/user"
        }
      })
    }
  }
  return(
    <div id="modify-user-column">
      <form id="forms-modify-user" encType="multipart/form-data">
        <label htmlFor="image-upload">
          <img id="default-user-img" src={DefaultUserImg} />
        </label>
        <input id="image-upload" type="file" accept="image/*" ref={image_input} />
        <div id="form-itens" onSubmit={handleForms}>
          <input type="text" placeholder="NOME DE USUARIO" maxLength="250" ref={username_input} />
          <input type="password" placeholder="SENHA" maxLength="250" ref={password_input} />
          <input type="email" placeholder="EMAIL" ref={email_input} />
          <input type="submit" value="ALTERAR"  onClick={handleForms}/>
        </div>
      </form>
    </div>
  )
}

export default ModifyUserColumn
