export function isEthAddressValid(address: string) {
  if (!address) return false;

  const ethAddressRegex = /\b0x[a-f|A-F|0-9]{40}\b/g;

  return ethAddressRegex.test(address);
}
