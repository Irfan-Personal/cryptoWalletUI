import { StoreApi } from 'zustand';

import { CommonState, CommonStore } from './common.types.ts';

export const initialState: CommonState = {
  colorScheme: 'light',
  email: undefined,
  isDiscreteMode: false,
  serviceAccessToken: null,
  serviceRefreshToken: null,
};

export const createActions = (set: StoreApi<CommonStore>['setState']) => ({
  toggleColorScheme: () =>
    set((state) => ({
      colorScheme: state.colorScheme === 'light' ? 'dark' : 'light',
    })),
  toggleDiscreteMode: () =>
    set((state) => ({ isDiscreteMode: !state.isDiscreteMode })),
  setAuthTokens: ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) =>
    set(() => ({
      serviceAccessToken: accessToken,
      serviceRefreshToken: refreshToken,
    })),
  setServiceAccessToken: (accessToken: string) =>
    set(() => ({
      serviceAccessToken: accessToken,
    })),
  setServiceRefreshToken: (refreshAccessToken: string) =>
    set(() => ({
      serviceRefreshToken: refreshAccessToken,
    })),
  setEmailAddress: (email: string) =>
    set(() => ({
      email,
    })),
});
