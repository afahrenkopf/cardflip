// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required
import { initializeApp } from 'firebase/app';

// Add the Firebase products and methods that you want to use
import {
  getAuth,
  EmailAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {} from 'firebase/firestore';

import * as firebaseui from 'firebaseui';

// Document elements
const authButton = document.getElementById('authButton');
const parseButton = document.getElementById('parseButton');
const mainContainer = document.getElementById('main-container');

let db, auth;

async function main() {
  // Firebase Config
  const firebaseConfig = {
    apiKey: 'AIzaSyCPvX8sGQRERrSG6VckVdSfvwMyOHUNm70',
    authDomain: 'cardflip-37093.firebaseapp.com',
    projectId: 'cardflip-37093',
    storageBucket: 'cardflip-37093.appspot.com',
    messagingSenderId: '867172306315',
    appId: '1:867172306315:web:7d703a4f53d5d0c89a338e',
  };

  initializeApp(firebaseConfig);
  auth = getAuth();

  // FirebaseUI config
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      // Email / Password Provider.
      EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // Handle sign-in.
        // Return false to avoid redirect.
        return false;
      },
    },
  };
  // Initialize the FirebaseUI widget using Firebase
  const ui = new firebaseui.auth.AuthUI(auth);
  // Listen to RSVP button clicks
  authButton.addEventListener('click', () => {
    if (auth.currentUser) {
      // User is signed in; allows user to sign out
      signOut(auth);
    } else {
      // No user is signed in; allows user to sign in
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  });
  // Listen to the current Auth state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      authButton.textContent = 'LOGOUT - ' + user.displayName;
      mainContainer.style.display = 'block';
    } else {
      authButton.textContent = 'LOGIN';
      mainContainer.style.display = 'none';
    }
  });
  parseButton.addEventListener('click', () => {
    var url =
      'https://snkrdunk.com/en/v1/trading-cards/128122/used-listings?perPage=20&page=1&sortType=latest&isOnlyOnSale=false';

    const Http = new XMLHttpRequest();
    
    Http.open("GET", url);
    Http.send();
      
    Http.onreadystatechange = (e) => {
      alert(Http.response);
    }
  });
}
main();
