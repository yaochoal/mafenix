import baseURL from '../../url'

export function obtenerDatos(loginParams){
   return fetch(`${baseURL}/users`, {
      headers: new Headers({
     "Authorization": loginParams,
     "Content-Type":"application/json",
      "Accept":"application/json"
   }), 
    })
      .then((res) => {
        return res.json()
      }
     )
}

export function pPost(loginParams,link){
  const body = JSON.stringify(loginParams)
  return fetch(`${baseURL}/${link}`, {
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

export function pGet(link){
  return fetch(`${baseURL}/${link}`, {
      headers: new Headers({
     "Content-Type":"application/json",
      "Accept":"application/json"
   }), 
    })
      .then((res) => {
        return res.json()
      }
     )
}