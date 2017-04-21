const INITIAL_STATE = {
  variationKeys: {}
}

function experiment(state = INITIAL_STATE, action) {
  switch (action.type) {

    case 'SET_EXPERIMENT_VARIATION_KEYS':
      return {
        variationKeys: action.variationKeys
      }

    default:
      return state
  }
}

export default experiment