import baseURL from '../../url'

export function loginUser(loginParams){
  const body = JSON.stringify(loginParams)
  return fetch(`${baseURL}/user_token`, {
      method: 'post',
      body: body,
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
    })
      .then((res) => {
        return res.json()
      }
     )
}




