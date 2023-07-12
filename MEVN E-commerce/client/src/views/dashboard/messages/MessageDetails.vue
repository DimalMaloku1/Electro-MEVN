<template>
  <section class="bg-gray-100 w-screen">
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <form @submit.prevent="handleUpdateForm">
        <div class=" px-4 mx-auto max-w-2xl ">
          <h2 class="mb-2 text-xl leading-none text-black md:text-2xl ">Message Id: {{ msg._id }}</h2>

         
          <dl class="mt-6">
            <dt class="mb-2 font-semibold leading-none text-black">Name: {{ msg.name }}</dt>
          </dl>
          <dl class="mt-6">
            <dt class="mb-2 font-semibold leading-none text-black">Email: {{ msg.email }}</dt>

          </dl>
          <dl class="mt-6">
            <dt class="mb-2 font-semibold leading-none text-black">Phone: {{ msg.phone }}</dt>

          </dl>
          <dl class="mt-6">
            <dt class="mb-2 font-semibold leading-none text-black">Message: {{ msg.message }}</dt>

          </dl>

        </div>
        <button
          class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-emerald-600 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-emerald-700"
        >
          Back to list
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      msg: {}
    };
  },
  created() {
    let apiURL = `http://localhost:3000/api/contacts/${this.$route.params.id}`;

    axios.get(apiURL).then((res) => {
      this.msg = res.data;
    });
  },
  methods: {
    handleUpdateForm() {
      this.$router.push("/dashboard/messages/list-messages");
    },
  },
};
</script>
<style scoped>
* {
  text-decoration: none;
}
</style>
