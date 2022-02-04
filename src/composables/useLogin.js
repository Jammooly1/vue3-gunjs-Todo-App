import { user } from '@/composables/user'
import { store } from '@/store'


const login = (username, password) => {
    console.log('trying to log in')
    try {
        user.auth(username, password, ({err}) => err && alert(err));
        console.log('logged in')
        store.state.cur_user = true;
    } catch (error) {
        console.log('error logging in')
        store.state.cur_user = false;
    }
    //var x = router.push('/')
    //console.log('x: ', x)
    //console.log('router pushed')
}

const useLogin = () => {
    return { login }
}

export default useLogin