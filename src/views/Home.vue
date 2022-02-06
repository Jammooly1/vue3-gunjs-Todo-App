<template>
  <div class="home">
    <form @submit.prevent="addToGun">
      <h2>Todo App</h2>
      <input type="text" class="todoInput" placeholder="Enter Todo Item" required v-model="task">
      <button class="addBtn">Add</button>

      <div v-for="todo in arr" :key="todo" class="row tasks">
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
import Gun from 'gun'
import { ref } from '@vue/reactivity'
import { user } from '@/gun/user'

export default {
  name: 'Home',
  setup() {
    var gun = Gun()
    var todos = gun.get('todos')
    const task = ref('')
    const arr = ref([])
    const seen = new Set()
    const edited = ref(false)

    const addToGun = () => {
      todos.get('tasks').set({desc: task.value, checked: false})
      task.value = ''
    }

    const toggleBox = (id, checkedPass) => {
      todos.get('tasks').get(id).put({checked: checkedPass})
    }

    const editFromGun = (id) => {
      todos.get('tasks').get(id).put({desc: task.value})
      edited.value = true
      var edited_index = arr.value.findIndex(key => key.taskId === id);
      arr.value.splice(edited_index, 1, {desc: task.value, taskId: id, checked: task.checked})
      task.value = ''
      edited.value = false
    }

    const deleteFromGun = (id) => {
      seen.delete(id)
      todos.get('tasks').get(id).put(null)
      const index = arr.value.findIndex(key => key.taskId === id);
      arr.value.splice(index, 1)
    }

        
    todos.get('tasks').map().on((task, id) => { // on snapshot
      if(task && !seen.has(id)) {
        seen.add(id)
        arr.value.push({desc: task.desc, taskId: id, checked: task.checked})
        
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