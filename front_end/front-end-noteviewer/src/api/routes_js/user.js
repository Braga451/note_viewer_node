const route = `${import.meta.env.VITE_SERVER_HOST}/users`

const requestCreateUser = async (data = {}, variable_to_return = []) => {
  const path_string = `${route}/create`,
  request = await fetch(path_string, {
    method: "POST",
    headers: {
      "Accept" : "application/json",
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(data)
  }),
  json_return = await request.json();
  return json_return
}

const requestLoginUser = async (data = {}) => {
  const path_string = `${route}/login`,
  request = await fetch(path_string, {
    method: "POST",
    headers: {
      "Accept" : "application/json",
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(data)
  }),
  json_return = await request.json();
  return json_return
}

const requestGetTokenData = async () => {
  const path_string = `${route}/get_token_data`,
    request = await fetch(path_string, {
      method: "GET",
      credentials: "include"
    }),
    json_return = await request.json();
    return json_return
}

const requestGetUserData = async (username = "") => {
  const path_string = `${route}/get_user/${username}`,
    request = await fetch(path_string, {
      method: "GET",
      credentials: "include"
    }),
    json_return = await request.json();
    return json_return
}

const requestPutUser = async (data) => {
  const path_string = `${route}/update/`,
  request = await fetch(path_string, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Accept" : "application/json",
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(data)
  }),
  json_return = await request.json();
  return json_return
}

const requestGetImageByPath = async (data) => {
  const path_string = `${route}/retrive_image_by_path/`,
  request = await fetch(path_string, {
    method: "POST",
    credentials: "include",
    headers: {
      "Accept" : "application/json",
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(data)
  }),
  json_return = await request.json();
  return json_return
  
}

export {requestCreateUser, requestLoginUser, requestGetTokenData, requestGetUserData, requestPutUser, requestGetImageByPath}
