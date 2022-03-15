import { reactive } from 'vue';
import { abi, web3 } from './helper';
import { Wallets } from '../models/Wallets';

export const wallet = reactive({
  walletList: [] as Wallets,

  walletError: '' as string,

  async addWallet(walletAddress: string): Promise<void> {
    this.walletError = '';
    if (walletAddress.length <= 0) return;
    // check for a wrong wallet address
    try {
      await web3.eth.getBalance(walletAddress);
    } catch (err) {
      this.walletError = 'Wrong Address Entered';
      return;
    }
    // check duplicate
    if (this.walletList.includes(walletAddress) === false) {
      this.walletList.push(walletAddress);
    } else {
      this.walletError = 'Address Already Exists';
    }
    console.log(this.walletList);
  },

  removeWallet(walletAddress: string): void {
    this.walletError = '';
    if (walletAddress.length <= 0) return;
    this.walletList.forEach((value: string, index: any) => {
      if (value == walletAddress) this.walletList.splice(index, 1);
    });
  }
});
