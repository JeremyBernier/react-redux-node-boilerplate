// executes promise, but times out if promise isn't done within specified time threshold
export function promiseTimeout(promise, timeout = 1500) {
  return Promise.race([
    promise,
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('Timeout exceeded, aborting promise')
      }, timeout)
    })
  ])
}