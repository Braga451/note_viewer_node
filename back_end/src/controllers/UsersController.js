import {cryptPassword, checkPassword, generateToken, validateCookie, returnTokenData, sanitizateArray, validateEmail} from "../config_files/auth.js";
import imageSave from "../config_files/imageSave.js";
import imageRetrive from "../config_files/imageRetrive.js";
import UsersModel from "../models/UsersModel.js";
import {Op} from "sequelize";

/*console.log(generateToken({
  id : 1
}))*/

async function checkIfUserExistByIdToken(token = ""){
  const {id} = returnTokenData(token), data = await UsersModel.findOne({
    where: {
      id: id
    }
  });
  // console.log(data); .dataValues to retrive data
  if(data == null){
    return false;
  }
  else{
    return true;
  }
}

const getRetriveImageByPath = async (req, res) => {
  if(validateCookie(req.cookies).result == false){
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
  if(req.body.path_img == undefined){
    return res.status(500).send(JSON.stringify({
      status: 500,
      message: "Undefined image"
    }))
  }
  return res.status(200).send(JSON.stringify(imageRetrive(req.body.path_img)))
}

const getReturnTokenData = async (req, res) => {
  if(validateCookie(req.cookies).result == false){
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
  return res.status(200).send(JSON.stringify({
    status: 200,
    message: "Ok",
    token_data: returnTokenData(req.cookies["auth-token"])
  }))
}

const getUser = async (req, res) => {
  if(req.params.userName == undefined){
    return res.status(404).send(JSON.stringify({
      status: 404,
      message: "User not found"
    }))
  }
  if(validateCookie(req.cookies).result == false || req.params.userName.length > 200){
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
  const user = sanitizateArray([req.params.userName])[0], 
    user_query = await UsersModel.findOne({
      where: {
        username: user
      }
    }
  );
  if(user_query){
    const {id, username, path_img} = user_query.dataValues;
    return res.status(200).send(JSON.stringify({
      status: 200,
      message: "User found",
      data : {
        id: id,
        username: username,
        path_img: path_img
      }
    }));
  }
  else{
    return res.status(404).send(JSON.stringify({
      status: 404,
      message: "User not found"
    }))
  }
}

const createUser = async (req, res) => {
  const array_req = [sanitizateArray([req.body.username])[0], req.body.email, req.body.user_password, req.body.path_img];
  for(let x = 0; x < array_req.length; x++){
    if(x != 3){
      if(!array_req[x]){
        return res.status(500).send(JSON.stringify({
          status: 500,
          message: "Not null parameter not defined"
        }))
      }
    }
  }
  if(array_req[0].length == 0 || array_req[0].length > 200){
    return res.status(500).send(JSON.stringify({
      status: 500,
      message: "Username out of length"
    }))
  }
  if(array_req[2].length == 0 || array_req[2].lenght > 40){
    return res.status(500).send(JSON.stringify({
      status: 500,
      message: "Password out of length"
    }))
  }
  if(!validateEmail(array_req[1])){
    return res.status(500).send(JSON.stringify({
      status: 500,
      message: "Not valid email!"
    }))
  }
  if(array_req[1].length > 200){
    return res.status(500).send(JSON.stringify({
      status: 500,
      message: "Email out of length"
    }))  
}
  const verify_user = await UsersModel.findOne({
    where: {
      [Op.or] : [
        {
          username: array_req[0]
        },
        {
          email: array_req[1]
        }
      ]
    }
  });
  if(verify_user != null){
    return res.status(500).send(JSON.stringify({
      status: 500,
      message: "Username or email in use"
    }))
  }
  const user_query = await UsersModel.create({
    username: array_req[0],
    email: array_req[1],
    user_password: cryptPassword(array_req[2]),
    path_img: !array_req[3] ? null : array_req[3]
  }), user_values = user_query.dataValues;
  return res.status(200).send(JSON.stringify({
    status: 200,
    message: "User created",
    token: generateToken({
      id: user_values.id,
      username: user_values.username,
      path_img: user_values.path_img
    })
  }))
}

const loginUser = async (req, res) => { // method : password or cookies
  const cookies = req.cookies;
  if(req.body.method == "cookies"){
    const token = validateCookie(req.cookies);
    if(token.result){
      const token_validate = await checkIfUserExistByIdToken(req.cookies["auth-token"]);
      if(!token_validate){
        return res.status(500).send(JSON.stringify({
          status: 500,
          message: "Error in token"
        }))
      }
      return res.status(200).send(JSON.stringify({
        status: 200,
        message: "Authentication sucesseful",
        token: token.jwt_result
      }))
    }
    else{
      return res.status(401).send(JSON.stringify({
        status: 401,
        message: "Invalid token"
      }))
    }
  }
  else if(req.body.method == "password"){
    const array_req = [sanitizateArray([req.body.username])[0], req.body.user_password];
    if(!array_req[0] || !array_req[1]){
      return res.status(500).send(JSON.stringify({
        status: 500,
        message: "User or password not defined"
      }))
    }
    const user_req = await UsersModel.findOne({
      where:{
        username: array_req[0]
      }
    });
    if(user_req == null){
      return res.status(401).send(JSON.stringify({
        status: 401,
        message: "User not found"
      }))
    }
    else{
      const {id, username, path_img, user_password} = user_req.dataValues;
      if(!checkPassword(array_req[1], user_password)){
        return res.status(401).send(JSON.stringify({
          status: 401,
          message: "Invalid password"
        }))
      }
      else{
        return res.status(200).send(JSON.stringify({
          status: 200,
          message: "Authenticated",
          token: generateToken({
            id: id,
            username: username,
            path_img: path_img
          })
        }))
      }
    }
  }
}

const putUser = async (req, res) => { // Add token in 200 response with changed settings
  function returnObjectData(parm = "", data = ""){  
    return{
        parm: parm,
        data: data
      }
    }
  const cookies = req.cookies,
  {username, email, user_password, image_data} = req.body,
  data_to_update = [], token_result = validateCookie(cookies);
  if(!token_result.result){
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
  if(image_data != null && Array.isArray(image_data) && image_data.length == 2){
    const image_upload_result = imageSave(image_data[0], image_data[1]);
    if(!image_upload_result.result){
      return res.status(500).send(JSON.stringify({
        status: 500,
        message: "Error while uploading image"
      }))
    }
    data_to_update.push(returnObjectData("path_img", image_upload_result.path));
  }
  if(username != undefined && username.length > 0 && username.length < 200){
    const sanitizated_username = sanitizateArray([username])[0], 
      verify_user = await UsersModel.findOne({
      where: {
        username: sanitizated_username
      }
    });
    if(!verify_user){
      data_to_update.push(returnObjectData("username", sanitizated_username));
    }
  }
  if(user_password != undefined && user_password.length > 0 && user_password.length < 40){
    data_to_update.push(returnObjectData("user_password", cryptPassword(user_password)));
  }
  if(email != undefined && validateEmail(email) && email.length > 0 && email.length < 200){
    const verify_email = await UsersModel.findOne({
      where: {
        email: email
      }
    });
    if(!verify_email){
      data_to_update.push(returnObjectData("email", email));
    }
  }
  const data_token = returnTokenData(cookies["auth-token"]); 
  for(let x = 0; x < data_to_update.length; x++){
    await UsersModel.update({[data_to_update[x].parm] : data_to_update[x].data}, {
      where : {
        id: data_token.id
      }
    })
  }
  const updated_query = await UsersModel.findOne({
    attributes: ["id", "username", "path_img"],
    where : {
      id: data_token.id
    }
  }), 
  updated_data = updated_query.dataValues,
  updated_token = generateToken(updated_data);
  return res.status(200).send(JSON.stringify({
    status: 200,
    message: `User ${data_token.username} updated`,
    token: updated_token
  }))
}

const deleteUser = async (req, res) =>  {
  const token_result = validateCookie(req.cookies);
  if(!(token_result.result)){
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
  const token_data = returnTokenData(req.cookies["auth-token"]);
  await UsersModel.destroy({
    where:{
      id: token_data.id
    }
  })
  return res.status(200).send(JSON.stringify({
    status: 200,
    message: "User deleted"
  }))
}

export {getUser, createUser, loginUser, putUser, deleteUser, checkIfUserExistByIdToken, getReturnTokenData, getRetriveImageByPath};
