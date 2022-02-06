import { user } from '@/composables/user'
import router from '@/router'
import { store } from '@/store'
import useLogin from '@/composables/useLogin'

const {login} = useLogin()

const signup = (username, password) => {
    console.log('trying to sign up')
    try {
        user.create(username, password, ({err}) => {
            if (err) {
                console.log('signup failed')
                router.push('/signup')
                store.state.user = false
                alert(err)
            } else {
                login(username, password)
            }
        })
        
    } catch (error) {
        console.log('error signing up')
        store.state.user = false
    }
}

const useSignup = () => {
    return { signup }
}

export default useSignup