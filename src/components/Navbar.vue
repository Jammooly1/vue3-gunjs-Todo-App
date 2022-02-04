<template>
  <nav>
      <div class="navbar">
        <div class="navbar-start">
          <div v-if="username" class="navbar-item">
            <router-link to="/">Home</router-link>
          </div>
          <div v-if="username" class="navbar-item">
            <router-link to="/about">About</router-link>
          </div>
          <div v-if="!username" class="navbar-item">
            <router-link to="/login">Login</router-link>
          </div>
          <div v-if="!username" class="navbar-item">
            <router-link to="/signup">Sign Up</router-link>
          </div>
          <div v-if="username" class="navbar-item">
            <label @click="logout">Log Out</label>
          </div>
        </div>
      </div>
  </nav>
</template>

<script>
import { username, user } from '@/composables/user'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const router = useRouter()

        console.log('navbar')
        //console.log(username)
        const logout = () => {
            console.log('logging out')
            user.leave()
            username.value = ''
            router.push('/login')
        }

        return { logout, username }
    }
}
</script>

<style>
.navbar {
  background-color: #e9d9f1;
  color: #fff;
  margin-bottom: 10px;
}

label {
    color: purple;
}

label:hover {
    color: lightpink;
}

.navbar-start {
  margin-left: auto;
  display: inline-flex;
}

.navbar-item {
  color: #fff;
  font-weight: bold;
  padding: 10px;
}

</style>