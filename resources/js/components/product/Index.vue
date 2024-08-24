<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

// Access the Vuex store
const store = useStore();

// Fetch products when the component is mounted
onMounted(() => {
  store.dispatch('getProducts')
    .then(() => {
      // Handle successful dispatch if needed
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
});

// Map the products from the Vuex store to a computed property
const products = computed(() => store.state.products);
</script>

<template>
    <h1 class="bg-green-500">
        product  🤘 
    </h1>
    <div v-if="products.length">
      <h1>Products</h1>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.name }} - {{ product.price }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No products available.</p>
    </div>
</template>



<style scoped>

</style>