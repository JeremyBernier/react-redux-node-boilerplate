// export function logIn (username) {
//   return {
//     type: 'LOGIN',
//     username: username
//   }
// }

export function logIn (username, password) {
  return dispatch => {
    return fetch('/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      body: `username=${username}&password=${password}`
    })
    .then(handleErrors)
    .then(res => {
      // console.log('res', res)
      // console.log('res.headers.get("set-cookie")', res.headers.get("set-cookie"))
      dispatch({
        type: 'LOGIN',
        username: username
      })
    })
    .catch(err => console.error('auth failure', err))
  }
}

// export function logOut () {
//   return {
//     type: 'LOGOUT'
//   }
// }

export function logOut () {
  return dispatch => {
    return fetch('/logout', {
      credentials: 'same-origin'
    })
    .then(handleErrors)
    .then((/*res*/) => {
      dispatch({
        type: 'LOGOUT'
      })
    })
    .catch(err => console.error('Logout failure', err))
  }
}

export function setUuid (uuid) {
  return {
    type: 'SET_UUID',
    uuid
  }
}

//obviously needs to be moved out
function handleErrors (res) {
  if (!res || res.status >= 400) {
    throw Error(res.statusText)
  }
  return res
}