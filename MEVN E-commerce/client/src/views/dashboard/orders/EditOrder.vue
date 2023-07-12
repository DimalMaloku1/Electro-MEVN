<template>
  <section class="bg-gray-100 w-screen">
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <form @submit.prevent="handleUpdateForm">
        <div class=" px-4 mx-auto max-w-2xl ">
          <h2 class="mb-2 text-xl leading-none text-black md:text-2xl ">Order Id: {{ order._id }}</h2>

          <div class="sm:col-span-2">
            <label for="status"
              class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
              <select type="text" id="status" placeholder="Status"
                class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                v-model="order.status" required>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Completed</option>
              </select>

              <span
                class="absolute left-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                Status
              </span>
            </label>
          </div>
          <dl class="mt-6">
            <dt class="mb-2 font-semibold leading-none text-black">Shipping address:</dt>
            <dd class="mb-4 font-semibold text-gray-900 sm:mb-5 ">
              Name: {{ order.shippingDetails.name }}<br>
              Surname: {{ order.shippingDetails.surname }}<br>
              Country: {{ order.shippingDetails.country }}<br>
              City: {{ order.shippingDetails.city }}<br>
              Address: {{ order.shippingDetails.address }}<br>
              ZipCode: {{ order.shippingDetails.zipCode }}</dd>
          </dl>
          <dl>
            <div>
              <dt class="mb-2  text-xl  leading-none text-gray-900 ">Items:</dt>
              <dd class="mb-4 font-light text-gray-500 sm:mb-5 ">
                <div>
                  <ul class="space-y-4">
                    <li class="flex items-center gap-4 border rounded-lg px-4 shadow-sm py-1" v-for="item in order.items"
                      :key="item._id">
                      <img :src=getProductImage(item.productId) alt="" class="h-16 w-16 rounded object-cover" />
                      <div>
                        <h3 class="text-sm text-gray-900">{{ getProductName(item.productId) }}</h3>
                        <dl class="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt class="inline text-sm">Description:</dt>
                            <dd class="inline text-sm">{{ getProductDesc(item.productId) }}</dd>
                          </div>
                          <div>
                            <dt class="inline text-sm">Quantity:</dt>
                            <dd class="inline text-sm">{{ item.quantity }}</dd>
                          </div>

                        </dl>
                      </div>

                    </li>
                  </ul>

                </div>
              </dd>
            </div>

          </dl>
        </div>
        <button
          class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-emerald-600 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-emerald-700"
        >
          Edit
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
      order: {},
      products: []
    };
  },
  created() {
    let apiURL = `http://localhost:3000/api/orders/${this.$route.params.id}`;

    axios.get(apiURL).then((res) => {
      this.order = res.data;
    });
  },
  mounted() {
    axios.get("http://localhost:3000/api/products").then((response) => {
      this.products = response.data;
    });
  },
  methods: {
    handleUpdateForm() {
      let apiURL = `http://localhost:3000/api/orders/${this.$route.params.id}`;

      axios
        .put(apiURL, this.order)
        .then((res) => {
          console.log(res);
          this.$router.push("/dashboard/order/list-orders");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    calculatePrice(item) {
      const product = this.products.find((p) => p._id === item.productId);
      return product.price * item.quantity;
    },
    getProductImage(productId) {
      const product = this.products.find((p) => p._id === productId);
      return product ? product.image : "";
    },
    getProductName(productId) {
      const product = this.products.find((p) => p._id === productId);
      return product ? product.name : "";
    },
    getProductQuanitity(productId) {
      const product = this.products.find((p) => p._id === productId);
      return product ? product.quantity : "";
    },
    getProductDesc(productId) {
      const product = this.products.find((p) => p._id === productId);
      return product ? product.description : "";
    },
  },
};
</script>
<style scoped>
* {
  text-decoration: none;
}
</style>
