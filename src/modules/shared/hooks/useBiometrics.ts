import { useCallback, useEffect, useState } from 'react';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

type BiometricType = keyof typeof BiometryTypes | 'None';

interface UseBiometricsResult {
  isBiometricsSupported: boolean;
  biometricType: BiometricType;
}

export const useBiometrics = (): UseBiometricsResult => {
  const [isBiometricsSupported, setIsBiometricsSupported] = useState(false);
  const [biometricType, setBiometricType] = useState<BiometricType>('None');

  const checkBiometricSupport = useCallback(async () => {
    const rnBiometrics = new ReactNativeBiometrics();
    const { available, biometryType } = await rnBiometrics.isSensorAvailable();

    if (available && biometryType) {
      setIsBiometricsSupported(true);
      setBiometricType(biometryType);
    } else {
      setIsBiometricsSupported(false);
      setBiometricType('None');
    }
  }, []);

  useEffect(() => {
    checkBiometricSupport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isBiometricsSupported, biometricType };
};
