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
import { user, username } from '@/gun/user'
import SEA from 'gun/sea'
export default {
  name: 'Home',
  setup() {

    var todos = user.get('todos')
    const task = ref('')
    const arr = ref([])
    const seen = new Set()
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
          dec.desc = task.value
          var tmp_checked = dec.checked
          console.log(dec.desc, task.value)
          var enc = await SEA.encrypt(dec, pair.value)

          todos.get('tasks').get(id).put(enc)

          var edited_index = arr.value.findIndex(key => key.taskId === id);
          arr.value.splice(edited_index, 1, {desc: task.value, taskId: id, checked: tmp_checked})
      })
      }
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
        seen.add(id)
        arr.value.push({desc: ret.desc, taskId: id, checked: ret.checked})
      }
    })

    return { task, arr, addToGun, deleteFromGun, editFromGun, toggleBox, username }
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

.column {
  display: inline-block;
  /* width: 80%; */
  /* padding-left: 20px */
}

.right-box {
  display: inline-flex;
  margin: 0 auto;
  margin-right: 25%;
  justify-content: center;
  align-items: center;
}
</style>