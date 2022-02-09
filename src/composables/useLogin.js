import { user } from '@/gun/user'
import router from '@/router'
//import { store } from '@/store'

const login = (username, password) => {
    console.log('trying to log in')
    try {
        user.auth(username, password, ({err}) => {
            if(!err) {
                console.log('logged in')
                //console.log('user.is is ', user.is)
                router.push('/')
            } else {
                router.push('/login')
                console.log('login failed')
                alert(err)
            }
        });
        
    } catch (error) {
        console.log('other error logging in')
    }
}

const useLogin = () => {
    return { login }
}

export default useLogin