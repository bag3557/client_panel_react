import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import 'firebase/firestore';
// Reducers
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig = {
  apiKey: "AIzaSyAXxNDnDpkSZ3R2JOR88Qs_z-laLYqYXyQ",
  authDomain: "reactredux-b2077.firebaseapp.com",
  databaseURL: "https://reactredux-b2077.firebaseio.com",
  projectId: "reactredux-b2077",
  storageBucket: "reactredux-b2077.appspot.com",
  messagingSenderId: "377983118570"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  userFirestoreForProfile: true
};

// Init Firebase instance
firebase.initializeApp(firebaseConfig);
// Init Firestore 
const firestore = firebase.firestore();

const settings = { timestampsInSnapshots: true };

firestore.settings(settings);

// Add reactReduxFirestore enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), //firebase imstance as first argument
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

// Check for setting in local storage
if(localStorage.getItem('settings')==null){
  // Default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  }

  // Set to local storage
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

// Create Initial state
const initialState = {settings: JSON.parse(localStorage.getItem('settings'))};

// Create store
const store = createStoreWithFirebase(rootReducer, initialState, 
  compose(reactReduxFirebase(firebase), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
