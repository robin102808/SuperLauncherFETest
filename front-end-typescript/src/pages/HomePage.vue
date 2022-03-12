<template>
  <div>
    <TokensSection
      :addToken="addToken"
      :removeToken="removeToken"
      :tokenList="tokenList"
      :tokenError="tokenError"
    />
    <WalletsSection
      :addWallet="addWallet"
      :removeWallet="removeWallet"
      :tokenList="tokenList"
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

export default {
  name: 'Home',
  components: {
    TokensSection,
    WalletsSection
  },
  setup(): any {
    const tokenList: Ref<any> = ref({ BNB: { isDefault: true } });
    const walletList: Ref<any> = ref([]);
    const tokenError = ref('');
    const walletError = ref('');
    const addToken = async function (tokenAddress: string): Promise<void> {
      tokenError.value = '';
      if (tokenAddress.length <= 0) return;
      try {
        const contract = new web3.eth.Contract(abi, tokenAddress);
        const tokenSymbol = await contract.methods.symbol().call();
        const tokenName = await contract.methods.name().call();
        const tokenDecimal = await contract.methods.decimals().call();
        if (tokenList.value[tokenSymbol] == undefined) {
          tokenList.value[tokenSymbol] = {
            tokenDecimal,
            tokenName,
            tokenAddress,
            isDefault: false
          };
        } else {
          tokenError.value = 'Token Already Exists';
        }
        console.log(tokenList.value);
      } catch (err) {
        tokenError.value = 'Wrong Token Entered';
        return;
      }
    };

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

    const removeToken = function (symbol: string): void {
      tokenError.value = '';
      if (symbol == 'BNB') return;
      delete tokenList.value[symbol];
    };

    return {
      tokenList,
      walletList,
      addToken,
      addWallet,
      removeWallet,
      removeToken,
      tokenError,
      walletError
    };
  }
};
</script>

<style scoped></style>
