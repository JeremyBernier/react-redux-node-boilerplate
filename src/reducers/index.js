import { combineReducers } from 'redux'

import auth from '../modules/auth/reducers/AuthReducer'
import experiment from '../modules/experiment/reducers/ExperimentReducer'
import screen from '../modules/screen/reducers/ScreenReducer'
import common from '../modules/common/reducers/CommonReducer'

export default combineReducers({
  auth,
  experiment,
  common,
  screen,
})
