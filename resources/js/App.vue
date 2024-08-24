<script setup>
import { RouterView } from 'vue-router';
import Nav from '@/components/pageComponents/nav.vue';
import Footer from '@/components/pageComponents/footer.vue';
</script>

<template>
  <Nav />
  <div class="mt-[8rem]">
    <router-view />
  </div>
  <Footer />
</template>
