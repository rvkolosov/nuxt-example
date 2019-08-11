<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Регистрация</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid">
                            <v-text-field prepend-icon="person" name="name" label="Имя" type="text" required
                                          v-model="name" :rules="nameRules"></v-text-field>
                            <v-text-field prepend-icon="email" name="email" label="Е-мейл" type="email" required
                                          v-model="email" :rules="emailRules"></v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Пароль" id="password" type="password" required
                                          v-model="password" :rules="passwordRules"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click.prevent="register" :disabled="!valid">Зарегистрироваться</v-btn>
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
                name: null,

                nameRules: [
                    (v) => !!v || 'Пожалуйста введите Ваше имя'
                ],
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
            async register() {
                await this.$axios.post('register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password
                })

                await this.$auth.loginWith('password_grant', {
                    data: {
                        grant_type: 'password',
                        client_id: process.env.PASSPORT_PASSWORD_GRANT_ID,
                        client_secret: process.env.PASSPORT_PASSWORD_GRANT_SECRET,
                        scope: '*',
                        username: this.email,
                        password: this.password
                    }
                }).then(res => {this.$router.push('/')})
            }
        }
    }
</script>

<style scoped>

</style>