<template>
    <div class="signup">
        <h1>Sign Up</h1>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" v-model="username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary">Sign Up</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import useSignup from '@/composables/useSignup'

export default {
    setup() {
        const username = ref('')
        const password = ref('')
        const {signup} = useSignup()

        const handleSubmit = () => {
            signup(username.value, password.value)
        }

        return { handleSubmit, password, username }
    },
}
</script>

<style scoped>
input {
    max-width: 60%;
}
</style>