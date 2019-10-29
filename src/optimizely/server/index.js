import fetch from 'isomorphic-fetch'
import optimizely from 'optimizely-server-sdk'
import { dataFileUrl, projectId, authToken } from '../../../config/optimizelyConfig'

let optimizelyClient
  , activeExperiments
  , optimizelyDatafile

export function initOptimizelyClient () {
  return fetchDataFile()
    .then(datafile => {
      optimizelyDatafile = datafile

      optimizelyClient = optimizely.createInstance({
        datafile
      })

      activeExperiments = getActiveExperiments()
    })
}

export function getVariationKeys (uuid) {
  return activeExperiments
    .map(({ key }) => ({[key]: optimizelyClient.getVariation(key, uuid)}))
    .reduce((a,b) => Object.assign({}, a, b), {})
}

function fetchDataFile () {
  return fetch(dataFileUrl, {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  })
  .then(handleErrors)
  .then(res => res.json())
  .catch(function (err) {
    console.error('Failed to initialize optimizely Server SDK', err)
  })
}

function getActiveExperiments () {
  return optimizelyClient.configObj.experiments.filter(({ status }) => status === 'Running')
}

export function hasActiveExperiments () {
  return optimizelyClient != null && 
    activeExperiments != null && activeExperiments.length > 0
}

export function handleOptimizelyWebhook (req, res) {
  initOptimizelyClient()
  res.sendStatus(200)
}

export function getDatafile () {
  return optimizelyDatafile
}

//obviously needs to be moved out
function handleErrors (res) {
  if (!res || res.status >= 400) {
    throw Error(res.statusText)
  }
  return res
}