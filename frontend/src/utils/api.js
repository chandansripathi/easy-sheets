import axios from 'axios'

// Auth
export function login(email, password) {
  return axios.post('/users/login', { email, password })
}
export function register(username, email, password) {
  return axios.post('/users/register', { username, email, password })
}

// Sheets
export function getSheets() { return axios.get('/sheets') }
export function createSheet(title) { return axios.post('/sheets', { title, data: [['']] }) }
export function getSheet(id) { return axios.get(`/sheets/${id}`) }
export function saveSheet(id, data) { return axios.post(`/sheets/${id}/save`, { data }) }

// Permissions
export function getPermissions(sheetId) { return axios.get(`/permissions/${sheetId}`) }
export async function findUserByEmail(email) {
  const res = await axios.get('/users/me') // Should be a real endpoint to find user by email; adjust backend as needed
  return res.data.email === email ? res.data : null
}
export function setPermission(sheetId, userId, role) {
  return axios.post(`/permissions/${sheetId}`, { userId, role })
}