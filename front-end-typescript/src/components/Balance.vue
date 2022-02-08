<template>
  <div>
    <p class="item balance-value">
      {{ balance }}
    </p>
  </div>
</template>

<script lang="ts">
import { onMounted, onUpdated, ref } from "vue";
export default {
  name: "Balance",
  props: ["token_symbol", "getBalance", "wallet_address"],
  setup(props: any): any {
    const balance = ref(0);
    const getBalance = async () => {
      balance.value = await props.getBalance(
        props.token_symbol,
        props.wallet_address
      );
    };
    onMounted(() => {
      getBalance();
    });
    onUpdated(() => {
      getBalance();
    });
    return { balance };
  },
};
</script>

<style scoped>
.balance-value {
  min-width: 100px;
  background-color: lightgray;
}
</style>
