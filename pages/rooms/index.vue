<template>
  <v-container fluid>
    <div v-for="room in rooms" :key="room.id">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3 mb-2>
          <v-card>
            <v-card-title>
              <div>
                <span>{{ room.name }}</span
                ><br />
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn :to="'/rooms/' + room.id">Join Room</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  async fetch({ store }) {
    await store.dispatch('rooms/getList')
  },
  computed: {
    head() {
      return {
        title: 'Room List'
      }
    },
    ...mapGetters({
      rooms: 'rooms/list'
    })
  }
}
</script>

<style scoped></style>
