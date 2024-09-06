import { BlockchainNetwork } from '~shared/connectivity/network/network.d';
import { useNetworks } from '~shared/connectivity/network/useNetworks.ts';

export function useNetworksMap():
  | Record<number, BlockchainNetwork>
  | Record<number, never> {
  const { data, isLoading, isError } = useNetworks();
  const networks = data?.data?.networks;

  if (isLoading || isError || !networks) return {};

  return networks.reduce<Record<number, BlockchainNetwork>>(
    (result, network) => {
      result[network.id] = network;

      return result;
    },
    {}
  );
}
