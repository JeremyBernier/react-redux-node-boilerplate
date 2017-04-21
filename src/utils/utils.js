export function toQueryString (/* Object */ obj) {
  if (obj == null) {
    return ''
  }

  const keys = Object.keys(obj)

  if (keys.length <= 0) {
    return ''
  }

  return '?' +
    keys.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&')
}