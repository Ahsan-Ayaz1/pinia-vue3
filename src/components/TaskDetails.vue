<script setup>
import { useTaskStore } from '../stores/TaskStore';

const taskStore = useTaskStore()
const props = defineProps(['task'])

</script>

<template>
    <div class="task">
        <h3>{{ props.task.title }}</h3>
        <div class="icons">
            <i @click="taskStore.deleteTask(props.task.id)" class="material-icons">delete</i>
            <i @click="taskStore.toggleFav(props.task.id)" :class="{ active: props.task.isFav }"
                class="material-icons">favorite</i>
        </div>
    </div>
</template>


