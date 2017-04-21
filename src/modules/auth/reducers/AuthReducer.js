const INITIAL_STATE = {
  username: null,
  uuid: null
}

function auth(state = INITIAL_STATE, action) {
  switch (action.type) {

    case 'LOGIN':
      return {
        ...state,
        username: action.username
      }

    case 'LOGOUT':
      return INITIAL_STATE

    case 'SET_UUID':
      return {
        ...state,
        uuid: action.uuid
      }

    default:
      return state
  }
}

export default auth