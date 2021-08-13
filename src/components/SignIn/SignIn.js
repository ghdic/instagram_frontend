import React, {useState} from 'react';
import '../LoginPage/LoginPage.css'
import {auth} from "../firebase";

function SignIn() {

    const [user, setUser] = useState({
        emailId: null,
        password: null
    })

    let login = () => {
        // localStorage.setItem("users", "admin");
        // window.location.reload();

        auth.signInWithEmailAndPassword(user.emailId, user.password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                localStorage.setItem("user", JSON.stringify(user));
                window.location.reload();
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }
  return (
    <div>
        <input className={"loginPage_text"} onChange={(e) => (setUser({...user, emailId: e.currentTarget.value}))} type="text" placeholder="Phone number, username, or email"/>
        <input className={"loginPage_text"} onChange={(e) => (setUser({...user, password: e.currentTarget.value}))} type="password" placeholder="Password"/>
        <button className={"login_button"} onClick={login}>Log In</button>
    </div>
  );
};

export default SignIn;