import GUN from 'gun'
import 'gun/sea'
import { ref } from 'vue'

// database
export const gun = GUN();

// SEA

// Gun User
export const user = gun.user().recall({sessionStorage: true});

// Current User's username
export const username = ref('');

user.get('alias').on(v => username.value = v)

export const checkExists = gun.on('auth', async(event) => {
    username.value = await user.get('alias');
    console.log('Signed in as ' + username.value);
})