<template>
  
</template>

<script setup>
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import { getAuth } from "firebase/auth";
import $ from 'jQuery'

const auth = getAuth();
const user = auth.currentUser;



$(document).ready(function() {
  console.log(auth.currentUser.uid);
    if (user !== null) {
  user.providerData.forEach((profile) => {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  });
}
});

</script>