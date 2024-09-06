interface Wallet {
  name: string;
  address: string;
}

interface WalletRequest {}

interface WalletResponse {
  data: { wallets: Wallet[] };
  meta: MetadataLists;
}

interface AddressInputResponse {
  value: string;
  error?: string | null;
}
