const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getUsers(page = 1, count = 6) {
  const url = `${BASE_URL}/users?page=${page}&count=${count}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export async function getUserById(id) {
  const url = `${BASE_URL}/users/${id}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch user')
  return res.json()
}

export async function getPositions() {
  const url = `${BASE_URL}/positions`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch positions')
  return res.json()
}

export async function getToken() {
  const url = `${BASE_URL}/token`
  const res = await fetch(url, { method: 'POST' })
  if (!res.ok) throw new Error('Failed to fetch token')
  return res.json()
}

export async function registerUser(formData, token) {
  const url = `${BASE_URL}/usersErr`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Token: token
    },
    body: formData
  })
  let data
  try {
    data = await res.json()
  } catch {
    data = { success: false, message: 'Invalid server response' }
  }
  return data
}
