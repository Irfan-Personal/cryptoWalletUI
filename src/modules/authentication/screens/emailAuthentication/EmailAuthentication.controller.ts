import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { useCommonStore } from '~shared/state/common/store';

interface EmailAuthenticationInput {
  email: string;
}

const emailAuthenticationValidationSchema = yup
  .object({
    email: yup.string().required().email(),
  })
  .required();

export function useEmailAuthentication() {
  const form = useForm<EmailAuthenticationInput>({
    resolver: yupResolver(emailAuthenticationValidationSchema),
    defaultValues: {
      email: '',
    },
  });

  const { navigate } = useNavigation<Navigation>();

  const onGenerateMagicLink: SubmitHandler<EmailAuthenticationInput> = async ({
    email,
  }) => {
    try {
      await auth().sendSignInLinkToEmail(email, {
        url: 'https://passwalletonchain.page.link/validate',
        handleCodeInApp: true,
        iOS: {
          bundleId: 'com.pass.wallet',
        },
        android: {
          packageName: 'com.pass.wallet',
          installApp: true,
          minimumVersion: '14',
        },
      });
      const store = useCommonStore.getState();
      store.setEmailAddress(email);
      navigate('EmailConfirmation');
    } catch (exp) {
      console.log('::::', exp);
    }
  };

  return { form, onGenerateMagicLink };
}
