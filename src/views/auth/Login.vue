<template>
    <div class="login">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" v-model="username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import { user } from '@/composables/user'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const username = ref('')
        const password = ref('')

        const router = useRouter()

        const login = async() => {
            console.log('logging in')
            await user.auth(username.value, password.value, ({err}) => err && alert(err));
            
            //console.log('logged in? ', loggedIn)
            var x = router.push('/')
            console.log('x: ', x)
            console.log('router pushed')
        }

        return { login, password, username }
    },
}
</script>

<style scoped>

</style>
