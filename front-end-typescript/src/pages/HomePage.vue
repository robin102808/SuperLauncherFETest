<template>
  <div>
    <TokensSection />
    <WalletsSection
      :addWallet="addWallet"
      :removeWallet="removeWallet"
      :tokenList="token.tokenList"
      :walletList="walletList"
      :walletError="walletError"
    />
  </div>
</template>

<script lang="ts">
import TokensSection from '../components/TokensSection.vue';
import WalletsSection from '../components/WalletsSection.vue';
import { Ref, ref } from 'vue';
import { abi, web3 } from '../helper/helper';
import { token } from '../helper/token';

export default {
  name: 'Home',
  components: {
    TokensSection,
    WalletsSection
  },
  setup(): any {
    const walletList: Ref<any> = ref([]);
    const walletError: Ref<string> = ref('');

    const addWallet = async function (walletAddress: string): Promise<void> {
      walletError.value = '';
      if (walletAddress.length <= 0) return;
      // check for a wrong wallet address
      try {
        await web3.eth.getBalance(walletAddress);
      } catch (err) {
        walletError.value = 'Wrong Address Entered';
        return;
      }
      // check duplicate
      if (walletList.value.includes(walletAddress) === false) {
        walletList.value.push(walletAddress);
      } else {
        walletError.value = 'Address Already Exists';
      }
      console.log(walletList.value);
    };

    const removeWallet = function (walletAddress: string): void {
      walletError.value = '';
      if (walletAddress.length <= 0) return;
      walletList.value.forEach((value: string, index: any) => {
        if (value == walletAddress) walletList.value.splice(index, 1);
      });
    };

    return {
      walletList,
      addWallet,
      removeWallet,
      walletError,
      token
    };
  }
};
</script>

<style scoped></style>
