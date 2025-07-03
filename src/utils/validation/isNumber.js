export function isNumber(phone) {
  return /^\+380\d{9}$/.test(phone)
}

export function filterPhoneInput(value) {
  if (typeof value !== 'string') return ''
  let filtered = value.replace(/[^0-9+]/g, '')
  if (filtered.startsWith('+')) {
    filtered = '+' + filtered.slice(1).replace(/\+/g, '')
  }
  if (!filtered.startsWith('+380')) {
    filtered = '+380' + filtered.replace(/^\+?0*/, '')
  }
  return filtered.slice(0, 13)
}
