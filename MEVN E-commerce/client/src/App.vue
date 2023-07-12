<template>
  <body class="bg-gray-50 flex flex-col min-h-screen" >
    <div v-if="!isDashboard">
      <NavBar />

      <Footer />
    </div>
    <div v-if="isDashboard" class="flex flex-row">
      <SideBar />

    </div>

  </body>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import SideBar from "./components/SideBar.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    NavBar,
    SideBar,
    Footer
  },
  computed: {
    // Get the current route and determine the appropriate navigation component to show
    navComponent() {
      const routeMeta = this.$route.meta;
      if (routeMeta.showSidebar) {
        return "SideBar";
      } else if (routeMeta.showNavbar) {
        return "NavBar";
      } else {
        // Default to Navbar component if neither flag is set
        return "NavBar";
      }
    },
    isDashboard() {
      var path = window.location.pathname.split("/")[1];
      if (path == "dashboard") {
        return true;
      }
      return false;
    },
  },
  mounted() {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "Admin") {
      window.addEventListener("contextmenu", (event) => {
        event.preventDefault();
      });
    }
  }
};
</script>

<style scoped>
body {
  width: 100%;
}
</style>
