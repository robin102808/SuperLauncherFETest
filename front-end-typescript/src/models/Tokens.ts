export type Token = {
  isDefault: boolean;
  tokenDecimal: number;
  tokenName: string;
  tokenAddress: string;
};

export type Tokens = Record<string, Token>;
