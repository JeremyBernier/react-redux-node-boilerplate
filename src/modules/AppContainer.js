import { connect } from 'react-redux'
import App from './App'
import { setWindowWidth as setScreenWidth } from './screen/actions/ScreenActions'

const mapStateToProps = state => {
  return {
    phoneNumber: state.common.phoneNumber,
    variationKeys: state.experiment.variationKeys,
    windowWidth: state.screen.windowWidth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setScreenWidth: (windowWidth) => dispatch(setScreenWidth(windowWidth))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
