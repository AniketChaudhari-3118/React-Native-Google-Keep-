import { firebase } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyD6o5FGiqNKwITP9xjHeSJCfhIX-TObPpM',
    authDomain: 'projectTS.firebaseapp.com',
    projectId: 'keep-7a799',
    storageBucket: 'projectTS.appspot.com',
    messagingSenderId: '985465774033',
    appId: '1:985465774033:android:fe94556b12c1e2735ccaf0',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { auth, firestore };
