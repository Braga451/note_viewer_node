import {useState, useEffect} from "react"
import {requestGetNotes, requestInsertNotes} from "../../api/routes_js/notes.js";
import UserInfo from "./UserInfo.tsx"
import Note from "./Note.tsx"
import DefaultImg from "../../static/images/default_user.png"
import SettingsIicon from "../../static/images/settings.png"
interface IProfileContainer{
  isTheUser: boolean;
  userImg: string;
  userName: string;
}

function ProfileContainer(props : IProfileContainer){
  const [array_notes, changeArrayNotes] = useState([]),
  insertNote = (target) => {
        const input_note = prompt("Digite o que deseja que seja inserido"),
        request_insert_notes = requestInsertNotes(input_note);
        request_insert_notes.then((json) => {
          if(json.status == 200){
              location.reload();
            }
          else{
            alert(json.message);
          }
          })
        };
  useEffect(() => {
    if(props.userName != "Não encontrado"){
      const request_notes = requestGetNotes(props.userName, "0", "10");
      request_notes.then((json) => {
        if(json.status == 200){
          const notes_append = [];
          json.notes.forEach((notes) => {
            notes_append.push(<Note userImg={props.userImg} noteId={notes.id} key={notes.id} noteContent={notes.content} isTheUser={props.isTheUser}/>)
          })
          changeArrayNotes(notes_append);
        }
        else{
          alert(json.message)
        }
      })
    }
  }, [props.userName])
  return(
    <div id="profile-info-area">
        <UserInfo isTheUser={props.isTheUser} userImg={props.userImg} userName={props.userName} />
      <div id="note-area">
        {array_notes}
      </div>
    {props.isTheUser ? <button onClick={insertNote}>Inserir Nota</button> : <p></p>}
    </div>
  )
}

export default ProfileContainer
