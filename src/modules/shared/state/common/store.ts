import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { mmkvStorage } from '~src/modules/shared/state/mmkvStorage.ts';

import { CommonStore, StoreKeys } from './common.types.ts';
import { createActions, initialState } from './storeSetup.ts';

export const useCommonStore = create(
  persist<CommonStore>(
    (set) => ({
      ...initialState,
      ...createActions(set),
      reset: () => set(initialState),
    }),
    {
      name: 'common-store',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

export const useCommonStoreShallow = <T extends StoreKeys>(
  selectedKeys: T[]
): Pick<CommonStore, T> => {
  return useCommonStore(
    useShallow((state) =>
      selectedKeys.reduce<Pick<CommonStore, T>>(
        (acc, key) => {
          acc[key] = state[key];

          return acc;
        },
        {} as Pick<CommonStore, T>
      )
    )
  );
};
