import { createStore } from 'vuex'; // Use 'createStore' instead of 'new Vuex.Store'
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
      axios.get('/api/products')
        .then(response => {
          commit('setProducts', response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    clearCart({ commit }) {
      commit('setCart', []);
    },
  },
});
