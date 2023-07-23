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

import {
  getFirestore,
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';

import {} from 'firebase/firestore';

import * as firebaseui from 'firebaseui';

// Document elements
const authButton = document.getElementById('authButton');
const parseButton = document.getElementById('parseButton');
const mainContainer = document.getElementById('main-container');
const resultsContainer = document.getElementById('results-container');
const statsContainer = document.getElementById('stats-container');
const cardTable = document.getElementById('card-table');

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
  db = getFirestore();

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
      statsContainer.style.display = 'block';
      cardTable.style.display = 'block';
    } else {
      authButton.textContent = 'LOGIN';
      mainContainer.style.display = 'none';
      statsContainer.style.display = 'none';
      cardTable.style.display = 'none';
    }
  });
  
  const q = query(collection(db, 'cards'));
  onSnapshot(q, (snaps) => {
    var total_price = 0;
    var card_count = 0;
    // Loop through documents in database
    snaps.forEach((doc) => {
      var price = parseInt(doc.data().price.replace('US $', ''));
      if (doc.data().condition == 'A' && doc.data().isSold == true) {
        card_count++;
        total_price += price;
      }
      var tableRowHTML =
        '<tr><td><a href="https://snkrdunk.com/en/trading-cards/used/' +
        doc.data().id +
        '" target="blank">Erika SAR</a></td>';
      tableRowHTML =
        tableRowHTML +
        '<td><a href="' +
        doc.data().thumbnailUrl +
        '" target="blank">' +
        doc.data().condition +
        '</a></td>';
      tableRowHTML = tableRowHTML + '<td>$' + price + '</td>';
      tableRowHTML = tableRowHTML + '<td>' + doc.data().isSold + '</td></tr>';
      cardTable.insertAdjacentHTML('beforeend', tableRowHTML);
    });
    const avg_price = total_price / card_count;
    const entry = document.createElement('p');
    entry.textContent = 'Avg price for "A" condition: $' + avg_price;
    entry.textContent = entry.textContent + card_count;
    statsContainer.appendChild(entry);
  });
  parseButton.addEventListener('click', () => {
    alert("Hey, don't touch that!");
    return;
    var url =
      'https://snkrdunk.com/en/v1/trading-cards/128122/used-listings?perPage=20&page=1&sortType=latest&isOnlyOnSale=false';

    var data = {
      usedTradingCards: [
        {
          id: 17277439,
          tradingCardId: 128122,
          price: 'US $233',
          condition: 'A',
          thumbnailUrl:
            'https://cdn.snkrdunk.com/apparel_used_listings/43060df7-5692-47f1-bdfa-988335a04118/1017838.jpeg',
          isNew: true,
          isSold: true,
        },
        {
          id: 17276459,
          tradingCardId: 128122,
          price: 'US $494',
          condition: 'A',
          thumbnailUrl:
            'https://cdn.snkrdunk.com/apparel_used_listings/374d9ab1-dd2e-40dc-b5e7-410ab952e6bb/1408470.jpeg',
          isNew: true,
          isSold: false,
        },
        {
          id: 17276439,
          tradingCardId: 128122,
          price: 'US $1163',
          condition: 'PSA 10',
          thumbnailUrl:
            'https://cdn.snkrdunk.com/apparel_used_listings/40a5bad5-db72-4ec3-a3e3-a1e2f80ca734/3071124.jpeg',
          isNew: true,
          isSold: false,
        },
        {
          id: 17275751,
          tradingCardId: 128122,
          price: 'US $310',
          condition: 'A',
          thumbnailUrl:
            'https://cdn.snkrdunk.com/apparel_used_listings/8c8c2625-0109-4d3e-83c4-6260f87248e5/5442029.jpeg',
          isNew: true,
          isSold: false,
        },
        {
          id: 17275345,
          tradingCardId: 128122,
          price: 'US $297',
          condition: 'A',
          thumbnailUrl:
            'https://cdn.snkrdunk.com/apparel_used_listings/d07f313d-f3f7-4b2b-9530-fbd4c41ee932/5616697.jpeg',
          isNew: true,
          isSold: true,
        },
        {
          id: 17274896,
          tradingCardId: 128122,
          price: 'US $233',
          condition: 'B',
          thumbnailUrl:
            'https://cdn.snkrdunk.com/apparel_used_listings/2e5a1bf9-8598-46ed-8208-bfbf31cff30c/5661937.jpeg',
          isNew: true,
          isSold: false,
        },
        {
          id: 17274618,
          tradingCardId: 128122,
          price: 'US $353',
          condition: 'A',
          thumbnailUrl:
            'https://cdn.snkrdunk.com/apparel_used_listings/9e0e1663-cc31-408a-b68f-4dca7d00cf96/3633988.jpeg',
          isNew: true,
          isSold: false,
        },
        {
          id: 17273052,
          tradingCardId: 128122,
          price: 'US $230',
          condition: 'B',
          thumbnailUrl:
            'https://cdn.snkrdunk.com/apparel_used_listings/33174473-6ced-4470-87e4-29ac30b668f0/209746.jpeg',
          isNew: true,
          isSold: false,
        },
        {
          id: 17272802,
          tradingCardId: 128122,
          price: 'US $318',
          condition: 'A',
          thumbnailUrl:
            'https://cdn.snkrdunk.com/apparel_used_listings/8c6ba990-89cf-4771-9c35-5a82720557bd/5304952.jpeg',
          isNew: true,
          isSold: false,
        },
        {
          id: 17272718,
          tradingCardId: 128122,
          price: 'US $310',
          condition: 'A',
          thumbnailUrl:
            'https://cdn.snkrdunk.com/apparel_used_listings/af54420a-2dfe-48ab-a8a0-b777405ae46e/5521933.jpeg',
          isNew: true,
          isSold: false,
        },
        {
          id: 17272079,
          tradingCardId: 128122,
          price: 'US $290',
          condition: 'A',
          thumbnailUrl:
            'https://cdn.snkrdunk.com/apparel_used_listings/460bfc0a-08d3-4fc5-a5f5-1d4483d4e42c/4990859.jpeg',
          isNew: true,
          isSold: true,
        },
        {
          id: 17271161,
          tradingCardId: 128122,
          price: 'US $635',
          condition: 'A',
          thumbnailUrl:
            'https://cdn.snkrdunk.com/apparel_used_listings/a3e3ae44-2ea7-4af3-9f6c-75ea64e0ead9/1119692.jpeg',
          isNew: true,
          isSold: false,
        },
        {
          id: 17263800,
          tradingCardId: 128122,
          price: 'US $304',
          condition: 'A',
          thumbnailUrl:
            'https://cdn.snkrdunk.com/apparel_used_listings/627f8091-ac69-4bee-9501-380551d6efa7/5373797.jpeg',
          isNew: true,
          isSold: false,
        },
        {
          id: 17263595,
          tradingCardId: 128122,
          price: 'US $339',
          condition: 'A',
          thumbnailUrl:
            'https://cdn.snkrdunk.com/apparel_used_listings/28c39d99-c1d4-4b67-8b50-4a44971b42b7/2757677.png',
          isNew: true,
          isSold: false,
        },
        {
          id: 17263462,
          tradingCardId: 128122,
          price: 'US $311',
          condition: 'A',
          thumbnailUrl:
            'https://cdn.snkrdunk.com/apparel_used_listings/7cbd11ed-6818-4a1c-964e-768cb8db61db/2757677.png',
          isNew: true,
          isSold: false,
        },
        {
          id: 17263121,
          tradingCardId: 128122,
          price: 'US $324',
          condition: 'A',
          thumbnailUrl:
            'https://cdn.snkrdunk.com/apparel_used_listings/3ef1a1ec-4203-4a3f-98cf-cc6ee94bff46/1601757.jpeg',
          isNew: true,
          isSold: true,
        },
        {
          id: 17262872,
          tradingCardId: 128122,
          price: 'US $353',
          condition: 'A',
          thumbnailUrl:
            'https://cdn.snkrdunk.com/apparel_used_listings/9f52eecc-2253-4e56-a2fd-3f949846504e/5028378.jpeg',
          isNew: true,
          isSold: false,
        },
        {
          id: 17262859,
          tradingCardId: 128122,
          price: 'US $226',
          condition: 'B',
          thumbnailUrl:
            'https://cdn.snkrdunk.com/apparel_used_listings/466eb932-2f5e-4658-b145-49dbc8cfa612/175067.jpeg',
          isNew: true,
          isSold: true,
        },
        {
          id: 17262628,
          tradingCardId: 128122,
          price: 'US $302',
          condition: 'A',
          thumbnailUrl:
            'https://cdn.snkrdunk.com/apparel_used_listings/4fe1d6e1-2364-4f63-bd62-21d32f3069d4/100261.jpeg',
          isNew: true,
          isSold: true,
        },
        {
          id: 17262458,
          tradingCardId: 128122,
          price: 'US $233',
          condition: 'B',
          thumbnailUrl:
            'https://cdn.snkrdunk.com/apparel_used_listings/99c34109-57b2-4719-b21f-9b8c021554aa/5064549.jpeg',
          isNew: true,
          isSold: false,
        },
      ],
    };

    for (var i = 0; i < data.usedTradingCards.length; i++) {
      addDoc(collection(db, 'cards'), {
        timestamp: Date.now(),
        id: data.usedTradingCards[i].id,
        tradingCardId: data.usedTradingCards[i].tradingCardId,
        price: data.usedTradingCards[i].price,
        condition: data.usedTradingCards[i].condition,
        thumbnailUrl: data.usedTradingCards[i].thumbnailUrl,
        isNew: data.usedTradingCards[i].isNew,
        isSold: data.usedTradingCards[i].isSold,
      });
    }
    alert('done?');
  });
}
main();
