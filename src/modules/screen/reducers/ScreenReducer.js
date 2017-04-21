const { BROWSER } = process.env

const INITIAL_STATE = {
  windowWidth: BROWSER ? window.innerWidth : 1024
}

function screen(state = INITIAL_STATE, action) {
  switch (action.type) {

    case 'SET_WINDOW_WIDTH':
      return {
        ...state,
        windowWidth: action.windowWidth
      }

    default:
      return state
  }
}

export default screen