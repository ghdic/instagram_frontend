import {auth} from "../firebase";

export function signIn(email, password, setUser) {

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user.uid)
            const requestOptions = {
                method: "GET",
                headers: {'Content-Type': "application/json"},
            }
            fetch(`https://instagram-spring.herokuapp.com/user/${user.uid}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setUser(data);
                    localStorage.setItem("user", JSON.stringify(data));
                    // window.location.reload();
                })
                .catch(error => {
                    console.log(error)
                })

            // localStorage.setItem("user", JSON.stringify(user));
            // window.location.reload();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            alert(errorCode, errorMessage);
        });
}

export function signUp(emailId, password, userName, nickName, setUser) {
    auth.createUserWithEmailAndPassword(emailId, password)
        .then((formCredential) => {
            // Signed in
            // eslint-disable-next-line no-unused-vars
            var firebase_user = formCredential.user;
            let payload = {
                "uid": firebase_user.uid,
                "userName": userName,
                "nickName": nickName
            }

            const requestOptions = {
                method: "POST",
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify(payload)
            }
            fetch("https://instagram-spring.herokuapp.com/user", requestOptions)
                .then(response => response.json())
                .then(data => {
                    setUser(data);
                    localStorage.setItem("user", JSON.stringify(data));
                    // window.location.reload();
                })
                .catch(error => {
                    console.log(error)
                })
            // ...
        })
        .catch((error) => {
            // eslint-disable-next-line no-unused-vars
            var errorCode = error.code;
            // eslint-disable-next-line no-unused-vars
            var errorMessage = error.message;
            // ..
            console.log(errorCode, errorMessage)
            alert(errorCode, errorMessage);
        });
}

export function Logout(setUser) {
  localStorage.removeItem("user");
  setUser(null);
}