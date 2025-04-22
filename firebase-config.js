// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAqoIAYBdrdNGsisbiPmFClkXRG2DztHdk",
    authDomain: "gallerililala.firebaseapp.com",
    projectId: "gallerililala",
    storageBucket: "gallerililala.firebasestorage.app",
    messagingSenderId: "321935317306",
    appId: "1:321935317306:web:aca94a16358eaa271fd803",
    measurementId: "G-71TJ36E7GE"
  };

  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  
// Add this to your firebase-config.js
const cloudinaryConfig = {
    cloudName: 'dadcbiejy',
    apiKey: '421278875472999',
    uploadPreset: '' // Create this in Cloudinary
};