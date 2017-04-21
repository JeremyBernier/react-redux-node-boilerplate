import MobileDetect from 'mobile-detect'
let platform

let mobileDetect
  , mobileDeviceType
  , deviceName
  , browserName
  , browserVersion

export function initMobileDetect () {
  mobileDetect = new MobileDetect(window.navigator.userAgent)

  platform = require('platform')
  browserName = platform.name
  browserVersion = platform.version

  if (mobileDetect.phone()) {
    mobileDeviceType = 'phone'
    deviceName = mobileDetect.phone()
  } else if (mobileDetect.tablet()) {
    mobileDeviceType = 'tablet'
    deviceName = mobileDetect.tablet()
  }

  if (mobileDeviceType) {
    document.body.className += `device-type-${mobileDeviceType}`
  } else {
    document.body.className += 'device-type-desktop'
  }
}

export { mobileDeviceType }
export { deviceName }
export { browserName }
export { browserVersion }
export default mobileDetect