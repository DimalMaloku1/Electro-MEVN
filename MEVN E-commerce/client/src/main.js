import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles.css";

import 'bootstrap/dist/css/bootstrap.min.css'

import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'flowbite/dist/flowbite.js';
import 'flowbite/dist/flowbite.min.js';
import 'alpinejs/dist/cdn.min.js';


import { initializeApp } from "firebase/app";

import 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyAFX9hZskRHMhhMaf2GNiOYvP9Rvjo2MJM",
  authDomain: "ecommercevue-d5779.firebaseapp.com",
  projectId: "ecommercevue-d5779",
  storageBucket: "ecommercevue-d5779.appspot.com",
  messagingSenderId: "837465459391",
  appId: "1:837465459391:web:64fefd06df58b77c7b540a",
};



initializeApp(firebaseConfig);


createApp(App)
  .use(router)
  .provide('firebase', app)
  .mount('#app');