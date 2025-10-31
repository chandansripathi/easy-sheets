<template>
  <div>
    <h1>Your Sheets</h1>
    <form @submit.prevent="createSheet">
      <input v-model="title" placeholder="New Sheet Title" />
      <button type="submit">Create Sheet</button>
    </form>
    <ul>
      <li v-for="sheet in sheets" :key="sheet._id">
        <router-link :to="`/sheet/${sheet._id}`">{{ sheet.title }}</router-link>
      </li>
    </ul>
    <div v-if="error" style="color:red">{{ error }}</div>
  </div>
</template>

<script>
import { getSheets, createSheet } from '../utils/api'
export default {
  data: () => ({ sheets: [], title: '', error: '' }),
  async created() {
    await this.fetchSheets()
  },
  methods: {
    async fetchSheets() {
      try {
        const { data } = await getSheets()
        this.sheets = data
      } catch (e) { this.error = 'Failed to load sheets' }
    },
    async createSheet() {
      try {
        if (!this.title.trim()) return
        await createSheet(this.title)
        this.title = ''
        await this.fetchSheets()
      } catch (e) { this.error = 'Failed to create sheet' }
    }
  }
}
</script>