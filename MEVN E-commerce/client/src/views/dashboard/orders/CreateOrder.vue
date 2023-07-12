<template >

  <section class="bg-white w-screen">
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 class="mb-4 text-xl font-bold text-gray-900">Add a new Category</h2>
      <form action="#" @submit.prevent="handleSubmitForm">
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div class="sm:col-span-2">
            <label
              for="categoryName"
              class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <input
                type="text"
                id="categoryName"
                placeholder="Category Name"
                class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                v-model="category.name"
                required
              />

              <span
                class="absolute left-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
              >
              Category Name
              </span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
        >
          Add category
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import Sidebar from '../../../components/SideBar.vue'
import axios from "axios";

export default {
  data() {
    return {
      category: {
        name: "",
      },
    };
  },
  methods: {
    handleSubmitForm() {
      let apiURL = "http://localhost:3000/api/create-category";

      axios
        .post(apiURL, this.category)
        .then(() => {
          this.$router.push("/dashboard/category/list-categories");
          this.category = {
            name: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
