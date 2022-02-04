import GUN from 'gun'
import 'gun/sea'
import { ref } from 'vue'
import { store } from '@/store'

// database
export const db = GUN();

// Gun User
export const user = db.user().recall({sessionStorage: true});

// Current User's username
export const username = ref('');

user.get('alias').on(v => username.value = v)

export const checkExists = db.on('auth', async(event) => {
    console.log('INTERRUPTED')
    username.value = await user.get('alias');

    if(user.is) {
        store.state.cur_user = true;    
    } else {
        store.state.cur_user = false;
    }
    console.log('cur_user: ', store.state.cur_user)

    console.log(username.value + ' in db ' + (user.is !== null))
    console.log('Signed in as ' + username.value);
})