<template>
  <section class="bg-gray-200 p-3 sm:p-5 w-screen">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <!-- Start coding here -->
      <div class="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
        <div
          class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
        >
        <h2 class="mb-2 text-xl leading-none text-black md:text-2xl ">All Users roles</h2>

        </div>
        <div class="overflow-x-auto">
          <table
            class="w-full text-sm text-left text-gray-500"
            v-if="Users.length > 0"
          >
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-4 py-3">User ID</th>
                <th scope="col" class="px-4 py-3">User Email</th>
                <th scope="col" class="px-4 py-3">User Role</th>
                <th scope="col" class="px-4 py-3 w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b" v-for="user in Users" :key="user._id">
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                >
                  {{ user.userId }}
                </th>
                <td class="text-left">{{ user.userEmail }}</td>
                <td class="text-left">{{ user.role }}</td>
                <td class="px-4 py-3 flex flex-row w-">
                  <span
                    class="inline-flex divide-x overflow-hidden rounded-md border bg-white shadow-sm"
                  >
                    <button
                      class="inline-block p-3 text-gray-700 hover:bg-gray-50 hover:text-emerald-600 focus:relative"
                      title="Edit Product"
                      @click="toggleRole(user)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-4 w-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <div
              class="px-3 py-1 text-xs font-medium leading-none text-center text-emerald-800 bg-emerald-200 rounded-full animate-pulse"
            >
              Loading...
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <router-view />
</template>

<script>
import Sidebar from "../../../components/SideBar.vue";
import axios from "axios";

export default {
  data() {
    return {
      Users: [],
      showModal: false,
    };
  },
  components:{
    Sidebar
  },
  created() {
    let apiURL = "http://localhost:3000/api/user-roles";
    axios
      .get(apiURL)
      .then((res) => {
        //console.log(res.data); // Debugging statement
        this.Users = res.data;
        //console.log(this.Categories); // Debugging statement
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    toggleRole(user) {
      const newRole = user.role === 'Admin' ? 'User' : 'Admin';
      axios
        .put(`http://localhost:3000/api/update-user-role/${user._id}`, { newRole })
        .then((response) => {
          user.role = response.data.user.role;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
<style scoped>
*{
  text-decoration: none;
}
</style>
