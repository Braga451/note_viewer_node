import {validateCookie, sanitizateArray, sanitizateNoteContent,returnTokenData} from "../config_files/auth.js";
import {checkIfUserExistByIdToken} from "./UsersController.js";
import UsersModel from "../models/UsersModel.js";
import NotesModel from "../models/NotesModel.js";

const getUserNotes = async (req, res) => {
  const {user_name, offset, limit} = req.params,
  validate_cookie = validateCookie(req.cookies);
  if(!(validate_cookie.result)){
    return res.status(401).send(JSON.stringify({
      status: 401,
      message: "Forbidden"
    }))
  }
  const token_validate = await checkIfUserExistByIdToken(req.cookies["auth-token"]);
  if(!token_validate){
    return res.status(500).send(JSON.stringify({
      status: 500,
      message: "Error in token"
    }))
  }
  const user = sanitizateArray([req.params.user_name])[0],
  user_query = await UsersModel.findOne({
    where : {
      username: user
    }
  })
  if(!user_query){
    return res.status(404).send(JSON.stringify({
      status: 404,
      message: "User not found"
    }))
  }
  if(isNaN(Number(offset)) || isNaN(Number(limit))){
    return res.status(500).send(JSON.stringify({
      status: 500,
      message: "Invalid offset or limit"
    }))
  } // user to username ok
  const notes_by_name = await NotesModel.findAll(
    {
      include : [
      {
        model: UsersModel, 
        required: true,
        where : {
          username: user
        }
      }],
      offset: Number(offset),
      limit: Number(limit)
    })
  return res.status(200).send(JSON.stringify({
    status: 200,
    message: "Ok",
    notes : notes_by_name.map((nm) => {
      delete nm.dataValues.UsersModel;
      delete nm.dataValues.user_id;
      return nm.dataValues;
    }) // nm = NotesModel 
  }))
}

const createNote = async (req, res) => {
  const validate_cookie = validateCookie(req.cookies);
  if(!(validate_cookie.result)){
    return res.status(401).send(JSON.stringify({
      status: 401,
      message: "Forbidden"
    }))
  }
  const token_validate = await checkIfUserExistByIdToken(req.cookies["auth-token"]);
  if(!token_validate){
    return res.status(500).send(JSON.stringify({
      status: 500,
      message: "Error in token"
    }))
  }
  const {content} = req.body;
  if(content == undefined || content.length == 0 || content.length > 350){
    return res.status(500).send(JSON.stringify({
      status: 500,
      message: "Error in content"
    }))
  }
  const note_content = sanitizateNoteContent(content),
  {id} = returnTokenData(req.cookies["auth-token"]);
  await NotesModel.create({
    content : note_content,
    user_id : id
  });
  return res.status(200).send(JSON.stringify({
    status: 200,
    message: "Note created"
  }))
}

const deleteNote = async (req, res) => {
  const validate_cookie = validateCookie(req.cookies);
  if(!(validate_cookie.result)){
    return res.status(401).send(JSON.stringify({
      status: 401,
      message: "Forbidden"
    }))
  }
  const token_validate = await checkIfUserExistByIdToken(req.cookies["auth-token"]);
  if(!token_validate){
    return res.status(500).send(JSON.stringify({
      status: 500,
      message: "Error in token"
    }))
  }
  const {note_id} = req.body;
  if(note_id == undefined || isNaN(Number(note_id))){
    return res.status(500).send(JSON.stringify({
      status: 500,
      message: "Undefined note id"
    }))
  }
  const {id} = returnTokenData(req.cookies["auth-token"]);
  const result = await NotesModel.destroy({
    include : [
    {
      model: UsersModel, 
      required: true
    }],
    where : {
      user_id: id,
      id : note_id
    }
  });
  if(!result){
    return res.status(404).send(JSON.stringify({
      status: 404,
      message: "Note not found"
    }))
  }
  else{
    return res.status(200).send(JSON.stringify({
      status: 200,
      message: "Note deleted"
    }))
  }
}

export {getUserNotes, createNote, deleteNote}
