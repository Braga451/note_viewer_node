import {Link} from "react-router-dom"

function BackDeleteColumn(){
  const deleteAccount = () => {
    console.log("Deleted!");
  }
  return(
    <div id="back-delete-column">
      <Link to="/user">
        <button id="back">Voltar</button>
      </Link>
    <button id="delete-account" onClick={deleteAccount}>Deletar</button>
    </div>
  )
}

export default BackDeleteColumn
