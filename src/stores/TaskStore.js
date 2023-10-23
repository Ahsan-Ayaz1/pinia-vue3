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
      try {
        this.Loading = true;
        const res = await fetch("http://localhost:3000/tasks");
        const data = await res.json();

        this.tasks = data;
        this.Loading = false;
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },

    async addTasks(task) {
      try {
        this.tasks.push(task);

        const res = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          body: JSON.stringify(task),
          headers: { "Content-Type": "application/json" },
        });

        if (res.error) {
          console.log(res.error);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },

    async deleteTask(id) {
      try {
        const res = await fetch("http://localhost:3000/tasks/" + id, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error(
            `Failed to delete task: ${res.status} - ${res.statusText}`
          );
        }

        this.tasks = this.tasks.filter((t) => t.id !== id);
      } catch (error) {
        console.error(error);
      }
    },

    async toggleFav(id) {
      try {
        const task = this.tasks.find((task) => task.id === id);
        task.isFav = !task.isFav;

        const res = await fetch("http://localhost:3000/tasks/" + id, {
          method: "PATCH",
          body: JSON.stringify({ isFav: task.isFav }),
          headers: { "Content-Type": "application/json" },
        });

        if (res.error) {
          console.log(res.error);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
  },
});
