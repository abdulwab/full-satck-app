import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./componnets/Login.js";
import Profile from "./componnets/Profile.js";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
