import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [
      { id: 1, title: "buy some milk", isFav: false },
      { id: 2, title: "play cricket", isFav: true },
    ],
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
