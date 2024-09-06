import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const useFirebaseUserData = () => {
  const [user, setCurrentUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(
      (user: FirebaseAuthTypes.User | null) => {
        setCurrentUser(user);
        if (initializing) setInitializing(false);
      }
    );

    return unsubscribe;
  }, [initializing]);

  return { user, initializing };
};
