<script setup>
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';
import Pagination from '../pageComponents/Pagination.vue';

// Access the Vuex store
const store = useStore();
const itemsPerPage = ref(6);
const currentPage = ref(1);

// Map the products from the Vuex store to a computed property
const products = computed(() => store.state.products);

// Computed property for paginated products
const paginatedCards = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return products.value.slice(start, end);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

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

// Method to format the currency
function formatCurrency(amount) {
  // Convert amount from cents to dollars
  amount = amount / 100;
  
  // Format the amount as currency (USD)
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}
</script>


<template>
    <div class="flex m-10 flex-wrap gap-5 justify-center items-center" v-if="products.length">
        <div v-for="(product) in paginatedCards" :key="product.id" class="flex flex-col w-[100%] max-w-[350px] rounded-xl bg-[#ffffff] shadow-xl h-fit">
            <figure class="flex justify-center items-center rounded-xl h-48">
                <router-link :to="{ name: 'Product/Show', params: { slug: product.slug } }">
                    <img src="https://tailwind-generator.b-cdn.net/images/card-generator/tailwind-card-generator-card-preview.png"
                         alt="Card Preview" class="rounded-t-xl object-cover h-full w-full">
                </router-link>
            </figure>
            <div class="flex flex-col p-4 flex-grow">
                <div class="text-2xl font-bold text-[#374151] pb-2 truncate">{{ product.name }}</div>
                <div class="flex gap-2 overflow-hidden">
                    <ul v-for="cat in product.categories" :key="cat.id" class="truncate">
                        <li class="text-gray-400 text-[13px] mb-1">{{ cat.name }},</li>
                    </ul>
                </div>
                <div class="text-md text-[#374151] flex-grow overflow-hidden">
                    <p class="truncate-3-lines text-[15px]">{{ product.description }}</p>
                </div>
                <div class="flex justify-between items-center pt-6">
                    <p class="w-fit items-center px-4 py-2 bg-gray-200 rounded-md flex gap-1 text-green-500">
                        {{ formatCurrency(product.price) }}
                    </p>
                    <button class="w-fit items-center px-4 py-2 bg-green-300 rounded-md flex gap-1">
                        <img src="/images/shopping-cart.png" class='w-[25px]' alt="shopping cart">
                        <p>Add To The Cart</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <p>No products available.</p>
    </div>
    <Pagination :total-items="products.length" :items-per-page="itemsPerPage" :current-page="currentPage" @update:currentPage="handlePageChange" />
</template>


<style>
/* Custom class to handle multi-line truncation */
.truncate-3-lines {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}
</style>
