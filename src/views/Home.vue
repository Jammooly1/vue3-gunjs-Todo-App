<template>
  <div class="home">

    <form @submit.prevent>
      <h2>Todo App</h2>
      <input type="text" class="todoInput" placeholder="Enter Todo Item" required v-model="task">
      <button class="addBtn" @click="addToGun">Add</button>

      <div v-for="todo in arr" :key="todo.taskId" class="row tasks">
        <div class="column">{{ todo.desc }}</div>
        <div class="right-box">
          <div class="column">
            <input type="checkbox" @click="toggleBox(todo.taskId, !todo.checked)" v-model="todo.checked">
          </div>
          <div class="column">
            <button @click="editFromGun(todo.taskId)">Update Desc</button>
          </div>
          <div class="column">
            <button @click="deleteFromGun(todo.taskId)">Delete</button>
          </div>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { user, gun } from '@/gun/user'
import SEA from 'gun/sea'
export default {
  name: 'Home',
  setup() {
    var todos = user.get('todos')
    const task = ref('')
    const arr = ref([])
    const seen = new Set()
    const edited = ref(false)
    let pair = ref(SEA.pair())

    const addToGun = async() => {
      console.log(task.value)
      if(task.value !== '') {
        console.log(pair.value)
        var data = {desc: task.value, checked: false}
        var msg = await SEA.encrypt(data, pair.value);
        console.log(msg)
        todos.get('tasks').set(msg)
      }
      task.value = ''
    }

    const toggleBox = (id, checkedPass) => {
      todos.get('tasks').get(id).once(async(data) => {
        var dec = await SEA.decrypt(data, pair.value)
        dec.checked = checkedPass
        var enc = await SEA.encrypt(dec, pair.value)
        todos.get('tasks').get(id).put(enc)
      })
    }

    const editFromGun = (id) => {
      if (task.value !== '') {
        todos.get('tasks').get(id).once(async(data) => {
          var dec = await SEA.decrypt(data, pair.value)
          console.log(dec.desc, task.value)
          dec.desc = task.value
          var tmp_checked = dec.checked
          console.log(dec.desc, task.value)
          var enc = await SEA.encrypt(dec, pair.value)

          todos.get('tasks').get(id).put(enc)

          var edited_index = arr.value.findIndex(key => key.taskId === id);
          arr.value.splice(edited_index, 1, {desc: task.value, taskId: id, checked: tmp_checked})
      })
      }
    
      // if(task.value !== '') {
      //   todos.get('tasks').get(id).put({desc: task.value})
      //   edited.value = true
      //   var edited_index = arr.value.findIndex(key => key.taskId === id);
      //   arr.value.splice(edited_index, 1, {desc: task.value, taskId: id, checked: task.checked})
      //   task.value = ''
      //   edited.value = false
      // }
    }

    const deleteFromGun = (id) => {
      seen.delete(id)
      todos.get('tasks').get(id).put(null)
      const index = arr.value.findIndex(key => key.taskId === id);
      arr.value.splice(index, 1)
    }

        
    todos.get('tasks').map().on(async(msg, id) => { // on snapshot
      var ret = await SEA.decrypt(msg, pair.value)
      if(ret && !seen.has(id)) {
        //console.log(ret, id)
        seen.add(id)
        //console.log('pushing')
        //console.log(ret.desc)
        arr.value.push({desc: ret.desc, taskId: id, checked: ret.checked})
        //console.log(arr.value)
        //console.log(pair.value)
      }
    })

    return { task, arr, addToGun, deleteFromGun, editFromGun, toggleBox }
  }
}
</script>

<style scoped>
.tasks {
  margin-top: 10px;
}

.addBtn {
  margin-bottom: 20px;
}

.todoInput {
  max-width: 60%;
}

.right-box {
  display: inline-flex;
  margin: 0 auto;
  margin-right: 25%;
  justify-content: center;
  align-items: center;
}
</style>


// todos.get('tasks').map().on((task, id) => { // on snapshot
//       if(task && !seen.has(id) || task && edited.value) {
//         seen.add(id)
//         if(edited.value) {
//           edited.value = false
//         }
//         else {
//           arr.value.push({desc: task.desc, taskId: id, checked: task.checked})
//         }
//       }
//     })