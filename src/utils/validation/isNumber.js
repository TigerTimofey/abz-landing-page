export function isNumber(value) {
  if (typeof value !== 'string') return false
  const validChars = /^\+?\d{1,12}$/
  return validChars.test(value)
}

/**
 * Filters a phone input string to allow only numbers and an optional leading +,
 * and limits to max 12 digits (excluding +).
 * @param {string} value
 * @returns {string}
 */
export function filterPhoneInput(value) {
  if (typeof value !== 'string') return ''
  let filtered = value.replace(/[^0-9+]/g, '')
  if (filtered.startsWith('+')) {
    filtered = '+' + filtered.slice(1).replace(/\+/g, '')
    filtered = filtered[0] + filtered.slice(1, 13)
  } else {
    filtered = filtered.slice(0, 12)
  }
  return filtered
}
