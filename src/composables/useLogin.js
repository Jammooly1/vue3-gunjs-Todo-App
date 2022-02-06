import { user } from '@/composables/user'
import router from '@/router'
import { store } from '@/store'

const login = (username, password) => {
    console.log('trying to log in')
    try {
        user.auth(username, password, ({err}) => {
            if(!err) {
                console.log('logged in')
                console.log('user.is is ', user.is)
                store.state.user = true
                router.push('/')
            } else {
                router.push('/login')
                console.log('login failed')
                store.state.user = false
                alert(err)
            }
        });
        
    } catch (error) {
        console.log('other error logging in')
        store.state.cur_user = false
    }
    //var x = router.push('/')
    //console.log('x: ', x)
    //console.log('router pushed')
}

const useLogin = () => {
    return { login }
}

export default useLogin