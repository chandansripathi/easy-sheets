<template>
  <div>
    <table>
      <tr v-for="(row, rowIdx) in data" :key="rowIdx">
        <td v-for="(cell, colIdx) in row" :key="colIdx">
          <input v-model="data[rowIdx][colIdx]" />
        </td>
      </tr>
    </table>
    <button @click="addRow">Add Row</button>
    <button @click="addCol">Add Column</button>
  </div>
</template>

<script>
export default {
  name: 'Spreadsheet',
  props: { data: { type: Array, default: () => [[]] } },
  methods: {
    addRow() { this.data.push(Array(this.data[0]?.length || 1).fill('')) },
    addCol() { this.data.forEach(row => row.push('')) }
  }
}
</script>