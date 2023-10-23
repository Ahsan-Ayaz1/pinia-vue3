<script setup>
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";
import { useTaskStore } from "./stores/TaskStore"
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

const taskStore = useTaskStore()
const { tasks, Loading, favs, totalCount, favCount } = storeToRefs(taskStore)
const filter = ref('all')

onMounted(() => {
  taskStore.getTasks()
})
</script>

<template>
  <!-- Heading -->
  <header>
    <img src="./assets/pinia-logo.svg" alt="Pinia logo">
    <h1>Pinia TodoList</h1>
  </header>

  <!-- New Task Form -->
  <div class="new-task-form">
    <TaskForm />
  </div>

  <!-- Filter Nav -->
  <nav class="filter">
    <button :class="{ active: filter == 'all' }" @click=" filter = 'all'">All Tasks</button>
    <button :class="{ active: filter == 'favs' }" @click=" filter = 'favs'">Favorite Tasks</button>
  </nav>

  <div v-if="Loading" class="loading">
    Loading Tasks...
  </div>

  <!-- Task List -->
  <div class="task-list" v-if="filter == 'all'">
    <p>You have {{ totalCount }} tasks left to do</p>
    <div v-for=" task  in  tasks " :key="task.id">
      <TaskDetails :task="task" />
    </div>
  </div>

  <div class="task-list" v-if="filter == 'favs'">
    <p>You have {{ favCount }} fav left to do</p>
    <div v-for=" task  in  favs " :key="task.id">
      <TaskDetails :task="task" />
    </div>
  </div>
</template>

