import GUN from 'gun'
import 'gun/sea'
import { ref } from 'vue'

// database
export const gun = GUN();

// Gun User
export const user = gun.user().recall({sessionStorage: true});

// Current User's username
export const username = ref('');

user.get('alias').on(v => username.value = v)

export const checkExists = gun.on('auth', async(event) => {
    //console.log('INTERRUPTED')
    username.value = await user.get('alias');
    //console.log(store.state.user)
    // if(user.is) {
    //     store.state.user = true;    
    // } else {
    //     store.state.user = false;
    // }
    // //console.log('cur_user: ', store.state.cur_user)
    // console.log(store.state.user)
    //console.log(username.value + ' in db ' + (user.is !== null))
    console.log('Signed in as ' + username.value);
})