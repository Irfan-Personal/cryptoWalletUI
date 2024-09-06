interface Wallet {
  name: string;
  address: string;
}

interface WalletRequest {}

interface WalletResponse {
  data: Wallet[];
  meta: MetadataLists;
}

interface UserOp {
  sender: string;
  nonce: string;
  initCode: string;
  callData: string;
  signature: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  verificationGasLimit: string;
  callGasLimit: string;
  preVerificationGas: string;
  paymasterAndData: string;
}

interface UserOpRequest {
  recipientAddress: string;
  amount: string;
  chainId: string;
}

interface UserOpResponse {
  data: { userOp: UserOp; gasCost: string };
  meta: { timestamp: number; userOpHash: string };
}

interface SendUserOpRequest {
  userOp: UserOp;
  chainId: string;
  signature?: { r: string; s: string; v: string };
}
