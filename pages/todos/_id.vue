<template>
  <div>{{ todo.name }}</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async fetch({ store, params }) {
    await store.dispatch('todos/getItem', params.id)
  },
  computed: {
    head() {
      return {
        title: 'TODO ' + this.todo.name
      }
    },
    ...mapGetters({
      todo: 'todos/item'
    })
  }
}
</script>

<style scoped></style>
