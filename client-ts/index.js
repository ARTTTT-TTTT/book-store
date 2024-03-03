import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAomlWNc5V6WxJPcl-F7r5V4OzIBmjk-O8",
    authDomain: "cloud-hosting-240-229.firebaseapp.com",
    projectId: "cloud-hosting-240-229",
    storageBucket: "cloud-hosting-240-229.appspot.com",
    messagingSenderId: "301048891832",
    appId: "1:301048891832:web:c4046c517e72d262bbe74d",
    measurementId: "G-6FCZEV2Y60",
};

firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = firebase.auth();
const database = firebase.database();

const handleLogin = () => {
     // Get all our input fields
     email = document.getElementById("email").value;
     password = document.getElementById("password").value;

     // Validate input fields
     if (
         validate_email(email) == false ||
         validate_password(password) == false
     ) {
         alert("Email or Password is False");
         return;
         // Don't continue running the code
     }

     auth.signInWithEmailAndPassword(email, password)
         .then(function () {
             // Declare user variable
             var user = auth.currentUser;

             // Add this user to Firebase Database
             var database_ref = database.ref();

             // Create User data
             var user_data = {
                 last_login: Date.now(),
             };

             // Push to Firebase Database
             database_ref.child("users/" + user.uid).update(user_data);

             // DOne
             alert("User Logged In");
         })
         .catch(function (error) {
             // Firebase will use this to alert of its errors
             var error_code = error.code;
             var error_message = error.message;

             alert(error_message);
         });
 };

 function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
    if (validate_field(full_name) == false) {
      alert('One or More Extra Fields is Outta Line!!')
      return
    }
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        full_name : full_name,
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // DOne
      alert('User Created')
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }

 function validate_email(email) {
        expression = /^[^@]+@\w+(\.\w+)+\w$/;
        if (expression.test(email) == true) {
            // Email is good
            return true;
        } else {
            // Email is not good
            return false;
        }
}

function validate_password(password) {
        // Firebase only accepts lengths greater than 6
        if (password < 6) {
            return false;
        } else {
            return true;
        }
}

function validate_field(field) {
        if (field == null) {
            return false;
        }

        if (field.length <= 0) {
            return false;
        } else {
            return true;
        }
}

export default handleLogin;

export default handleRegister;