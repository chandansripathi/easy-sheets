<template>
  <div>
    <nav>
      <router-link to="/dashboard">Sheets</router-link> |
      <router-link to="/login" v-if="!loggedIn">Login</router-link>
      <router-link to="/register" v-if="!loggedIn">Register</router-link>
      <span v-if="loggedIn" @click="logout" style="cursor:pointer;color:blue;">Logout</span>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return !!localStorage.getItem('token')
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>