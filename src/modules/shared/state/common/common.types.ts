export type CommonState = {
  colorScheme: 'dark' | 'light';
  email?: string;
  isDiscreteMode: boolean;
  serviceAccessToken: string | null;
  serviceRefreshToken: string | null;
};

export type Actions = {
  toggleColorScheme: () => void;
  toggleDiscreteMode: () => void;
  setAuthTokens: ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) => void;
  setServiceAccessToken: (token: string) => void;
  setServiceRefreshToken: (token: string) => void;
  setEmailAddress: (email: string) => void;
  reset: () => void;
};

export type CommonStore = CommonState & Actions;

export type StoreKeys = keyof CommonStore;
