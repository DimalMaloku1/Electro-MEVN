<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 hover:text-emerald-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>

        <ChevronDownIcon class="-mr-1 ml-2 mt-0.5
         h-5 w-5" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div class="py-1" v-if="userRole==='Admin'">
          <MenuItem v-slot="{ active }" >
          <a href="/dashboard" :class="[
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block px-4 py-2 text-sm hover:text-emerald-600',
          ]">Dashboard</a>
          </MenuItem>
        </div>
        <div class="py-1">
          <MenuItem v-slot="{ active }">
          <a href="/cart" :class="[
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block px-4 py-2 text-sm hover:text-emerald-600',
          ]">Cart</a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
          <a href="/orders" :class="[
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block px-4 py-2 text-sm hover:text-emerald-600',
          ]">Orders</a>
          </MenuItem>
        </div>
        <div class="py-1">
          <MenuItem v-slot="{ active }">
          <a href="#" :class="[
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block px-4 py-2 text-sm hover:text-emerald-600',
          ]">Manage Account</a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
          <a href="#" :class="[
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block px-4 py-2 text-sm hover:text-emerald-600',
          ]" @click="handleSignOut">Logout</a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import router from "../router";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import axios from "axios";

const isVisible = ref(false);

const userRole = localStorage.getItem("userRole");

const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};

const isLoggedIn = ref(false);
let auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });

const userId = localStorage.getItem("userId");
// after user logs in and you have the userId
axios.get(`http://localhost:3000/api/user-role/${userId}`)
  .then((response) => {
    localStorage.setItem('userRole', response.data.role);
  })
  .catch((error) => {
    console.error(error);
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    localStorage.removeItem("userId");
    router.push("/");
  });
};
</script>

<style scoped>
* {
  text-decoration: none;
}
</style>
