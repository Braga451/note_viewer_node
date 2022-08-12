const route = `${import.meta.env.VITE_SERVER_HOST}/notes`

const requestGetNotes = async (username = "", offset = "", limit = "") => {
  const path = `${route}/get_user_notes/${username}/${offset}/${limit}`,
  request = await fetch(path, {
      Method : "GET",
      credentials : "include"
  }),
  json_return = await request.json();
  return json_return
}

const requestInsertNotes = async (content = "") => {
  const path = `${route}/create_note`,
  request = await fetch(path, {
    method : "POST",
    credentials : "include",
    headers: {
      "Accept" : "application/json",
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      content : content
    })
  }),
  json_return = await request.json()
  return json_return;
}

const requestDeleteNote = async (note_id = "") => {
  const path = `${route}/delete_note`,
  request = await fetch(path, {
    method : "DELETE",
    credentials : "include",
    headers: {
      "Accept" : "application/json",
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      note_id : note_id
    })
  }),
  json_return = await request.json()
  return json_return;
} 

export {requestGetNotes, requestInsertNotes, requestDeleteNote}
