import {useState, useEffect} from "react"
import DefaultUserImg from "../../static/images/default_user.png"
import {requestDeleteNote} from "../../api/routes_js/notes"
import trashIcon from "../../static/images/trash.png"
interface INote{
  noteContent: string;
  userProfilePic: string;
  isTheUser: boolean;
  noteId: int;
}

function Note(props : INote = INote){
  const [image, changeImage] = useState(null);
  useEffect(() => {
    if(props.userImg == DefaultUserImg){
      changeImage(DefaultUserImg)
    }
    else if(image != props.userImg){
      const b64_string = `data:image/jpeg;base64,${props.userImg}`
      changeImage(b64_string);
    }
  }, [props.userImg])
  const deleteNote = () => {
     const request_delete_note = requestDeleteNote(props.noteId);
      request_delete_note.then((json) => {
        if(json.status == 200){
          location.reload();
        }
        else{
          alert(json.message);
        }
      })
    console.log(image)
  }
  return(
    <div className="note">
    <img src={image} className="profile-pic-note"/>
      <p>{props.noteContent}</p>
      {props.isTheUser ? <div className="delete-note" onClick={deleteNote}><img src={trashIcon} className="trash-icon"/></div> : null}
    </div>
  )
}

export default Note
