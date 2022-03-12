<template>
  <div>
    <TokensSection
      :addToken="addToken"
      :removeToken="removeToken"
      :token_list="token_list"
      :error="token_error"
    />
    <WalletsSection
      :addWallet="addWallet"
      :removeWallet="removeWallet"
      :token_list="token_list"
      :wallet_list="wallet_list"
      :error="wallet_error"
    />
  </div>
</template>

<script lang="ts">
import TokensSection from "./TokensSection.vue";
import WalletsSection from "./WalletsSection.vue";
import { Ref, ref } from "vue";
import { abi, web3 } from "../helper/helper";

export default {
  name: "Home",
  components: {
    TokensSection,
    WalletsSection,
  },
  setup(): any {
    const token_list: Ref<any> = ref({ BNB: { isDefault: true } });
    const wallet_list: Ref<any> = ref([]);
    const token_error = ref("");
    const wallet_error = ref("");
    const addToken = async function (token_address: string): Promise<void> {
      token_error.value = "";
      if (token_address.length <= 0) return;
      try {
        const contract = new web3.eth.Contract(abi, token_address);
        const token_symbol = await contract.methods.symbol().call();
        const token_name = await contract.methods.name().call();
        const token_decimal = await contract.methods.decimals().call();
        if (token_list.value[token_symbol] == undefined) {
          token_list.value[token_symbol] = {
            token_decimal,
            token_name,
            token_address,
            isDefault: false,
          };
        } else {
          token_error.value = "Token Already Exists";
        }
        console.log(token_list.value);
      } catch (err) {
        token_error.value = "Wrong Token Entered";
        return;
      }
    };

    const addWallet = async function (wallet_address: string): Promise<void> {
      wallet_error.value = "";
      if (wallet_address.length <= 0) return;
      // check for a wrong wallet address
      try {
        await web3.eth.getBalance(wallet_address);
      } catch (err) {
        wallet_error.value = "Wrong Address Entered";
        return;
      }
      // check duplicate
      if (wallet_list.value.includes(wallet_address) === false) {
        wallet_list.value.push(wallet_address);
      } else {
        wallet_error.value = "Address Already Exists";
      }
      console.log(wallet_list.value);
    };

    const removeWallet = function (wallet_address: string): void {
      wallet_error.value = "";
      if (wallet_address.length <= 0) return;
      wallet_list.value.forEach((value: string, index: any) => {
        if (value == wallet_address) wallet_list.value.splice(index, 1);
      });
    };

    const removeToken = function (symbol: string): void {
      token_error.value = "";
      if (symbol == "BNB") return;
      delete token_list.value[symbol];
    };

    return {
      token_list,
      wallet_list,
      addToken,
      addWallet,
      removeWallet,
      removeToken,
      token_error,
      wallet_error,
    };
  },
};
</script>

<style scoped>
</style>
