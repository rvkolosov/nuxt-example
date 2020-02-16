<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline"
          >Welcome to the Vuetify + Nuxt.js template</v-card-title
        >
        <v-card-text>
          <div v-if="$auth.$state.loggedIn">
            <p>
              You are authenticated. You can see the
              <NuxtLink to="/secret"> secret page </NuxtLink>!
            </p>
            <v-btn @click="logout">
              Logout
            </v-btn>
          </div>
          <p v-else>
            Please
            <NuxtLink to="/auth/login"> login </NuxtLink>. Or
            <NuxtLink to="/auth/register"> register </NuxtLink>.
          </p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {},
  methods: {
    async logout() {
      await this.$auth.logout()

      this.$router.push('/')
    }
  }
}
</script>
