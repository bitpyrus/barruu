import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { AuthState, User as AppUser } from '@/types';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data();
        
        const appUser: AppUser = {
          id: firebaseUser.uid,
          email: firebaseUser.email!,
          name: firebaseUser.displayName || userData?.name || 'Anonymous',
          username: userData?.username || firebaseUser.email!.split('@')[0],
          avatar: firebaseUser.photoURL || userData?.avatar,
          bio: userData?.bio,
          website: userData?.website,
          location: userData?.location,
          joinedAt: userData?.joinedAt?.toDate() || new Date(),
          followersCount: userData?.followersCount || 0,
          followingCount: userData?.followingCount || 0,
          articlesCount: userData?.articlesCount || 0,
        };

        setAuthState({
          user: appUser,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update the user's display name
    await updateProfile(user, { displayName: name });
    
    // Create user document in Firestore
    const username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
    await setDoc(doc(db, 'users', user.uid), {
      name,
      username,
      email,
      joinedAt: new Date(),
      followersCount: 0,
      followingCount: 0,
      articlesCount: 0,
      bio: '',
      website: '',
      location: '',
    });
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value: AuthContextType = {
    ...authState,
    signIn,
    signUp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};