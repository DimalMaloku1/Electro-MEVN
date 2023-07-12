<template>
    <div class="navbar">
        <nav>
        <img src="https://th.bing.com/th/id/R.0b333471aa2e67d8acf503abb80a2420?rik=y5ilHVYvvz3lcg&pid=ImgRaw&r=0"/>
        <div class="logo">
        </div>
        
        <div class="links">
        <router-link to="/"> Home </router-link>
            <router-link to="/feed"> Feed </router-link>
            </div>
            <div class="search">
            
            </div>

            <div class="userControls">
                <router-link to="/register"> Register </router-link>
            <router-link to="/login"> Login </router-link>
            <button @click="handleSignOut" v-if="isLoggedIn">Sign Out</button>

            </div>
           
        </nav>

        <router-view />
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import router from '../router';
const isLoggedIn = ref(false);
let auth;
onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn.value = true;
        }
        else {
            isLoggedIn.value = false;
        }
    });
})

const handleSignOut = () => {
    signOut(auth).then(() => {
        router.push("/");
    })
};

</script>
<style scoped>
.navbar {
    overflow: hidden;
    background-color: #fff;
    position: fixed;
    top: 0;
    width: 100%;
}

a {
    color: #000;
}
</style>
