import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sanitizer from "string-sanitizer";
import "dotenv/config"; // process.env.NAME

function cryptPassword(password = ""){
  return bcrypt.hashSync(password, 10);
}

function checkPassword(plain_password = "", hashed_password = ""){
  return bcrypt.compareSync(plain_password, hashed_password);
}

function generateToken(data = {}){
  return jwt.sign(data, process.env.JWT_SECRET_KEY, {
    algorithm : "HS512",
    expiresIn: "2 days"
  })
}

function verifyToken(token = ""){
  try{
    return {
      result: true,
      jwt_result : regenerateToken(jwt.verify(token, process.env.JWT_SECRET_KEY))};
  }
  catch(E){
    return {result: false};
  }
}

function returnTokenData(token = ""){
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

function validateCookie(cookies = {}){
  const auth_token = cookies["auth-token"];
  if(auth_token != null){
    const verify_result = verifyToken(auth_token);
    if(verify_result.result == true){
      return verify_result;
    }
  }
  return {
    result: false
  };
}

function regenerateToken(token_data = {}){
  const token_payload = token_data;
  delete token_payload.iat;
  delete token_payload.exp;
  return jwt.sign(token_payload, process.env.JWT_SECRET_KEY);
}

function sanitizateArray(array_data = []){
  if(!array_data[0]){
    return [null]
  }
  return array_data.map((e) => sanitizer.sanitize.addFullstop(e));
}

function validateEmail(email = ""){
  return sanitizer.validate.isEmail(email);
}

function sanitizateNoteContent(content = ""){
  return sanitizer.sanitize.keepSpace(content);
}

export {cryptPassword, checkPassword, generateToken, returnTokenData, validateCookie, sanitizateArray, validateEmail, sanitizateNoteContent};
