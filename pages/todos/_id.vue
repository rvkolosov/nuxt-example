<template>
    <div>{{ todo.name }}</div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex'

    export default {
        head () {
            return {
                title: 'TODO ' + this.todo.name
            }
        },
        computed: mapGetters({
            todo: 'todos/item'
        }),
        async fetch ({store, params}) {
            await store.dispatch('todos/getItem', params.id)
        },
    }
</script>

<style scoped>

</style>