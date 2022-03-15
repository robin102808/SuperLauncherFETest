<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>
            <input
              placeholder="Enter Wallet Address"
              v-model="walletInput"
              class="item input-field"
            />
            <button
              @click="addWalletFromInput(walletInput)"
              class="item add-btn"
            >
              Add Wallet
            </button>
          </th>
          <th
            v-for="(tokenVal, symbol) in token.tokenList"
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
        <tr v-if="wallet.walletError">
          <div class="error">{{ wallet.walletError }}</div>
        </tr>
        <tr v-for="(walletAddress, key, i) in wallet.walletList" :key="i">
          <td>
            <div class="item wallet-address">
              {{ walletAddress }}
            </div>
          </td>
          <td v-for="(tokenVal, symbol) in token.tokenList" :key="symbol">
            <BalanceValue
              :tokenSymbol="symbol"
              :walletAddress="walletAddress"
              :getBalance="getBalance"
            />
          </td>
          <td>
            <button
              @click="wallet.removeWallet(walletAddress)"
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
import BalanceValue from './BalanceValue.vue';
import { ref } from 'vue';
import { abi, web3 } from '../helper/helper';
import { token } from '../helper/token';
import { wallet } from '../helper/wallet';

export default {
  name: 'WalletsSection',
  components: {
    BalanceValue
  },
  setup() {
    const walletInput = ref('');

    const addWalletFromInput = async function () {
      await wallet.addWallet(walletInput.value);
      walletInput.value = '';
    };

    const getBalance = async function (
      tokenSymbol: string,
      walletAddress: string
    ): Promise<string> {
      try {
        if (tokenSymbol == 'BNB') {
          let bnbBal = await web3.eth.getBalance(walletAddress);
          return parseFloat(await web3.utils.fromWei(bnbBal)).toFixed(3);
        }
        const currToken = token.tokenList[tokenSymbol];
        if (!currToken) return '';
        const contract = new web3.eth.Contract(abi, currToken.tokenAddress);
        const tokenBalance = await contract.methods
          .balanceOf(walletAddress)
          .call();
        const bal = tokenBalance / Math.pow(10, currToken.tokenDecimal);
        console.log(bal);
        return bal.toFixed(3);
      } catch (err) {
        console.log(err);
        return '';
      }
    };
    return { walletInput, addWalletFromInput, getBalance, wallet, token };
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

table,
th,
td {
  border-collapse: collapse;
  padding: 0px !important;
}
</style>
