<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>
            <form @submit.prevent>
              <input
                placeholder="Enter Wallet Address"
                v-model="wallet_input"
                class="item input-field"
              />
              <button
                @click="addWalletFromInput(wallet_input)"
                class="item add-btn"
              >
                Add Wallet
              </button>
            </form>
          </th>
          <th
            v-for="(token_val, symbol) in token_list"
            :key="symbol"
            :index="symbol"
          >
            <div class="item wallet-token">
              {{ symbol }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="error">
          <div class="error">{{ error }}</div>
        </tr>
        <tr v-for="(wallet_address, key, i) in wallet_list" :key="i">
          <td>
            <div class="item wallet-address">
              {{ wallet_address }}
            </div>
          </td>
          <td v-for="(token_val, symbol) in token_list" :key="symbol">
            <Balance
              :token_symbol="symbol"
              :wallet_address="wallet_address"
              :getBalance="getBalance"
            />
          </td>
          <td>
            <button
              @click="removeWallet(wallet_address)"
              class="item delete-wallet"
            >
              &times;
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Balance from './Balance.vue';
import { ref } from 'vue';
import { abi, web3 } from '../helper/helper';

export default {
  name: 'WalletsSection',
  props: ['removeWallet', 'wallet_list', 'token_list', 'addWallet', 'error'],
  components: {
    Balance
  },
  setup(props: any) {
    const wallet_input = ref('');

    const addWalletFromInput = async function () {
      await props.addWallet(wallet_input.value);
      wallet_input.value = '';
    };

    const getBalance = async function (
      token_symbol: string,
      wallet_address: string
    ): Promise<string> {
      try {
        if (token_symbol == 'BNB') {
          let bnbBal = await web3.eth.getBalance(wallet_address);
          return parseFloat(await web3.utils.fromWei(bnbBal)).toFixed(3);
        }
        const curr_token = props.token_list[token_symbol];
        if (!curr_token) return '';
        const contract = new web3.eth.Contract(abi, curr_token.token_address);
        const token_balance = await contract.methods
          .balanceOf(wallet_address)
          .call();
        const bal = token_balance / Math.pow(10, curr_token.token_decimal);
        console.log(bal);
        return bal.toFixed(3);
      } catch (err) {
        console.log(err);
        return '';
      }
    };
    return { wallet_input, addWalletFromInput, getBalance };
  }
};
</script>

<style scoped>
.wallet-token {
  min-width: 100px;
  background-color: none;
  text-align: center;
}
.wallet-address {
  min-width: 320px;
  background-color: #ffbdf7;
}
.delete-wallet {
  background-color: #fa9696;
  border: 0px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  min-width: 30px;
}
</style>
