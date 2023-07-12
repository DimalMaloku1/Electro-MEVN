<template>
  <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="/vuejs.png"
          alt="Your Company"
        />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        
      </div>

      <input type="hidden" name="remember" value="true" />
      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            v-model="email"
            type="email"
            autocomplete="email"
            required=""
            class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            name="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required=""
            class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
          />
          <label for="remember-me" class="ml-2 block text-sm text-gray-900"
            >Remember me</label
          >
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-teal-600 hover:text-teal-500"
            >Forgot your password?</a
          >
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="group relative flex w-full justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          @click="register"
        >
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockClosedIcon
              class="h-5 w-5 text-teal-500 group-hover:text-teal-400"
              aria-hidden="true"
            />
          </span>
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const errMsg = ref();
const router = useRouter();
const register = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully logged in!");
      router.push("/feed");
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Email is invalid!";
          break;
        case "auth/user-not-found":
          errMsg.value = "Email does not exist!";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password!";
          break;

        default:
          errMsg.value = "Email or password is incorrect!";
          break;
      }
    });
};

const signInWithGoogle = () => {};
</script>

<style>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 50px;
}
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  margin-bottom: 20px;
  width: 350px;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin-bottom: 20px;
  width: 350px;
}
#loginBtn {
  width: 350px;
}
</style>
