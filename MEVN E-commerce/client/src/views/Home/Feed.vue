<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full">
    <body class="h-full">
    ```
  -->
  <main class="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8 no-underline">
    <div class="text-center" v-if="user">
      <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Welcome to our shop {{ user.email }}</h1>
      <p class="mt-6 text-base leading-7 text-gray-600"></p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <a href="/" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Home Page</a>
        <a href="/contact" class="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></a>
      </div>
    </div>
  </main>
</template>


<script>
import axios from 'axios';
import { onAuthStateChanged, getAuth } from "firebase/auth";

export default {
  name: "UserDetails",
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    const auth = getAuth();
    const userId = localStorage.getItem("userId");
    console.log(userId)
    if (userId) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.user = user;
          console.log("Current user: ", user);
          const response = await axios.post('http://localhost:3000/api/add-role-to-user', {
            userId: user.uid,
            userEmail: user.email,
            role: 'User'
          });
          console.log(response.data);
        }
      });
    }
  },
};
</script>
In this example, we are using the Axios library to make a POST request to the add-role-to-user route. We are passing in the current user's UID and the role we want to assign to them (in



