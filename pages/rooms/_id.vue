<template lang="html">
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list three-line>
          <template>
            <div v-for="message in messages" :key="message.id">
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ message.user_name }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    {{ message.body }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider></v-divider>
            </div>
          </template>
        </v-list>
      </v-card>
      <v-flex>
        <v-text-field
          v-model="newMessage"
          @keyup.enter="sendMessage"
          @keydown="writingMessage"
        ></v-text-field>
        <span v-if="isWriting">{{ isWriting.name }} writing message...</span>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  async fetch({ store, params }) {
    await store.dispatch('rooms/getItem', params.id)
  },
  data() {
    return {
      messages: [],
      newMessage: '',
      isWriting: false,
      writingTimer: false
    }
  },
  computed: {
    head() {
      return {
        title: 'Room ' + this.room.name
      }
    },
    ...mapGetters({
      room: 'rooms/item'
    })
  },
  mounted() {
    this.$echo
      .private(`rooms.${this.room.id}`)
      .listen('.new.room.message', (data) => {
        this.messages.push(data)

        this.isWriting = false
      })
      .listenForWhisper('typing', (data) => {
        this.isWriting = data

        if (this.writingTimer) clearTimeout(this.writingTimer)

        this.writingTimer = setTimeout(() => {
          this.isWriting = false
        }, 2000)
      })
  },
  methods: {
    async sendMessage() {
      this.$axios.setHeader('X-Socket-Id', this.$echo.socketId())

      await this.$axios
        .post('api/messages', { body: this.newMessage, room_id: this.room.id })
        .then((res) => {
          const message = res.data.data
          message.user_name = this.$auth.user.name
          this.messages.push(message)
        })

      this.newMessage = ''
    },
    writingMessage() {
      this.$echo.private(`rooms.${this.room.id}`).whisper('typing', {
        name: this.$auth.user.name
      })
    }
  }
}
</script>

<style lang="css"></style>
