<template>
  <nav :key="route.fullPath">
      <div class="navbar">
        <div class="navbar-start">

          <div class="">
            <div v-if="user.is" class="navbar-group">
              <div class="navbar-item">
                <router-link to="/">Home</router-link>
              </div>
              <div class="navbar-item">
                <router-link to="/about">About</router-link>
              </div>
              <div class="navbar-item">
                <label @click="logout">Log Out</label>
              </div>
              <div class="navbar-user">
                <h4>Hello {{username}}</h4>
              </div>
            </div>
          </div>


            <div v-if="!user.is" class="navbar-group">
              <div class="navbar-item">
                <router-link to="/login">Login</router-link>
              </div>
              <div>
                <router-link to="/signup">Sign Up</router-link>
              </div>
          </div>


        </div>
      </div>
  </nav>
</template>

<script>
import { username, user } from '@/gun/user'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

export default {
    setup() {
        const router = useRouter()
        const route = useRoute()

        const logout = () => {
            console.log('logging out')
            user.leave()

            username.value = ''
            router.push('/login')
        }

        return { logout, user, route, username }
    }
}
</script>

<style>
.navbar {
  background-color: #e9d9f1;
  color: #fff;
  margin-bottom: 10px;
}

.logged-in {
  justify-content: space-between;
}

.navbar-user {
  position: absolute;
  right: 40px;
}

label {
    color: purple;
}

label:hover {
    color: lightpink;
}

.navbar-start {
  display: flex;
  justify-content: center;
}

.navbar-group {
  color: #fff;
  font-weight: bold;
  padding: 10px;
  display: inline-flex;
  
}

.navbar-item {
  cursor: pointer;
  margin-right: 15px;
}

</style>