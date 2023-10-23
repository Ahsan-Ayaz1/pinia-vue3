<script setup>
import { useTaskStore } from "../stores/TaskStore";
import { ref } from "vue";

const taskStore = useTaskStore()
const newTask = ref('')

const handleSubmit = () => {
    if (newTask.value.length > 0) {
        taskStore.addTasks({
            title: newTask.value,
            isFav: false,
        })
        newTask.value = ''
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="I need to..." v-model="newTask">
        <button>Add</button>
    </form>
</template>


