<template>
  <div id="app">
    <h1 class="title">Welcome to BSC Wallet Balance Table</h1>
    <TokensSection />
    <WalletsSection />
  </div>
</template>

<script>
import TokensSection from './components/TokensSection.vue';
import WalletsSection from './components/WalletsSection.vue';

export default {
  name: 'App',
  components: {
    TokensSection,
    WalletsSection
  }
};
</script>

<style scoped>
.title {
  text-align: left;
}
</style>
