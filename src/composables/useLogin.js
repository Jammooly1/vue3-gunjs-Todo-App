import { user } from '@/composables/user'
import { store } from '@/store'


const login = (username, password) => {
    console.log('trying to log in')
    try {
        const check = user.auth(username, password, ({err}) => err && alert(err));
        console.log('logged in')
        console.log(check)
        if(check.is) {
            store.state.cur_user = true;
        } else {
            store.state.cur_user = false;
        }
        
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