import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import PageNotFound from "./shared/components/404";
import User from "./users/pages/User";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:userId/places">
          <User />
        </Route>
        <Route path="/places/new">
          <NewPlace />
        </Route>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/404">
          <PageNotFound />
        </Route>

        <Redirect to="/404" />
      </Switch>
    </Router>
  );
};

export default App;
