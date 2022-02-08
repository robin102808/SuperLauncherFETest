<template>
  <div id="app">
  <h1 class="title">Welcome to BSC Wallet Balance Table</h1>
  <Home />
  </div>
</template>

<script>
import Home from "./components/Home.vue";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style scoped>
.title{
  text-align: left;
}

</style>
