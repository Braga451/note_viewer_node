function LogoutColumn(){
  const logOut = () => {
    console.log("Logout");
  }

  return(
    <div id="logout-column">
      <button onClick={logOut}>SAIR</button>    
    </div>
  )
}

export default LogoutColumn
