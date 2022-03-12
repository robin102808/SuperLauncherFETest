<template>
  <div id="app">
    <h1 class="title">Welcome to BSC Wallet Balance Table</h1>
    <HomePage />
  </div>
</template>

<script>
import HomePage from './pages/HomePage.vue';

export default {
  name: 'App',
  components: {
    HomePage
  }
};
</script>

<style scoped>
.title {
  text-align: left;
}
</style>
