import { useEffect } from 'react';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const useDeepLinking = (isFetching: boolean) => {
  const navigation = useNavigation<Navigation>();

  useEffect(() => {
    if (!isFetching) {
      const handleDeepLink = (event: { url: string }) => {
        const url = event.url;
        if (url) {
          const pathname = url.replace(/.*?:\/\//g, '');
          const [, path] = pathname.split('/');
          if (path && path.includes('validate')) {
            navigation.navigate('EmailAuthenticationFlow', {
              screen: 'EmailConfirmation',
              params: {
                link: url,
              },
            });
          }
        }
      };

      Linking.addEventListener('url', handleDeepLink);

      Linking.getInitialURL().then((url) => {
        if (url) handleDeepLink({ url });
      });

      return () => {
        Linking.removeAllListeners('url');
      };
    }
  }, [navigation, isFetching]);

};
