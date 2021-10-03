import React, {useContext, useState} from 'react';
import {signIn} from "../auth/auth";
import {AppContext} from "../App";

function SignIn() {

    const [form, setForm] = useState({
        emailId: null,
        password: null
    })

    const {setUser} = useContext(AppContext);

  return (
    <div>
        <input className={"loginPage_text"} onChange={(e) => (setForm({...form, emailId: e.currentTarget.value}))} type="text" placeholder="Phone number, username, or email"/>
        <input className={"loginPage_text"} onKeyPress={(e) => {if(e.key === "Enter") signIn(form.emailId, form.password, setUser)}} onChange={(e) => (setForm({...form, password: e.currentTarget.value}))} type="password" placeholder="Password"/>
        <button className={"login_button"} onClick={() => signIn(form.emailId, form.password, setUser)}>Log In</button>
    </div>
  );
}

export default SignIn;