import GUN from 'gun'
import 'gun/sea'
import { ref } from 'vue'
// database
export const db = GUN();

// Gun User
export const user = db.user().recall({sessionStorage: true});

// Current User's username
export const username = ref('');

user.get('alias').on(v => username.value = v)

db.on('auth', async(event) => {
    console.log('INTERRUPTED')
    username.value = await user.get('alias');
    
    console.log('Signed in as ' + username.value);
})