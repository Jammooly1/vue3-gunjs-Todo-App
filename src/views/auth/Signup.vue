<template>
    <div class="signup">
        <h1>Sign Up</h1>
        <form @submit.prevent="signup">
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
import {user} from '@/composables/user'
import {useRouter} from 'vue-router'

export default {
    setup() {
        const username = ref('')
        const password = ref('')
        const router = useRouter()

        const signup = () => {
            console.log('signed up')
            user.create(username.value, password.value, ({err}) => {
                if (err) {
                    alert(err)
                } else {
                    user.auth(username.value, password.value, ({err}) => {
                        if (err) {
                            alert(err)
                        }
                    })
                }
            })
            router.push('/')
        }

        return { signup, password, username }
    },
}
</script>
