<template>
  <v-container fluid>
    <div v-for="todo in todos" :key="todo.id">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3 mb-2>
          <template>
            <v-card>
              <v-card-title>{{ todo.name }}</v-card-title>
              <v-card-text>{{ todo.description }}</v-card-text>
              <v-card-text>
                <v-chip v-model="todo.is_complete" filter>Is Complete</v-chip>
              </v-card-text>
              <v-card-actions>
                <v-btn :to="'/todos/' + todo.id">Read</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async fetch({ store }) {
    await store.dispatch('todos/getList')
  },
  computed: {
    head() {
      return {
        title: 'TODO List'
      }
    },
    ...mapGetters({
      todos: 'todos/list'
    })
  }
}
</script>

<style scoped></style>
