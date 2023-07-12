import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"
import "./assets/main.css";
import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: "AIzaSyAFX9hZskRHMhhMaf2GNiOYvP9Rvjo2MJM",
  authDomain: "ecommercevue-d5779.firebaseapp.com",
  projectId: "ecommercevue-d5779",
  storageBucket: "ecommercevue-d5779.appspot.com",
  messagingSenderId: "837465459391",
  appId: "1:837465459391:web:64fefd06df58b77c7b540a"
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)
app.mount('#app')

