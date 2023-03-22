import React, { createContext, ReactNode, useEffect, useState } from 'react';

import { auth , firebase } from '../services/firebase';

type User = {
    id: string;
    name: string;
    avatar: string;

}

type AuthContextType = {
    user: User | undefined;
    signWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
      const unsubscribre = auth.onAuthStateChanged(user => {
        if(user) {
          const { displayName , photoURL , uid } = user
  
          if(!photoURL || !uid) {
            throw new Error('Missing information from Google Account.')
          }
          
          setUser({
            id: uid,
            name: displayName!,
            avatar: photoURL
          })
        }
  
      })
  
      return () => {
        unsubscribre()
      }
    } , [])
  
    async function signWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
        
      const result = await auth.signInWithPopup(provider);
      
      if(result.user) {
        const { displayName , photoURL , uid } = result.user;
  
        if(!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }
  
        setUser({ 
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
  
    }

    return (
        <AuthContext.Provider value={{ user, signWithGoogle }} >
            { children }
        </AuthContext.Provider>
    );
}