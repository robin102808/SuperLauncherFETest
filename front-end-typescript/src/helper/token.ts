import { reactive } from 'vue';

export type Token = {
  isDefault: boolean;
  tokenDecimal: number;
  tokenName: string;
  tokenAddress: string;
};
export type Tokens = Record<string, Token>;
import { abi, web3 } from './helper';

export const token = reactive({
  tokenList: {
    BNB: {
      isDefault: true,
      tokenAddress: '',
      tokenName: 'BNB',
      tokenDecimal: 0
    }
  } as Tokens,

  tokenError: '' as string,

  async addToken(tokenAddress: string): Promise<void> {
    this.tokenError = '';
    if (tokenAddress.length <= 0) return;
    try {
      const contract = new web3.eth.Contract(abi, tokenAddress);
      const tokenSymbol: string = await contract.methods.symbol().call();
      const tokenName: string = await contract.methods.name().call();
      const tokenDecimal: number = await contract.methods.decimals().call();
      if (this.tokenList[tokenSymbol] == undefined) {
        this.tokenList[tokenSymbol] = {
          tokenDecimal,
          tokenName,
          tokenAddress,
          isDefault: false
        };
      } else {
        this.tokenError = 'Token Already Exists';
      }
      console.log(this.tokenList);
    } catch (err) {
      this.tokenError = 'Wrong Token Entered';
      return;
    }
  },
  removeToken(symbol: string): void {
    this.tokenError = '';
    if (symbol == 'BNB') return;
    delete this.tokenList[symbol];
  }
});
