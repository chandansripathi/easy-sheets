<template>
  <form @submit.prevent="onLogin">
    <h2>Login</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
    <div v-if="error" style="color:red">{{ error }}</div>
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