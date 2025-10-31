<template>
  <form @submit.prevent="onRegister">
    <h2>Register</h2>
    <input v-model="username" placeholder="Username" />
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Register</button>
    <div v-if="error" style="color:red">{{ error }}</div>
  </form>
</template>

<script>
import { register } from '../utils/api'
export default {
  data: () => ({ username: '', email: '', password: '', error: '' }),
  methods: {
    async onRegister() {
      try {
        await register(this.username, this.email, this.password)
        this.$router.push('/login')
      } catch (e) {
        this.error = e.response?.data?.error || 'Registration failed'
      }
    }
  }
}
</script>