<template>
  <div>
    <h3>Permissions</h3>
    <form @submit.prevent="addOrUpdate">
      <input v-model="email" placeholder="User email"/>
      <select v-model="role">
        <option value="editor">Editor</option>
        <option value="viewer">Viewer</option>
      </select>
      <button type="submit">Add / Update</button>
    </form>
    <ul>
      <li v-for="perm in permissions" :key="perm.user._id">
        {{ perm.user.email }} ({{ perm.role }})
      </li>
    </ul>
    <div v-if="error" style="color:red">{{ error }}</div>
  </div>
</template>

<script>
import { getPermissions, setPermission, findUserByEmail } from '../utils/api'
export default {
  props: ['sheetId'],
  data: () => ({
    permissions: [],
    email: '',
    role: 'editor',
    error: ''
  }),
  async created() {
    await this.fetchPerms()
  },
  methods: {
    async fetchPerms() {
      try {
        const { data } = await getPermissions(this.sheetId)
        this.permissions = data
      } catch (e) { this.error = 'Failed to load permissions' }
    },
    async addOrUpdate() {
      try {
        const user = await findUserByEmail(this.email)
        if (!user) return this.error = 'User not found'
        await setPermission(this.sheetId, user._id, this.role)
        await this.fetchPerms()
        this.email = ''
        this.role = 'editor'
      } catch (e) { this.error = 'Failed to set permission' }
    }
  }
}
</script>