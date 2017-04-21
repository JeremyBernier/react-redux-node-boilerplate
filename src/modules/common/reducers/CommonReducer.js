const INITIAL_STATE = {
  /*serverPrefetchFailed: undefined*/
}

function common(state = INITIAL_STATE, action) {
  switch (action.type) {

    case 'SERVER_PREFETCH_FAILED':
      return {
        ...state,
        serverPrefetchFailed: true
      }
      
    default:
      return state
  }
}

export default common
