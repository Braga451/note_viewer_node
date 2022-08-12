import {fromByteArray} from "base64-js"
import fs from "fs"

const imageRetrive = (path_img = "") => {
  try{
    const data = fs.readFileSync(path_img, {encoding: null}),
    base64_data = fromByteArray(data);
    return {
      status: 200,
      message: "Ok",
      base64: base64_data
    }
  }
  catch(E){
    return{
      status: 500,
      message: `Error: ${E}`
    }
  }
}

export default imageRetrive
