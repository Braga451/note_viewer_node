import "../../static/css/login_register.css"

function RegisterLoginContainer(props){
  return(
    <div id="login-register-area">
        <div className="register-login-buttons">
          <button onClick={props.callbackCreateAccount}>CRIAR CONTA</button>
        </div>
        <div className="register-login-buttons">
          <button onClick={props.callbackLogin}>ENTRAR</button>
        </div>
    </div>
  )
}

export default RegisterLoginContainer
