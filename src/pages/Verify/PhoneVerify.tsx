// import { useEffect } from 'react';
// import firebase from 'firebase/compat/app';
// import * as firebaseui from 'firebaseui';
// import 'firebaseui/dist/firebaseui.css';
// import { onAuthStateChanged } from 'firebase/auth';

// const PhoneVerify = ({ onUserVerified }) => {
//   const firebaseConfig = {
//     apiKey: '',
//     authDomain: '',
//     projectId: '',
//     storageBucket: '',
//     messagingSenderId: '',
//     appId: ',
//   };

//   firebase.initializeApp(firebaseConfig);

//   // const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unSubscriber = onAuthStateChanged(firebase.auth(), currentUser => {
//       console.log(currentUser);
//       // setUser(currentUser);
//       if (currentUser) {
//         onUserVerified(currentUser);
//       }
//     });

//     return () => unSubscriber();
//   }, [onUserVerified]);

//   useEffect(() => {
//     const ui =
//       firebaseui.auth.AuthUI.getInstance() ||
//       new firebaseui.auth.AuthUI(firebase.auth());
//     ui.start('.otp-container', {
//       signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
//       signInSuccessUrl: '/profile',
//       privacyPolicyUrl: 'https://mustafiz.org/who-we-are/',
//       tosUrl: 'https://mustafiz.org/who-we-are/',
//     });
//   });

//   return <div className="otp-container"></div>;
// };

// export default PhoneVerify;
const PhoneVerify = () => {
  return (
    <div>
      <h1>This is PhoneVerify page</h1>
    </div>
  );
};

export default PhoneVerify;
