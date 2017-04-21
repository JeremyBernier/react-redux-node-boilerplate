import { handleMonitorStatus } from './system'

module.exports = (app) => {
  app.get('/_monitor/status', handleMonitorStatus)
}