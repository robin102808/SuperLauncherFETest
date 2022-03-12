<template>
  <p class="item balance-value">
    {{ balance }}
  </p>
</template>

<script lang="ts">
import { onMounted, onUpdated, ref } from 'vue';
export default {
  name: 'Balance',
  props: ['tokenSymbol', 'getBalance', 'walletAddress'],
  setup(props: any): any {
    const balance = ref(0);
    const getBalance = async () => {
      balance.value = await props.getBalance(
        props.tokenSymbol,
        props.walletAddress
      );
    };
    onMounted(() => {
      console.log('in mounted');
      getBalance();
    });
    onUpdated(() => {
      console.log('in updated');
      getBalance();
    });
    return { balance };
  }
};
</script>

<style scoped>
.balance-value {
  min-width: 100px;
  background-color: lightgray;
}
</style>
