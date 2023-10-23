<script setup>
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";
import { useTaskStore } from "./stores/TaskStore"
import { onMounted, ref } from "vue";

const taskStore = useTaskStore()
const filter = ref('all')
// taskStore.getTasks()

onMounted(() => {
  taskStore.getTasks()
})
</script>

<template>
  <main>

  </main>

  <!-- Heading -->
  <header>
    <img src="./assets/pinia-logo.svg" alt="Pinia logo">
    <h1>Pinia Tasks</h1>
  </header>

  <!-- New Task Form -->
  <div class="new-task-form">
    <TaskForm />
  </div>

  <!-- Filter Nav -->
  <nav class="filter">
    <button @click="filter = 'all'">All Tasks</button>
    <button @click="filter = 'favs'">Favorite Tasks</button>
  </nav>

  <div v-if="taskStore.Loading" class="loading">
    Loading Tasks...
  </div>

  <!-- Task List -->
  <div class="task-list" v-if="filter == 'all'">
    <p>You have {{ taskStore.totalCount }} tasks left to do</p>
    <div v-for="task in taskStore.tasks" :key="task.id">
      <TaskDetails :task="task" />
    </div>
  </div>

  <div class="task-list" v-if="filter == 'favs'">
    <p>You have {{ taskStore.favCount }} fav left to do</p>
    <div v-for="task in taskStore.favs" :key="task.id">
      <TaskDetails :task="task" />
    </div>
  </div>
</template>

