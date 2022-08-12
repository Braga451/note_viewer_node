import fs from "fs";
import path from "path";
import {toByteArray} from "base64-js"

function imageSave(image_ext = "", base64_image_data = ""){
  try{
    const path_to_save = `${path.resolve(path.dirname(""))}/src/users_img/`, 
      time = new Date(),
      image_name = `${Math.random().toString(16).slice(2)}-${time.getTime()}.${image_ext}`, 
      full_path = `${path_to_save}${image_name}`, 
      image_data = toByteArray(base64_image_data);
      let return_data = null;
    try{
      fs.writeFileSync(full_path, image_data);
      return_data = {
        result: true,
        message: "Image saved",
        path: full_path
      }
    }
    catch(E){
      console.log(E);
      return_data = {
          result: false,
          message: "Error while writting image"
        }
    }
    return return_data;
    }
    catch(E){
      return {
        result: false,
        message: "Error while writting image"
      }
    }
}

export default imageSave;
