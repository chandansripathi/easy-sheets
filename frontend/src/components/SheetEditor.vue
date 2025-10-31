<template>
  <div>
    <h2>Edit Sheet: {{ sheet.title }}</h2>
    <spreadsheet :data.sync="sheet.data"/>
    <button @click="save">Save</button>
    <permissions :sheetId="sheet._id"/>
    <div v-if="message" style="color:green">{{ message }}</div>
    <div v-if="error" style="color:red">{{ error }}</div>
  </div>
</template>

<script>
import Spreadsheet from './Spreadsheet.vue'
import Permissions from './Permissions.vue'
import { getSheet, saveSheet } from '../utils/api'
export default {
  components: { Spreadsheet, Permissions },
  data: () => ({ sheet: { title: '', data: [], _id: '' }, message: '', error: '' }),
  async created() {
    await this.fetchSheet()
  },
  methods: {
    async fetchSheet() {
      try {
        const { data } = await getSheet(this.$route.params.id)
        this.sheet = data
      } catch (e) { this.error = 'Failed to load sheet' }
    },
    async save() {
      try {
        await saveSheet(this.sheet._id, this.sheet.data)
        this.message = 'Sheet saved!'
      } catch (e) { this.error = 'Failed to save sheet' }
    }
  }
}
</script>