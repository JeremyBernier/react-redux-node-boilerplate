export function handleMonitorStatus (req, res, next) {
  const info = {
    status: 'ok',
    pid: process.pid,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage()
  }
  res.status(200).send(info)
}