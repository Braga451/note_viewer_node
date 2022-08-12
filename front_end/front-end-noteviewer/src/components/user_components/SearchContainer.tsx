import {useRef} from "react"
import {useNavigate} from "react-router-dom"
import Search from  "../../static/images/search.png"

function SearchContainer(){
  const submit_bar = useRef(), navigate = useNavigate(),
  submitData = (e) => {
    e.preventDefault();
    navigate(`/user/${submit_bar.current.value}`);
    submit_bar.current.value = "";
  };
  return(
    <div id="search-user" onSubmit={submitData}>
      <form>
        <div id="search-bar">
          <img src={Search} onClick={submitData}/>
          <input type="text" ref={submit_bar} placeholder="PROCURAR USUARIO" maxLength="200"/>
        </div>
      </form>
    </div>
    )
  }

export default SearchContainer
