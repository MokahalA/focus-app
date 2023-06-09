import React from 'react'
import SignIn from './components/SignIn';
import MainPage from './components/MainPage';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { useAuthState } from 'react-firebase-hooks/auth'

const auth = firebase.auth();

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      { user ? <MainPage/> : <SignIn />}
    </>
  );
}
