<template>
  <!--Banner-->
  <section class="relative h-96 bg-[url(http://localhost:3000/images/bannerImg.jpg)] bg-cover bg-center bg-no-repeat">
    <div class="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25"></div>

    <div class="relative h-96 mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:items-center lg:px-8">
      <div class="max-w-xl text-center sm:text-left">
        <h1 class="text-3xl font-extrabold sm:text-5xl">
          Dell Alienware

          <strong class="block font-extrabold text-emerald-700"> Aurora R13. </strong>
        </h1>

        <p class="mt-4 max-w-lg sm:text-xl sm:leading-relaxed">
          Unleash the power of the universe and revolutionize your game. Get yours today and
          experience the ultimate satisfaction.
        </p>

      </div>
    </div>
  </section>
  <!--Products-->
  <section class="bg-gray-100">
    <div class="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
      <header class="text-center">
        <h2 class="text-xl font-bold text-gray-900 sm:text-3xl">Featured Products</h2>
      </header>

      <ul class="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="product in Products" :key="product._id" class="shadow-md border rounded-lg">
          <a :href="`/product/${product._id}`" class="group relative block overflow-hidden">
            <button
              class="absolute right-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
              <span class="sr-only">Wishlist</span>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>

            <img :src="getImageUrl(product.image)" alt=""
              class="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72" />

            <div class="relative border border-gray-100 bg-white p-6 flex flex-col">
              <span class="whitespace-nowrap bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white">
                Featured
              </span>

              <h3 class="mt-4 text-lg font-medium text-gray-900">{{ product.name }}</h3>

              <p class="mt-1.5 text-sm text-gray-700">{{ product.description }}</p>
              <div class="card-content flex-1">
                <h3 class="mt-4 text-lg font-medium text-gray-900">{{ product.price }}.00&euro;</h3>

                <form class="mt-4">
                  <button :disabled="product.stock < 1"
                    class="block w-full rounded bg-emerald-600 p-4 text-sm font-medium transition hover:scale-105 text-white"
                    @click.prevent="addItemToCart(product._id)">
                    {{ product.stock < 1 ? "Out of Stock" : "Add to Cart" }} </button>
                </form>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </section>

  <!--Reviews-->
</template>

<script>
import Footer from "../../components/Footer.vue";
import axios from "axios";




export default {
  data() {
    return {
      currentUser: localStorage.getItem('userId'),
      Products: [],
      errorMessage: "",
    };
  },
  components: {
    Footer
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      this.Products = response.data.filter(product => product.isFeatured);
    } catch (error) {
      console.log(error);
      this.errorMessage = "Sorry, there was an error loading the products.";
    };

  },
  computed() {

  },
  methods: {
    getImageUrl(filePath) {
      return `http://localhost:3000/${filePath}`;
    },
    addItemToCart(productId) {
      const userId = localStorage.getItem('userId');

      axios.post(`http://localhost:3000/api/cart/${userId}`, { productId: productId })
        .then(response => {
          console.log(response.data);

          this.getCartItems();
        })
        .catch((error) => {
          console.error('Error adding item to cart: ', error);
        });
    },

    // Remove item from cart
    removeItemFromCart(product) {
      const userId = localStorage.getItem('userId');

      axios.delete(`http://localhost:3000/api/cart/${this.currentUser}/${product}`)
        .then(() => {
          console.log('Item deleted from cart successfully!');
          this.getCartItems();
        })
        .catch((error) => {
          console.error('Error deleting item from cart: ', error);
        });
    },


    // Get cart items
    getCartItems() {
      const userId = localStorage.getItem('userId');
      axios.get(`http://localhost:3000/api/cart/${this.currentUser}`)
        .then((response) => {
          this.items = response.data.items;
        })
        .catch((error) => {
          console.error('Error getting cart items: ', error);
        });
    }
  }
};
</script>

<style scoped>
* {
  text-decoration: none;
}

.grid li {
  display: flex;
  flex-direction: column;
}

.card-content {
  flex: 1;
}
</style>
