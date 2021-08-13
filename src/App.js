import './App.css';
// eslint-disable-next-line
import LoginPage from "./components/LoginPage/LoginPage";
// eslint-disable-next-line no-unused-vars
import Home from "./components/HomePage/Home";

function App() {
  return (
    <div className="App">
        {
            (localStorage.getItem("user") === undefined || localStorage.getItem("user") === null) ?
                <LoginPage />:<Home />
        }

    </div>
  );
}

export default App;
