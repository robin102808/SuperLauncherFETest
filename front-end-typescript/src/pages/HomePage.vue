<template>
  <div>
    <TokensSection />
    <WalletsSection />
  </div>
</template>

<script lang="ts">
import TokensSection from '../components/TokensSection.vue';
import WalletsSection from '../components/WalletsSection.vue';

export default {
  name: 'Home',
  components: {
    TokensSection,
    WalletsSection
  },
  setup(): any {
    return {};
  }
};
</script>

<style scoped></style>
