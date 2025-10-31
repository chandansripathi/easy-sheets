# Easy Sheets Frontend

## Structure
- `src/main.js`: Vue app entry point (already present)
- `src/components/`: Vue components (UI for sheets, login, register, etc.)
- `src/utils/`: Utility JS (e.g., API helpers)

## Key Components and Features

### 1. Authentication (Login/Register)
- Use JWT tokens, store them in `localStorage`
- Use an Axios HTTP client with a request interceptor to append the JWT token to all API calls

### 2. Sheets Dashboard
- List all sheets user owns or collaborates on (`GET /api/sheets`)
- Link to open/edit each sheet

### 3. Sheet Editor
- Load and display sheet data (`GET /api/sheets/:id`)
- Allow saving (`POST /api/sheets/:id/save`), editing, and collaborating

### 4. Permissions
- UI for owner to add/remove collaborators (`/api/permissions/:sheetId`)

---

## Example Implementation

### main.js
```javascript name=frontend/src/main.js url=https://github.com/chandansripathi/easy-sheets/blob/main/frontend/src/main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:8080/api'
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```

---

### API Utility
```javascript name=frontend/src/utils/api.js
import axios from 'axios'

export function login(email, password) {
  return axios.post('/users/login', { email, password })
}

export function register(username, email, password) {
  return axios.post('/users/register', { username, email, password })
}

export function getSheets() {
  return axios.get('/sheets')
}

export function getSheet(id) {
  return axios.get(`/sheets/${id}`)
}

export function saveSheet(id, data) {
  return axios.post(`/sheets/${id}/save`, { data })
}

// ...other API helpers (permissions, etc.)
```

---

### Login Component Example
```vue name=frontend/src/components/Login.vue
<template>
  <form @submit.prevent="onLogin">
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
    <div v-if="error">{{ error }}</div>
  </form>
</template>

<script>
import { login } from '../utils/api'
export default {
  data: () => ({ email: '', password: '', error: '' }),
  methods: {
    async onLogin() {
      try {
        const { data } = await login(this.email, this.password)
        localStorage.setItem('token', data.token)
        this.$router.push('/dashboard')
      } catch (e) {
        this.error = e.response?.data?.error || 'Login failed'
      }
    }
  }
}
</script>
```

---

### Sheets Dashboard Example
```vue name=frontend/src/components/SheetsDashboard.vue
<template>
  <div>
    <h1>Your Sheets</h1>
    <ul>
      <li v-for="sheet in sheets" :key="sheet._id">
        <router-link :to="`/sheet/${sheet._id}`">{{ sheet.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSheets } from '../utils/api'
export default {
  data: () => ({ sheets: [] }),
  async created() {
    const { data } = await getSheets()
    this.sheets = data
  }
}
</script>
```

---

**You can expand this structure with router views for registration, editing sheets, and permissions management.**

- Place all UI logic in `src/components/`
- Use the API helpers for backend communication
- Protect routes with navigation guards (check JWT token)
- Use Vuex for state management if needed