<script setup>
import { onMounted, ref } from "vue";
import { store } from '../../store';
import { useRoute } from "vue-router";

const route = useRoute();
const product = ref(null);
const loading = ref(true);

onMounted(async () => {
    const slug = route.params.slug;

    // Check if products are already in the store
    if (store.products.length > 0) {
        product.value = store.getProductBySlug(slug);
        loading.value = false;
    } else {
        // If not, fetch the products first
        try {
            await store.getProducts();
            product.value = store.getProductBySlug(slug);
            loading.value = false;
            if (!product.value) {
                console.error("Product not found.");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            loading.value = false;
        }
    }
});

// Method to format the currency
function formatCurrency(amount) {
    amount = amount / 100;
    return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
}
</script>

<template>
    <div class="flex justify-center items-center w-full h-full mb-[3rem]">
        <!-- Loading state -->
        <div v-if="loading" class="text-center">
            <p>Loading product...</p>
        </div>

        <!-- Product Display -->
        <div v-else-if="product" class="bg-white border w-[100%] max-w-[80%] h-fit rounded-xl shadow-sm sm:flex">
            <div class="pr-0 md:pr-2">
                <img
                    src="https://tailwind-generator.b-cdn.net/images/card-generator/tailwind-card-generator-card-preview.png"
                    alt="Card Preview"
                    class="rounded-xl object-cover h-full w-full"
                />
            </div>
            <div class="flex flex-wrap">
                <div class="p-4 flex flex-col h-full">
                    <h3 class="text-lg font-bold text-gray-800">{{ product.name }}</h3>
                    <div class="flex gap-2 overflow-hidden">
                        <ul v-for="cat in product.categories" :key="cat.id" class="truncate">
                            <li class="text-gray-400 text-[13px] mb-1">{{ cat.name }},</li>
                        </ul>
                    </div>
                    <p class="mt-1 text-gray-500">{{ product.description }}</p>
                    <div class="flex justify-between items-center pt-6 mt-10">
                        <p class="w-fit items-center px-4 py-2 bg-gray-200 rounded-md flex gap-1 text-green-500">
                            {{ formatCurrency(product.price) }}
                        </p>
                        <button 
                        @click="store.addToCart(product)"
                        class="w-fit items-center px-4 py-2 bg-green-300 rounded-md flex gap-1">
                            <img src="/images/shopping-cart.png" class="w-[25px]" alt="shopping cart" />
                            <p>Add To The Cart</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Fallback if product is not found -->
        <div v-else>
            <p>Product not found.</p>
        </div>
    </div>
</template>

<style scoped>
/* Add your styling here */
</style>
