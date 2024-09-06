interface FeeEstimates {
  userOpCost: string;
  symbol: string;
}

interface FeeEstimateRequest {
  userOp?: UserOp;
  turnkeyWalletAddress?: string;
  chainId: string;
}

interface FeeEstimateResponse {
  data: { feeEstimates: FeeEstimates };
  meta: { timestamp: number };
}
