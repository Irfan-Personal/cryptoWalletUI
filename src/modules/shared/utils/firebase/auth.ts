import { appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import googleServicesJson from '../../../../../android/app/google-services.json';

export const googleSignIn = async () => {
  const clientId = googleServicesJson.client[0].oauth_client.find(
    ({ client_type }) => client_type === 3
  )?.client_id;

  GoogleSignin.configure({
    webClientId: clientId,
  });

  await GoogleSignin.hasPlayServices({
    showPlayServicesUpdateDialog: true,
  });

  const googleSignInResponse = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(
    googleSignInResponse.idToken
  );
  const data = await auth().signInWithCredential(googleCredential);
  const idToken = await auth().currentUser?.getIdToken();

  if (!idToken) {
    throw 'Google Sign-In failed - no id token returned';
  }

  return { data, idToken };
};

export const appleSignIn = async () => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  if (!appleAuthRequestResponse.identityToken) {
    throw 'Apple Sign-In failed - no identity token returned';
  }

  const { identityToken, nonce } = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce
  );

  const data = await auth().signInWithCredential(appleCredential);
  const idToken = await data.user.getIdToken(false);

  return { data, idToken };
};

export const emailSignIn = async (email: string, link: string) => {
  const data = await auth().signInWithEmailLink(email, link);
  const idToken = await data.user.getIdToken();

  return { data, idToken };
};
