<template>
  <section>
    <h1 class="sr-only">Checkout</h1>

    <div class="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
      <div class="bg-gray-50 py-12 md:py-24">
        <div class="mx-auto max-w-lg space-y-8 px-4 lg:px-8">
          <div class="flex items-center gap-4">
            <span class="h-10 w-10 rounded-full bg-emerald-700"></span>

            <img class="h-12" viewBox="0 0 28 24" fill="none" src="/vuejs.png" />
          </div>

          <div>
            <p class="text-4xl font-medium tracking-tight text-gray-900">
              Your total is: {{ cartTotal }}&euro;
            </p>


          </div>

          <div>
            <div class="flow-root">
              <ul class="-my-4 divide-y divide-gray-100">
                <li 
                  v-for="item in cartItems" :key="item._id">
                  <a :href="`/product/${item.productId}`" class="flex items-center gap-4  border rounded-lg shadow-md w-full my-6 px-4 pt-2">
                  <img :src=getImageUrl(getProductImage(item.productId)) alt="" class="h-16 w-16 rounded object-cover" />


                  <div>
                    <h3 class="text-2xl text-gray-900">{{ getProductName(item.productId) }}</h3>

                    <dl class="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt class="inline text-sm">Description: </dt>
                        <dd class="inline text-sm"> {{ getProductDesc(item.productId) }}</dd>
                      </div>

                      <div>
                        <dt class="inline text-sm">Quanitity: </dt>
                        <dd class="inline text-sm"> {{ item.quantity }}</dd>
                      </div>

                      <div>
                        <dt class="inline text-sm">Price: </dt>
                        <dd class="inline text-sm"> {{ calculatePrice(item) }}&euro;</dd>
                      </div>
                    </dl>
                  </div>
                </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white py-12 md:py-24">
        <div class="mx-auto max-w-lg px-4 lg:px-8">
          <form class="grid grid-cols-6 gap-4" action="#" @submit.prevent="handleSubmitForm">
            <div class="col-span-3">
              <label for="name" class="block text-xs font-medium text-gray-700">
                First Name
              </label>

              <input type="text" id="name" placeholder="Name"
                class="mt-1 h-12 px-2 w-full rounded-md border shadow-md sm:text-sm" v-model="shippingDetails.name"
                required />
            </div>

            <div class="col-span-3">
              <label for="surname" class="block text-xs font-medium text-gray-700">
                Last Name
              </label>

              <input type="text" id="surname" placeholder="Surname"
                class="mt-1 h-12 px-2 w-full rounded-md border shadow-md sm:text-sm" v-model="shippingDetails.surname"
                required />
            </div>

            <div class="col-span-6">
              <label for="email" class="block text-xs font-medium text-gray-700">
                Email
              </label>

              <input type="email" id="email" placeholder="Email"
                class="mt-1 h-12 px-2 w-full rounded-md border shadow-md sm:text-sm" v-model="shippingDetails.email"
                required />
            </div>

            <div class="col-span-6">
              <label for="phone" class="block text-xs font-medium text-gray-700">
                Phone
              </label>

              <input type="tel" id="phone" placeholder="Phone"
                class="mt-1 h-12 px-2 w-full rounded-md border shadow-md sm:text-sm" v-model="shippingDetails.phone"
                required />
            </div>


            <fieldset class="col-span-6">
              <legend class="block text-sm font-medium text-gray-700">
                Billing Address
              </legend>


              <div>
                <label class="sr-only" for="country"> Country </label>

                <input type="text" id="country" placeholder="Country"
                  class="mt-1 h-12 px-4 w-full rounded-md border shadow-md sm:text-sm" v-model="shippingDetails.country"
                  required />
              </div>

              <div>
                <label class="sr-only" for="city"> City </label>

                <input type="text" id="city" placeholder="City"
                  class="mt-3 h-12 px-4 w-full rounded-md border shadow-md sm:text-sm" v-model="shippingDetails.city"
                  required />
              </div>
              <div>
                <label class="sr-only" for="address"> Address </label>

                <input type="text" id="address" placeholder="Address"
                  class="mt-3 h-12 px-4 w-full rounded-md border shadow-md sm:text-sm" v-model="shippingDetails.address"
                  required />
              </div>
              <div>
                <label class="sr-only" for="zipCode"> ZipCode </label>

                <input type="text" id="zipCode" placeholder="ZipCode"
                  class="mt-3 h-12 px-4 w-full rounded-md border shadow-md sm:text-sm" v-model="shippingDetails.zipCode"
                  required />
              </div>

            </fieldset>

            <div class="col-span-6">
              <button
                class="block w-full rounded-md bg-emerald-700 hover:bg-emerald-800 p-2.5 text-sm text-white transition hover:shadow-lg">
                Pay Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cartItems: [],
      products: [],
      shippingDetails: {
        name: "",
        surname: "",
        city: "",
        address: "",
        country: "",
        phone: "",
        email: "",
        zipCode: ""
      },
    };
  },
  created() {
    const userId = localStorage.getItem('userId');
    axios.get(`http://localhost:3000/api/cart/${userId}`)
      .then(response => {
        console.log(response.data);
        this.cartItems = response.data;
      })
      .catch((error) => {
        console.error('Error getting cart items: ', error);
      });
  },
  mounted() {
    axios.get("http://localhost:3000/api/products").then((response) => {
      this.products = response.data;
    });
  },
  computed: {
    cartTotal() {
      return this.cartItems.reduce((total, item) => {
        const product = this.products.find((p) => p._id === item.productId);
        if (product) {
          return total + (product.price * item.quantity);
        } else {
          return total;
        }
      }, 0);
    }
  },

  methods: {
    handleSubmitForm() {
      const userId = localStorage.getItem('userId');
      // Make the POST request
      axios.post(`http://localhost:3000/api/orders/${userId}`, this.shippingDetails)
        .then(response => {
          this.$router.push("/");
          this.shippingDetails = {
            name: "",
            surname: "",
            city: "",
            address: "",
            country: "",
            phone: "",
            email: "",
            zipCode: ""
          };
          console.log('Order created successfully:', response.data.order);
        })
        .catch(error => {

          console.error('Error creating order:', error.response.data.message);
        });
    },
    getImageUrl(filePath) {
      return `${filePath}`;
    },
    getProductImage(productId) {
      const product = this.products.find((p) => p._id === productId);
      return product ? `http://localhost:3000/${product.image}` : "";
    },
    calculatePrice(item) {
      const product = this.products.find((p) => p._id === item.productId);
      return product.price * item.quantity;
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
    async getCartItems() {
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get(`http://localhost:3000/api/cart/${userId}`);
        this.cartItems = response.data.items;
      } catch (error) {
        console.error('Error getting cart items:', error);
      }
    }
  }
};
</script>
<style scoped>* {
  text-decoration: none;
}</style>
