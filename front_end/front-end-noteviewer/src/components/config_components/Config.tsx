import BackDeleteColumn from "./BackDeleteColumn"
import ModifyUserColumn from "./ModifyUserColumn"
import LogoutColumn from "./LogoutColumn"
import "../../static/css/config.css"

function Config(){
  return(
    <div id="container-group">
      <div id="area-config">
        <BackDeleteColumn />
        <ModifyUserColumn />
        <LogoutColumn />
      </div>
    </div>
  )
}

export default Config
