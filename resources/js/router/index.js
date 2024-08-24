import { createRouter, createWebHistory } from 'vue-router';
import Product from '@/components/product/Index.vue';
import ProductShow from '@/components/product/Show.vue';
import ChuckOut from '@/components/order/Index.vue';
import Nav from '@/components/pageComponents/nav.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Product
  },
  {
    path: '/Product/:slug',
    name: 'Product/Show',
    component: ProductShow
  },
  {
    path: '/ChuckOut',
    name: 'ChuckOut',
    component: ChuckOut
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;