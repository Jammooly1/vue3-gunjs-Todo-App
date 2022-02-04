<template>
    <div class="login">
        <h1>Login</h1>
        <form @submit.prevent="handleSubmit">
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
import { useRoute } from 'vue-router'
import useLogin from '@/composables/useLogin'

export default {
    setup() {
        const username = ref('')
        const password = ref('')
        const {login, x} = useLogin()
        const router = useRouter()
        const route = useRoute()

        const handleSubmit = async() => {
            login(username.value, password.value)
            //router.push({ name: "Home"}).catch(()=>{});
            console.log('router push')
            console.log(route.path)
            if(route.path === '/login') {
                console.log('in if statement')
                //console.log('x is ' + x)
                console.log('user not ' + !user.is)
                const navigationResult = await router.push({ name: "Home"}).catch(()=>{});
                console.log(navigationResult)
            }
            
            console.log('router pushed')

        }

        return { handleSubmit, password, username }
    },
}
</script>

<style scoped>

</style>
