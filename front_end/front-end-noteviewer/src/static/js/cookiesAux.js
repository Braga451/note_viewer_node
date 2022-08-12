const setAuthToken = (token = "") => {
  try{
    const date = new Date();
    date.setTime(date.getTime() + (2 * (24* 60 * 60 * 1000)));
    const exp_time = date.toUTCString();
    document.cookie = `auth-token=${token}; Path=/; expires=${exp_time}; Secure`;
    return ({
      status: 200,
      message: "Cookie seted",
      cookie: cookie
    })
  }
  catch(E){
    return ({
      status: 500,
      message: `Error: ${E}`
    })
  }
}

const removeAuthToken = () => {
  try{
    const exp_date = new Date(0).toUTCString();
    document.cookie = `auth-token=; expires=${exp_date}`
    return ({
      status: 200,
      message: "Cookie deleted"
    })
  }
  catch(E){
    return({
      status: 500,
      message: `Error : ${E}`
    })
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
} // Stackoverflow : https://stackoverflow.com/questions/10730362/get-cookie-by-name

export {setAuthToken, removeAuthToken, getCookie}
