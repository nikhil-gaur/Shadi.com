import '../Styles/App.css';
import Home from '../Components/Home'
import Login from '../Components/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { useStateValue } from "../StateProvider";
import React, { useEffect } from "react";
import { auth } from "../firebase";



function App() {

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  
  return (
    
    <Router>
    <div className="App">
      <Switch>
        <Route path="/login">
        <Login />
        </Route>
        <Route path="/home">
          {!user ? <Login />: <Home />}
        </Route>
        <Route path="/">
        <Login />
        </Route>

      </Switch>
    </div>

    </Router>
      );
}

export default App;
