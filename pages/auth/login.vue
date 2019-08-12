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
                            <v-text-field prepend-icon="mdi-email" name="email" label="Е-мейл" type="email" required
                                          v-model="email" :rules="emailRules"></v-text-field>
                            <v-text-field prepend-icon="mdi-lock" name="password" label="Пароль" id="password" type="password" required
                                          v-model="password" :rules="passwordRules"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click.prevent="login" :disabled="!valid">Войти</v-btn>
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
                    (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Неправильный е-мейл'
                ],
                passwordRules: [
                    (v) => !!v || 'Пожалуйста введите пароль',
                    (v) => (v && v.length >= 6) || 'Пароль слишком короткий - минимум 6 символов'
                ],
            }
        },
        methods: {
            async login() {
                let redirect = this.$auth.$state.redirect
                    ? this.$auth.$state.redirect
                    : '/'

                await this.$auth.loginWith('password_grant', {
                    data: {
                        grant_type: 'password',
                        client_id: process.env.PASSPORT_PASSWORD_GRANT_ID,
                        client_secret: process.env.PASSPORT_PASSWORD_GRANT_SECRET,
                        scope: '*',
                        username: this.email,
                        password: this.password
                    }
                })

                this.$router.push(redirect)
            }
        },
    }
</script>