import { reactive } from 'vue';
import axios from 'axios';

export const store = reactive({
  // State
  products: [],
  cart: [],
  order: {},

  // Mutations (methods to update the state)
  setProducts(products) {
    this.products = products;
  },
  
  addToCart(product) {
    const productInCart = this.cart.find(item => item.slug === product.slug);
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  },
  
  removeFromCart(index) {
    this.cart.splice(index, 1);
  },
  
  setCart(cart) {
    this.cart = cart;
  },
  
  setOrder(order) {
    this.order = order;
  },

  // Actions (methods to handle asynchronous operations)
  async getProducts() {
    try {
      const response = await axios.get('/api/products');
      this.setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  clearCart() {
    this.setCart([]);
  },

  // Getters (computed properties)
  getProductBySlug(slug) {
    return this.products.find(product => product.slug === slug);
  },
});
