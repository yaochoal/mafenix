import baseURL from '../../url'

export function enviarDatos(registerParams){
   const body = JSON.stringify(registerParams)
   return fetch(`${baseURL}/register`, {
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

