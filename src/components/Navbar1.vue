<template>
  <nav :key="route.fullPath" class="navbar">
    <ul v-if="user.is" class="group">
        <div class="li-non-header">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><label @click="logout">Logout</label></li>
        </div>
        <li class="name"><span>Hello {{username}}</span></li>
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
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    padding-left: 10%
}

@media screen and (max-width: 400px) {
  .name {
    display: none;
  }
  .li-non-header {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
   }
}


.group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-bottom: 5px;
}

.group2 {
    display: flex;
    flex-direction: row;
    /* margin: 0 auto; */
    justify-content: center;
    /* justify-content: space-between; */
}

.navbar {
    justify-content: center;
    align-items: center;
    
}
</style>