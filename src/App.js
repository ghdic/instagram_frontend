import './App.css';
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {createContext, useEffect, useState} from "react";

import AuthRoute from "./auth/AuthRoute";
import AlreadyAuthRoute from "./auth/AlreadyAuthRoute";

export const AppContext = createContext()

function App() {
    const [user, setUser] = useState(null);
    const authenticated = user != null;

    useEffect(() => {
        if(localStorage.getItem("user") === undefined || localStorage.getItem("user") === null)
            setUser(null)
        else
            setUser(JSON.parse(localStorage.getItem("user")))
    }, [])

  return (
      <Router>
          <Switch>
              <AppContext.Provider value={{user, setUser}}>
                  <AuthRoute exact path="/" authenticated={authenticated} render={props => <Home {...props}/>} />
                  <AlreadyAuthRoute exact path="/login" authenticated={authenticated} render={props => <LoginPage {...props}/>} />
              </AppContext.Provider>
          </Switch>
      </Router>
  );
}

export default App;
