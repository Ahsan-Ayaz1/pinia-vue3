<script setup>
import { ref } from "vue";
import TaskDetails from "./components/TaskDetails.vue";
import { useTaskStore } from "./stores/TaskStore"

const taskStore = useTaskStore()
const filter = ref('all')
</script>

<template>
  <main>

  </main>

  <!-- Heading -->
  <header>
    <img src="./assets/pinia-logo.svg" alt="Pinia logo">
    <h1>Pinia Tasks</h1>
  </header>

  <!-- Filter Nav -->
  <nav class="filter">
    <button @click="filter = 'all'">All Tasks</button>
    <button @click="filter = 'favs'">Favorite Tasks</button>
  </nav>

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

<style scoped></style>
