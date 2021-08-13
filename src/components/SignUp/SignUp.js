import React, {useState} from 'react';
import './SignUp.css'
// eslint-disable-next-line no-unused-vars
import {storage, auth} from "../firebase";

function SignUp() {
    const [user, setUser] = useState({
        emailId: null,
        name: null,
        userName: null,
        password: null
    })

    const newSignUp = () => {
        auth.createUserWithEmailAndPassword(user.emailId, user.password)
            .then((userCredential) => {
                // Signed in
                // eslint-disable-next-line no-unused-vars
                var firebase_user = userCredential.user;
                let payload = {
                    "userId": firebase_user.uid,
                    "userName": user.userName,
                    "name": user.name,
                    "profileImage": ""
                }

                const requestOptions = {
                    method: "POST",
                    headers: {'Content-Type': "application/json"},
                    body: JSON.stringify(payload)
                }
                fetch("http://localhost:8080/user", requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        localStorage.setItem("user", JSON.stringify(firebase_user));
                        window.location.reload();
                    })
                    .catch(error => {

                    })
                // ...
            })
            .catch((error) => {
                // eslint-disable-next-line no-unused-vars
                var errorCode = error.code;
                // eslint-disable-next-line no-unused-vars
                var errorMessage = error.message;
                // ..
            });
    }

  return (
    <div>
        <input className={"loginPage_text"} onChange={(e) => {setUser({...user, emailId:e.currentTarget.value})}} type="text" placeholder="Mobile number or email"/>
        <input className={"loginPage_text"} onChange={(e) => {setUser({...user, name:e.currentTarget.value})}} type="text" placeholder="Full Name"/>
        <input className={"loginPage_text"} onChange={(e) => {setUser({...user, userName:e.currentTarget.value})}} type="text" placeholder="Username"/>
        <input className={"loginPage_text"} onChange={(e) => {setUser({...user, password:e.currentTarget.value})}} type="password" placeholder="Password"/>
        <button className={"login_button"} onClick={newSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;