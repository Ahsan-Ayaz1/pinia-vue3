import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    Loading: false,
  }),

  getters: {
    favs() {
      return this.tasks.filter((t) => t.isFav);
    },

    favCount() {
      return this.tasks.reduce((previous, current) => {
        return current.isFav ? previous + 1 : previous;
      }, 0);
    },

    totalCount: (state) => {
      return state.tasks.length;
    },
  },

  actions: {
    async getTasks() {
      this.Loading = true;
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();

      this.tasks = data;
      this.Loading = false;
    },

    addTasks(task) {
      this.tasks.push(task);
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => {
        return t.id !== id;
      });
    },

    toggleFav(id) {
      const tasks = this.tasks.find((t) => t.id === id);
      tasks.isFav = !tasks.isFav;
    },
  },
});
