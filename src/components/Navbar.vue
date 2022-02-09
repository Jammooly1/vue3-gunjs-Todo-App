<template>
  <nav :key="route.fullPath" class="navbar">
    <ul v-if="user.is" class="group">
        <li class="name-hidden"><span>Hello, {{username}}</span></li>
        <div class="li-non-header">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li class="logout" @click="logout">Logout</li>
        </div>
        <li class="name"><span>Hello, {{username}}</span></li>
    </ul>
    <ul v-if="!user.is" class="group">
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/signup">Sign Up</router-link></li>
    </ul>
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
li {
    list-style-type: none;
    margin:15px;
}

.li-non-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0 auto;
    /* padding-left: 14% */
}

@media screen and (max-width: 500px) {
  .name {
    display: none;
  }
  .name-hidden {
    display: none;
  }
  .li-non-header {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
   }
}

.logout {
    /* font-weight: normal; */
    cursor: pointer;
}

.name-hidden {
    visibility: hidden;
}

.name {

}

.group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-bottom: 5px;
    font-weight: 600;
    color: #9b4dca;
    margin: 0 auto;
}

.navbar {
    /* justify-content: center; */
    /* align-items: center; */
    background: #efd9f5;
    margin-bottom: 15px;
}
</style>