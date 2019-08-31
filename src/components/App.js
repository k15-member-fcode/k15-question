import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import QuestionPage from "./QuestionPage";
import AdminPage from "./AdminPage";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={QuestionPage} />
          <Route excat path="/administrator" component={AdminPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
