import { createStore } from 'vuex';
import axios from 'axios';

export const store = createStore({
  state: {
    products: [],
    cart: [],
    order: {},
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    addToCart(state, product) {
      let checkProductInCart = state.cart.findIndex(item => item.slug === product.slug);
      if (checkProductInCart !== -1) {
        state.cart[checkProductInCart].quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(state, index) {
      state.cart.splice(index, 1);
    },
    setCart(state, cart) {
      state.cart = cart;
    },
    setOrder(state, order) {
      state.order = order;
    },
  },
  actions: {
    getProducts({ commit }) {
      return axios.get('/api/products') // Add return here
        .then(response => {
          commit('setProducts', response.data);
        })
        .catch(error => {
          console.log(error);
          throw error; // Rethrow the error so it can be caught in the component
        });
    },
    clearCart({ commit }) {
      commit('setCart', []);
    },
  },
  getters: {
    getProductBySlug: (state) => (slug) => {
      return state.products.find(product => product.slug === slug);
    },
  }
});
