import crypto from 'crypto'

export const uuidCookieName = 'uuid'

export function generateUuid () {
  return crypto.randomBytes(16).toString('base64')
}