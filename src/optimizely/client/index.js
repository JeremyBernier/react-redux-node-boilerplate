import optimizely from 'optimizely-client-sdk'

const { NODE_ENV } = process.env

let optimizelyClientInstance
  , store
  , uuid
  , userAttributes

export function initOptimizelyClient (datafile, _store) {
  optimizelyClientInstance = optimizely.createInstance({
    datafile
  })

  if (NODE_ENV === 'production') {
    optimizelyClientInstance.logger.logToConsole = false;
  }

  // necessary for Segment.io tracking
  window.optimizelyClientInstance = optimizelyClientInstance

  store = _store
  uuid = store.getState().auth.uuid
}

export function setUserAttributes (attributes) {
  userAttributes = attributes
}

/**
  * By default we don't activate the experiment on the server, so this must be called 
  * manually on the client-side for each experiment
  * 
  * We're relying on their claim that the variation returned by activate() is indentical to getVariation()
  */
export function activateExperiment (name) {
  optimizelyClientInstance.activate(name, uuid)
}

export function trackOptimizelyEvent (eventKey, eventTags) {
  optimizelyClientInstance.track(eventKey, uuid, userAttributes, eventTags)
}