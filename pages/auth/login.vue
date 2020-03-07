<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Вход</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                v-model="email"
                prepend-icon="mdi-email"
                name="email"
                label="Е-мейл"
                type="email"
                required
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                id="password"
                v-model="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Пароль"
                type="password"
                required
                :rules="passwordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="!valid" @click.prevent="login"
              >Войти</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      valid: false,

      emailRules: [
        (v) => !!v || 'Пожалуйста введите е-мейл',
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'Неправильный е-мейл'
      ],
      passwordRules: [
        (v) => !!v || 'Пожалуйста введите пароль',
        (v) =>
          (v && v.length >= 6) || 'Пароль слишком короткий - минимум 6 символов'
      ]
    }
  },
  methods: {
    async login() {
      const redirect = this.$auth.$state.redirect
        ? this.$auth.$state.redirect
        : '/'

      await this.$auth.loginWith('password_grant', {
        data: {
          username: this.email,
          password: this.password
        }
      })

      this.$router.push(redirect)
    }
  }
}
</script>
